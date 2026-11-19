#requires -Version 7.2
[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory)] [guid] $TenantId,
    [Parameter(Mandatory)] [ValidatePattern('^/subscriptions/[^/]+/resourceGroups/[^/]+/providers/Microsoft.Logic/workflows/[^/]+$')] [string] $WorkflowResourceId,
    [Parameter(Mandatory)] [guid] $AIReaderGroupId
)

. (Join-Path $PSScriptRoot 'workshop-common.ps1')
$ErrorActionPreference = 'Stop'
$subscription = $WorkflowResourceId.Split('/')[2]
$account = Invoke-WorkshopAz @('account', 'show', '--subscription', $subscription)
if ($account.tenantId -ne $TenantId.ToString()) { throw 'Workflow subscription belongs to a different tenant.' }
$armToken = Invoke-WorkshopAz @('account', 'get-access-token', '--subscription', $subscription, '--resource', 'https://management.azure.com')
$graphToken = Invoke-WorkshopAz @('account', 'get-access-token', '--subscription', $subscription, '--resource', 'https://graph.microsoft.com')
if ($graphToken.tenant -ne $TenantId.ToString() -or $armToken.tenant -ne $TenantId.ToString()) { throw 'Wrong token tenant.' }
$armHeaders = @{ Authorization = "Bearer $($armToken.accessToken)" }
$graphHeaders = @{ Authorization = "Bearer $($graphToken.accessToken)" }
$uri = "https://management.azure.com${WorkflowResourceId}?api-version=2019-05-01"
$workflow = Invoke-RestMethod -Method GET -Uri $uri -Headers $armHeaders | ConvertTo-Json -Depth 100 | ConvertFrom-Json -AsHashtable
if (-not $workflow.identity.principalId) { throw 'Workflow has no system-assigned managed identity.' }
if (-not $workflow.properties.definition.actions.Create_user -or -not $workflow.properties.definition.actions.Issue_TAP -or -not $workflow.properties.definition.actions.Send_email) {
    throw 'Expected Create_user, Issue_TAP and Send_email actions; refusing to replace an unknown workflow.'
}
foreach ($check in @(
    @{ Action = 'Issue_TAP'; Allowed = @('Create_user', 'Add_AI_Reader_Group_Member') },
    @{ Action = 'Send_email'; Allowed = @('Issue_TAP', 'Add_AI_Reader_Group_Member', 'Confirm_AI_Reader_Membership') }
)) {
    $dependencies = $workflow.properties.definition.actions[$check.Action].runAfter
    if ($dependencies.Count -ne 1 -or @($dependencies.Keys)[0] -notin $check.Allowed -or
        $dependencies[@($dependencies.Keys)[0]] -notcontains 'Succeeded') {
        throw "Unexpected dependencies on $($check.Action); refusing to discard custom sequencing."
    }
}
$group = Invoke-RestMethod -Method GET -Headers $graphHeaders -Uri "https://graph.microsoft.com/v1.0/groups/${AIReaderGroupId}?`$select=id,displayName,isAssignableToRole,groupTypes"
if (-not $group.isAssignableToRole -or $group.groupTypes -contains 'DynamicMembership') { throw 'Target must be an assigned role-assignable group.' }
$roles = (Invoke-RestMethod -Method GET -Headers $graphHeaders -Uri "https://graph.microsoft.com/v1.0/roleManagement/directory/roleDefinitions?`$filter=displayName eq 'AI Reader'").value
if (@($roles).Count -ne 1) { throw 'Cannot resolve AI Reader.' }
$groupRoles = (Invoke-RestMethod -Method GET -Headers $graphHeaders -Uri "https://graph.microsoft.com/v1.0/roleManagement/directory/roleAssignments?`$filter=principalId eq '$AIReaderGroupId'").value
if (-not @($groupRoles | Where-Object { $_.roleDefinitionId -eq $roles[0].id -and $_.directoryScopeId -eq '/' }).Count) {
    throw 'Target group does not have active standing tenant-wide AI Reader.'
}
$graphServices = (Invoke-RestMethod -Method GET -Headers $graphHeaders -Uri "https://graph.microsoft.com/v1.0/servicePrincipals?`$filter=appId eq '00000003-0000-0000-c000-000000000000'").value
if (@($graphServices).Count -ne 1) { throw 'Cannot resolve Microsoft Graph service principal.' }
$graph = $graphServices[0]
$identityName = "$($workflow.name)-AIReader-Membership"
$identityResourceId = "$($WorkflowResourceId.Split('/providers/')[0])/providers/Microsoft.ManagedIdentity/userAssignedIdentities/$identityName"
Write-Warning 'Role-assignable group membership requires tenant-wide Graph RoleManagement.ReadWrite.Directory in addition to GroupMember.ReadWrite.All. These permissions are assigned to a dedicated user-assigned identity used only by the membership action. Protect the provisioner definition and its trigger.'
if (-not $PSCmdlet.ShouldProcess($WorkflowResourceId, "Grant required MI permissions and automatically add created users to $($group.displayName) before emailing credentials")) { return }
$backupDirectory = Initialize-PrivateDirectory (Join-Path $PSScriptRoot '..\.workshop\onboarding-backups')
$backupPath = Join-Path $backupDirectory "provisioner-$([guid]::NewGuid().ToString('N')).json"
$workflow | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $backupPath -Encoding utf8
Write-Host "Private workflow backup: $backupPath"
$membershipIdentity = Invoke-RestMethod -Method PUT -Headers $armHeaders -ContentType application/json `
    -Uri "https://management.azure.com${identityResourceId}?api-version=2023-01-31" `
    -Body (@{ location = $workflow.location } | ConvertTo-Json)
$principal = $membershipIdentity.properties.principalId
if (-not $principal) { throw 'Membership identity provisioning did not return a principal ID.' }
for ($attempt = 0; $attempt -lt 7; $attempt++) {
    try {
        $grants = (Invoke-RestMethod -Method GET -Headers $graphHeaders -Uri "https://graph.microsoft.com/v1.0/servicePrincipals/$principal/appRoleAssignments").value
        break
    } catch {
        if ($_.Exception -isnot [Microsoft.PowerShell.Commands.HttpResponseException] -or
            [int]$_.Exception.Response.StatusCode -ne 404 -or $attempt -eq 6) { throw }
        Write-Warning 'New membership identity has not replicated to Graph yet; retrying in five seconds.'
        Start-Sleep -Seconds 5
    }
}
foreach ($name in @('GroupMember.ReadWrite.All', 'RoleManagement.ReadWrite.Directory')) {
    $permission = @($graph.appRoles | Where-Object { $_.value -eq $name -and $_.isEnabled -and $_.allowedMemberTypes -contains 'Application' })
    if ($permission.Count -ne 1) { throw "Cannot resolve Graph application permission $name." }
    if (-not @($grants | Where-Object { $_.resourceId -eq $graph.id -and $_.appRoleId -eq $permission[0].id }).Count) {
        $body = @{ principalId = $principal; resourceId = $graph.id; appRoleId = $permission[0].id } | ConvertTo-Json
        Invoke-RestMethod -Method POST -Headers $graphHeaders -ContentType application/json -Body $body -Uri "https://graph.microsoft.com/v1.0/servicePrincipals/$principal/appRoleAssignments" | Out-Null
        Write-Host "Granted $name to dedicated membership MI."
    }
}
$template = Get-Content -LiteralPath (Join-Path $PSScriptRoot '..\labs\logic-app\provisioner-forms.template.json') -Raw | ConvertFrom-Json -AsHashtable
$action = $template.resources[0].properties.definition.actions.Add_AI_Reader_Group_Member
$workflow.properties.definition.parameters.aiReaderGroupId = @{ type = 'String' }
$workflow.properties.parameters.aiReaderGroupId = @{ value = $AIReaderGroupId.ToString() }
$workflow.properties.definition.parameters.membershipIdentityResourceId = @{ type = 'String' }
$workflow.properties.parameters.membershipIdentityResourceId = @{ value = $identityResourceId }
$workflow.identity.type = 'SystemAssigned, UserAssigned'
if (-not $workflow.identity.ContainsKey('userAssignedIdentities')) { $workflow.identity.userAssignedIdentities = @{} }
$workflow.identity.userAssignedIdentities[$identityResourceId] = @{}
$workflow.properties.definition.actions.Add_AI_Reader_Group_Member = $action
$workflow.properties.definition.actions.Confirm_AI_Reader_Membership = $template.resources[0].properties.definition.actions.Confirm_AI_Reader_Membership
$workflow.properties.definition.actions.Issue_TAP.runAfter = @{ Create_user = @('Succeeded') }
$workflow.properties.definition.actions.Send_email.runAfter = @{ Confirm_AI_Reader_Membership = @('Succeeded') }
$properties = @{
    definition = $workflow.properties.definition
    parameters = $workflow.properties.parameters
    state = $workflow.properties.state
}
foreach ($name in @('endpointsConfiguration', 'accessControl', 'integrationAccount', 'integrationServiceEnvironment')) {
    if ($workflow.properties.ContainsKey($name)) { $properties[$name] = $workflow.properties[$name] }
}
$body = @{ location = $workflow.location; identity = $workflow.identity; properties = $properties }
if ($workflow.ContainsKey('tags')) { $body.tags = $workflow.tags }
Invoke-RestMethod -Method PUT -Headers $armHeaders -ContentType application/json -Body ($body | ConvertTo-Json -Depth 100) -Uri $uri | Out-Null
$actual = Invoke-RestMethod -Method GET -Headers $armHeaders -Uri $uri
if ($actual.properties.parameters.aiReaderGroupId.value -ne $AIReaderGroupId.ToString() -or
    $actual.properties.definition.actions.Send_email.runAfter.Confirm_AI_Reader_Membership -notcontains 'Succeeded' -or
    $actual.properties.state -ne $workflow.properties.state) {
    throw "Workflow readback failed. Restore the private backup if necessary: $backupPath"
}
$deployedLoop = $actual.properties.definition.actions.Add_AI_Reader_Group_Member
$deployedAction = $deployedLoop.actions.Add_AI_Reader_Membership_Request
$expectedInputs = $action.actions.Add_AI_Reader_Membership_Request.inputs
if ($deployedAction.inputs.uri -ne $expectedInputs.uri -or
    $deployedAction.inputs.body.'@@odata.id' -ne $expectedInputs.body.'@@odata.id' -or
    $deployedAction.inputs.authentication.type -ne 'ManagedServiceIdentity' -or
    $deployedAction.inputs.authentication.identity -ne "@parameters('membershipIdentityResourceId')" -or
    $actual.properties.parameters.membershipIdentityResourceId.value -ne $identityResourceId -or
    $deployedLoop.runAfter.Issue_TAP -notcontains 'Succeeded' -or
    $deployedLoop.operationOptions -ne 'FailWhenLimitsReached' -or
    $actual.properties.definition.actions.Issue_TAP.runAfter.Create_user -notcontains 'Succeeded') {
    throw "Deployed membership action does not match the reviewed template. Private backup: $backupPath"
}
$verifiedGrants = (Invoke-RestMethod -Method GET -Headers $graphHeaders -Uri "https://graph.microsoft.com/v1.0/servicePrincipals/$principal/appRoleAssignments").value
foreach ($name in @('GroupMember.ReadWrite.All', 'RoleManagement.ReadWrite.Directory')) {
    $permission = @($graph.appRoles | Where-Object { $_.value -eq $name })
    if (-not @($verifiedGrants | Where-Object { $_.resourceId -eq $graph.id -and $_.appRoleId -eq $permission[0].id }).Count) {
        throw "Managed identity permission readback failed: $name"
    }
}
Write-Host 'Verified: created user -> TAP -> AI Reader group membership -> existing email flow. Workflow state preserved.'
Write-Warning 'Configuration readback is not a successful onboarding run. Test an approved form submission and check Add_AI_Reader_Group_Member in run history.'
