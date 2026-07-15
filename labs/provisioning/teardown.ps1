<#
.SYNOPSIS
    Tears down all A365 workshop attendee accounts (department=workshop).

.DESCRIPTION
    Finds every cloud account tagged department=workshop and removes it.
    Because member accounts are NOT auto-deleted by access-package expiration,
    this script is the clean-up mechanism that makes the workshop repeatable.

    Deleting the users also empties the dynamic group "A365-Workshop-Attendees"
    automatically, so CA015 no longer applies to anyone. The dynamic group and
    CA015 policy are left in place for the next run.

    Auth model: SECRET-LESS delegated sign-in via Connect-MgGraph.

.PARAMETER WhatIf
    Preview the accounts that would be removed without deleting them.

.PARAMETER Force
    Skip the confirmation prompt.

.EXAMPLE
    .\teardown.ps1 -WhatIf      # preview
    .\teardown.ps1              # delete with confirmation
#>
[CmdletBinding(SupportsShouldProcess, ConfirmImpact = 'High')]
param(
    [switch] $Force
)

$ErrorActionPreference = "Stop"
$GraphBase = "https://graph.microsoft.com/v1.0"

if (-not (Get-MgContext)) {
    Write-Host "Connecting to Microsoft Graph (delegated sign-in)..." -ForegroundColor Cyan
    Connect-MgGraph -Scopes "User.ReadWrite.All" -NoWelcome
}
$ctx = Get-MgContext
Write-Host "Connected as $($ctx.Account) | Tenant $($ctx.TenantId)" -ForegroundColor Green

# Find all workshop accounts
$users = (Invoke-MgGraphRequest -Method GET `
    -Uri "$GraphBase/users?`$filter=department eq 'workshop'&`$select=id,displayName,userPrincipalName").value

if (-not $users -or $users.Count -eq 0) {
    Write-Host "No accounts with department=workshop found. Nothing to tear down." -ForegroundColor Yellow
    return
}

Write-Host "`nFound $($users.Count) workshop account(s):" -ForegroundColor Cyan
$users | ForEach-Object { Write-Host "  - $($_.userPrincipalName)" }

if (-not $Force -and -not $PSCmdlet.ShouldProcess("$($users.Count) workshop accounts", "DELETE")) {
    Write-Host "Aborted (no changes made)." -ForegroundColor Yellow
    return
}

$deleted = 0
foreach ($u in $users) {
    try {
        Invoke-MgGraphRequest -Method DELETE -Uri "$GraphBase/users/$($u.id)"
        Write-Host "  [deleted] $($u.userPrincipalName)" -ForegroundColor Green
        $deleted++
    } catch {
        Write-Warning "  FAILED to delete $($u.userPrincipalName): $($_.Exception.Message)"
    }
}
Write-Host "`nTeardown complete. Deleted $deleted of $($users.Count) accounts." -ForegroundColor Cyan
Write-Host "Dynamic group + CA015 left intact for the next workshop run." -ForegroundColor Cyan
