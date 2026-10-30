#requires -Version 7.2
[CmdletBinding(SupportsShouldProcess, ConfirmImpact = 'High')]
param([Parameter(Mandatory)] [string] $ConfigPath)
. (Join-Path $PSScriptRoot 'workshop-common.ps1')
$config = Read-WorkshopConfig $ConfigPath
$paths = Get-WorkshopPaths $ConfigPath
$state = Read-WorkshopState $paths.state $config
Assert-WorkshopContext $config
if (-not $state.ContainsKey('resourceGroup') -or $state.resourceGroup -ne $config.resourceGroup) { throw 'No matching run deployment manifest. No deletion allowed.' }
$group = Invoke-WorkshopAz @('group', 'show', '-n', $config.resourceGroup, '--subscription', $config.subscriptionId)
if (-not $state.ContainsKey('deploymentId') -or -not $group.tags -or $group.tags.a365HubRun -ne $config.runName -or $group.tags.a365HubDeployment -ne $state.deploymentId) { throw 'Resource group does not belong to this exact deployment manifest. No deletion allowed.' }
$modelScope = "/subscriptions/$($config.subscriptionId)/resourceGroups/$($config.openAiResourceGroup)/providers/Microsoft.CognitiveServices/accounts/$($config.openAiAccount)"
if ($state.ContainsKey('modelRoleAssignmentId')) {
    $prefix = "$modelScope/providers/Microsoft.Authorization/roleAssignments/"
    $roleId = $state.modelRoleAssignmentId
    $roleGuid = [guid]::Empty
    if (-not $roleId.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase) -or
        -not [guid]::TryParse($roleId.Substring($prefix.Length), [ref] $roleGuid)) { throw 'Unexpected model role scope in the manifest. No deletion allowed.' }
    $assignments = Invoke-WorkshopAz @('role', 'assignment', 'list', '--scope', $modelScope, '--all', '--subscription', $config.subscriptionId)
    $ownedRole = @($assignments | Where-Object { $_ -and $_.id -eq $roleId })
    if ($ownedRole.Count -gt 1) { throw 'Ambiguous model assignment result. No deletion allowed.' }
    if ($ownedRole.Count -eq 1) {
        if ($ownedRole[0].principalId -ne $state.runtimePrincipalId -or
            -not $ownedRole[0].roleDefinitionId.EndsWith('/5e0bd9bd-7b93-4f7a-af87-19fc36ad61bd')) { throw 'Model role principal/definition does not match the recorded runtime. No deletion allowed.' }
        if ($PSCmdlet.ShouldProcess($roleId, 'Remove only the recorded runtime OpenAI User assignment; keep the existing model')) {
            Invoke-WorkshopAz @('role', 'assignment', 'delete', '--ids', $roleId, '--subscription', $config.subscriptionId) | Out-Null
        }
    }
} else {
    Write-Warning 'No model-role ID was recorded (possibly an interrupted infrastructure deployment). Review the model IAM assignments for this run before final cleanup.'
}
if ($PSCmdlet.ShouldProcess("$($config.subscriptionId)/$($config.resourceGroup)", 'Delete this dedicated workshop resource group, including its registry, images, UI, agent runtime and managed identity')) {
    Invoke-WorkshopAz @('group', 'delete', '-n', $config.resourceGroup, '--subscription', $config.subscriptionId, '--yes') | Out-Null
    $state.status = 'Azure cleanup finished; verify model IAM, Entra objects, users/licenses and retained evidence'
    Write-WorkshopJson $paths.state $state
}
Write-Host 'This keeps the existing model and does NOT remove Entra apps/agent, users, licenses, or retained mail/evidence. Follow the remaining admin cleanup steps.'
