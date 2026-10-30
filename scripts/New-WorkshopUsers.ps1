#requires -Version 7.2
[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory)] [guid] $TenantId,
    [Parameter(Mandatory)] [ValidatePattern('^[a-z][a-z0-9]{2,12}$')] [string] $RunName,
    [Parameter(Mandatory)] [ValidatePattern('^[a-zA-Z0-9.-]+$')] [string] $Domain,
    [ValidateSet('PrepareGroup', 'Provision', 'Close')] [string] $Stage = 'PrepareGroup',
    [ValidateRange(1, 50)] [int] $LearnerCount = 1,
    [guid[]] $SkuIds = @(),
    [ValidatePattern('^[A-Z]{2}$')] [string] $UsageLocation = 'US',
    [ValidateRange(10, 480)] [int] $TapLifetimeMinutes = 60,
    [switch] $RenewTaps,
    [string] $OutputDirectory = (Join-Path $PSScriptRoot '..\.workshop\users')
)
. (Join-Path $PSScriptRoot 'workshop-common.ps1')
Import-Module Microsoft.Graph.Authentication -ErrorAction Stop
Connect-MgGraph -TenantId $TenantId -ContextScope Process -NoWelcome -Scopes @(
    'User.ReadWrite.All', 'UserAuthenticationMethod.ReadWrite.All',
    'Group.ReadWrite.All', 'Organization.Read.All', 'Domain.Read.All', 'LicenseAssignment.ReadWrite.All'
)
if ((Get-MgContext).TenantId -ne $TenantId.ToString()) { throw 'Wrong Graph tenant.' }
$private = Initialize-PrivateDirectory $OutputDirectory
$manifestPath = Join-Path $private 'users.json'
$credentialsPath = Join-Path $private 'attendee-credentials.csv'
function Graph {
    param([string] $Method, [string] $Path, [object] $Body)
    $args = @{ Method = $Method; Uri = "https://graph.microsoft.com/v1.0/$Path"; OutputType = 'PSObject' }
    if ($null -ne $Body) { $args.Body = $Body | ConvertTo-Json -Depth 15; $args.ContentType = 'application/json' }
    Invoke-MgGraphRequest @args
}
$manifest = if (Test-Path -LiteralPath $manifestPath) {
    Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json -AsHashtable
} else { @{ tenantId = $TenantId.ToString(); runName = $RunName; domain = $Domain; users = @() } }
if ($manifest.tenantId -ne $TenantId.ToString() -or $manifest.runName -ne $RunName -or $manifest.domain -ne $Domain) { throw 'User manifest belongs to a different tenant/run/domain. Choose another output directory.' }
if ($Stage -eq 'Close') {
    foreach ($user in $manifest.users) {
        $actual = Graph GET "users/$($user.id)?`$select=id,userPrincipalName" $null
        if ($actual.userPrincipalName -ne $user.upn) { throw 'Manifest user does not match the live directory; nothing further will be disabled.' }
        if ($PSCmdlet.ShouldProcess($user.upn, 'Disable this exact run-created account and revoke sign-in sessions')) {
            Graph PATCH "users/$($user.id)" @{ accountEnabled = $false } | Out-Null
            Graph POST "users/$($user.id)/revokeSignInSessions" @{} | Out-Null
        }
    }
    Write-Host 'Close stage finished. -WhatIf makes no changes. Licenses, mail, retention and permanent deletion still require the event owner.'
    return
}
$domainRecord = Graph GET "domains/$Domain" $null
if (-not $domainRecord.isVerified) { throw 'The domain is not verified in the target tenant.' }
if (-not $manifest.ContainsKey('groupId')) {
    $existing = Graph GET "groups?`$filter=displayName eq 'A365 Hub $RunName'" $null
    if ($existing.value.Count -ne 0) { throw 'A same-name group already exists outside this manifest. Choose a new runName; no existing group will be changed.' }
    if (-not $PSCmdlet.ShouldProcess("A365 Hub $RunName", 'Create the run-owned security group')) { return }
    $group = Graph POST 'groups' @{
        displayName = "A365 Hub $RunName"; mailEnabled = $false; securityEnabled = $true
        mailNickname = "a365hub-$RunName"
    }
    $manifest.groupId = $group.id
    Write-WorkshopJson $manifestPath $manifest
}
if ($Stage -eq 'PrepareGroup') {
    Write-Host "Group ID: $($manifest.groupId)"
    Write-Host 'Next: enable TAP for this group in Entra Authentication methods. Then rerun -Stage Provision with explicit mailbox/Agent 365 license SKU IDs.'
    return
}
if ($SkuIds.Count -eq 0) { throw 'Specify approved -SkuIds. A mailbox-enabled license is required; the script never guesses or assigns every available SKU.' }
$skuRecords = (Graph GET 'subscribedSkus' $null).value
$wanted = @()
for ($i = 1; $i -le $LearnerCount; $i++) { $wanted += @{ nickname = "$RunName-learner$('{0:d2}' -f $i)"; role = 'learner' } }
$wanted += @{ nickname = "$RunName-recipient"; role = 'recipient' }
$knownUpns = @($manifest.users | ForEach-Object { $_.upn })
$newCount = @($wanted | Where-Object { "$($_.nickname)@$Domain" -notin $knownUpns }).Count
foreach ($skuId in $SkuIds) {
    $sku = @($skuRecords | Where-Object { $_.skuId -eq $skuId.ToString() })
    if ($sku.Count -ne 1 -or $sku[0].capabilityStatus -ne 'Enabled' -or ($sku[0].prepaidUnits.enabled - $sku[0].consumedUnits) -lt $newCount) {
        throw "SKU $skuId is missing, disabled, or lacks $newCount free seats. No users have been created by this invocation."
    }
}
$manifest.licenseSkuIds = @($SkuIds | ForEach-Object { $_.ToString() })
Write-WorkshopJson $manifestPath $manifest
$credentials = @(if (Test-Path -LiteralPath $credentialsPath) { Import-Csv -LiteralPath $credentialsPath })
foreach ($entry in $wanted) {
    $upn = "$($entry.nickname)@$Domain"
    $record = @($manifest.users | Where-Object { $_.upn -eq $upn })
    if ($record.Count -eq 0) {
        $existing = Graph GET "users?`$filter=userPrincipalName eq '$upn'" $null
        if ($existing.value.Count -ne 0) { throw "Refusing to take over existing account $upn. Use a new runName." }
        if (-not $PSCmdlet.ShouldProcess($upn, 'Create isolated account, join run group, assign selected licenses and issue TAP')) { continue }
        $password = 'Wk1!' + [Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
        $user = Graph POST 'users' @{
            accountEnabled = $true; displayName = "A365 $RunName $($entry.role) $($entry.nickname)"
            mailNickname = $entry.nickname; userPrincipalName = $upn
            department = "a365hub-$RunName"; usageLocation = $UsageLocation
            passwordProfile = @{ forceChangePasswordNextSignIn = $true; password = $password }
        }
        $record = @(@{ id = $user.id; upn = $upn; role = $entry.role })
        $manifest.users += $record[0]
        Write-WorkshopJson $manifestPath $manifest
    } elseif (-not $PSCmdlet.ShouldProcess($upn, 'Finish preparation for the existing run-owned account')) { continue }
    $userId = $record[0].id
    $actual = Graph GET "users/$userId`?`$select=id,userPrincipalName" $null
    if ($actual.userPrincipalName -ne $upn) { throw "Manifest mismatch for $upn." }
    $members = Graph GET "groups/$($manifest.groupId)/members?`$select=id" $null
    if ($userId -notin @($members.value | ForEach-Object { $_.id })) {
        Graph POST "groups/$($manifest.groupId)/members/`$ref" @{ '@odata.id' = "https://graph.microsoft.com/v1.0/directoryObjects/$userId" } | Out-Null
    }
    $assigned = (Graph GET "users/$userId/licenseDetails" $null).value
    $assignedIds = @($assigned | ForEach-Object { $_.skuId })
    $add = @($SkuIds | Where-Object { $_.ToString() -notin $assignedIds } | ForEach-Object { @{ skuId = $_.ToString(); disabledPlans = @() } })
    if ($add.Count) { Graph POST "users/$userId/assignLicense" @{ addLicenses = $add; removeLicenses = @() } | Out-Null }
    if ($RenewTaps -or $upn -notin @($credentials | ForEach-Object { $_.UserPrincipalName })) {
        $existingTaps = Graph GET "users/$userId/authentication/temporaryAccessPassMethods" $null
        if ($existingTaps.value.Count -ne 0 -and -not $RenewTaps) { throw "An undistributed TAP may exist for $upn. Review it, then use -RenewTaps to explicitly replace this run's passes." }
        foreach ($method in $existingTaps.value) {
            Graph DELETE "users/$userId/authentication/temporaryAccessPassMethods/$($method.id)" $null | Out-Null
        }
        $tap = Graph POST "users/$userId/authentication/temporaryAccessPassMethods" @{ lifetimeInMinutes = $TapLifetimeMinutes; isUsableOnce = $false }
        if (-not $tap.temporaryAccessPass) { throw "No TAP returned for $upn. Verify group membership and TAP policy." }
        $credentials = @($credentials | Where-Object { $_.UserPrincipalName -ne $upn }) + @([pscustomobject]@{
            UserPrincipalName = $upn; TemporaryAccessPass = $tap.temporaryAccessPass
            StartDateTime = $tap.startDateTime; LifetimeMinutes = $tap.lifetimeInMinutes
        })
        $credentials | Export-Csv -LiteralPath $credentialsPath -NoTypeInformation -Encoding utf8
    }
    Write-Host "Prepared $upn ($($entry.role)). Verify actual sign-in and mailbox readiness before distributing."
}
Write-Host "Private credential file: $credentialsPath (contains live TAPs; never project or commit)."
Write-Host "Manifest: $manifestPath. Mailbox creation can take time; verify Outlook and send/receive before the agent test."
