#requires -Version 7.2
[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory)] [guid] $TenantId,
    [string] $SourceGroupName = 'A365-Workshop-Attendees',
    [string] $TargetGroupName = 'A365-Workshop-AI-Readers',
    [switch] $UseExistingSession
)

$ErrorActionPreference = 'Stop'
Import-Module Microsoft.Graph.Authentication -ErrorAction Stop
if (-not $UseExistingSession) {
    Connect-MgGraph -TenantId $TenantId -ContextScope Process -NoWelcome -Scopes @(
        'Group.Read.All', 'RoleManagement.ReadWrite.Directory'
    )
}
if ((Get-MgContext).TenantId -ne $TenantId.ToString()) { throw 'Wrong Graph tenant or no authenticated session.' }
if ($SourceGroupName -eq $TargetGroupName) { throw 'Source and target groups must differ.' }

function Graph {
    param([string] $Method, [string] $Path, [object] $Body)
    $args = @{
        Method = $Method
        Uri = "https://graph.microsoft.com/v1.0/$Path"
        OutputType = 'PSObject'
    }
    if ($null -ne $Body) {
        $args.Body = $Body | ConvertTo-Json -Depth 10
        $args.ContentType = 'application/json'
    }
    Invoke-MgGraphRequest @args
}

function Read-Collection {
    param([string] $Path)
    $uri = "https://graph.microsoft.com/v1.0/$Path"
    while ($uri) {
        $result = Invoke-MgGraphRequest -Method GET -Uri $uri -OutputType PSObject
        $result.value
        $uri = $result.'@odata.nextLink'
    }
}

function Find-Group {
    param([string] $Name)
    $filter = [uri]::EscapeDataString("displayName eq '$($Name.Replace("'", "''"))'")
    @(Read-Collection "groups?`$filter=$filter&`$select=id,displayName,isAssignableToRole,groupTypes,membershipRule,securityEnabled")
}

$sources = @(Find-Group $SourceGroupName)
if ($sources.Count -ne 1) { throw 'Expected exactly one source group.' }
$source = $sources[0]
if ($source.groupTypes -notcontains 'DynamicMembership') { throw 'Expected the existing dynamic attendee group.' }
$targets = @(Find-Group $TargetGroupName)
if ($targets.Count -gt 1) { throw 'Multiple target groups found; resolve ambiguity before continuing.' }
$target = if ($targets.Count -eq 1) { $targets[0] } else { $null }
if ($target -and (-not $target.isAssignableToRole -or -not $target.securityEnabled -or $target.groupTypes -contains 'DynamicMembership')) {
    throw 'Existing target must be an assigned, role-assignable security group.'
}
$roles = @(Read-Collection "roleManagement/directory/roleDefinitions?`$filter=displayName%20eq%20'AI%20Reader'&`$select=id,displayName")
if ($roles.Count -ne 1) { throw 'Expected exactly one AI Reader role definition.' }
$students = @(Read-Collection "groups/$($source.id)/members/microsoft.graph.user?`$select=id,userPrincipalName,accountEnabled")
Write-Host "Source: $($source.displayName) ($($source.id)); users: $($students.Count)"
if (-not $target) {
    if (-not $PSCmdlet.ShouldProcess($TargetGroupName, 'Create assigned role-assignable security group')) { return }
    $target = Graph POST 'groups' @{
        displayName = $TargetGroupName
        description = "Standing AI Reader access for approved members copied from $SourceGroupName. Operator-managed membership; no PIM activation."
        mailNickname = "a365-ai-readers-$([guid]::NewGuid().ToString('N').Substring(0,8))"
        mailEnabled = $false
        securityEnabled = $true
        isAssignableToRole = $true
        groupTypes = @()
    }
}
$assignments = @(Read-Collection "roleManagement/directory/roleAssignments?`$filter=principalId%20eq%20'$($target.id)'")
$activeRole = @($assignments | Where-Object { $_.roleDefinitionId -eq $roles[0].id -and $_.directoryScopeId -eq '/' })
if ($activeRole.Count -eq 0 -and $PSCmdlet.ShouldProcess($TargetGroupName, 'Assign active standing tenant-wide AI Reader (not PIM eligible)')) {
    Graph POST 'roleManagement/directory/roleAssignments' @{
        principalId = $target.id
        roleDefinitionId = $roles[0].id
        directoryScopeId = '/'
    } | Out-Null
}
$current = @(Read-Collection "groups/$($target.id)/members?`$select=id")
$currentIds = @($current | ForEach-Object { $_.id })
foreach ($student in $students) {
    if (-not $student.accountEnabled) {
        Write-Warning "Skipping disabled account $($student.userPrincipalName)."
        continue
    }
    if ($student.id -notin $currentIds -and $PSCmdlet.ShouldProcess($student.userPrincipalName, "Add to $TargetGroupName with standing AI Reader access")) {
        Graph POST "groups/$($target.id)/members/`$ref" @{
            '@odata.id' = "https://graph.microsoft.com/v1.0/directoryObjects/$($student.id)"
        } | Out-Null
    }
}
if (-not $WhatIfPreference) {
    $verified = @(Read-Collection "groups/$($target.id)/members?`$select=id")
    $missing = @($students | Where-Object { $_.accountEnabled -and $_.id -notin @($verified | ForEach-Object { $_.id }) })
    $verifiedRoles = @(Read-Collection "roleManagement/directory/roleAssignments?`$filter=principalId%20eq%20'$($target.id)'")
    if ($missing.Count -gt 0 -or -not @($verifiedRoles | Where-Object { $_.roleDefinitionId -eq $roles[0].id -and $_.directoryScopeId -eq '/' }).Count) {
        throw 'Verification failed: missing members or active AI Reader assignment. Inspect the group before retrying.'
    }
    Write-Host "Verified target group $($target.id), active standing AI Reader and enabled source users."
}
Write-Warning 'This is an additive snapshot, not dynamic membership. Rerun after new attendees join; review and remove departed attendees separately. No licenses, CA policies or Logic Apps were changed.'
