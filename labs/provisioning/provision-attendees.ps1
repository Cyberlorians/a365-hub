<#
.SYNOPSIS
    Provisions A365 workshop attendee accounts + issues 8h multi-use TAPs.

.DESCRIPTION
    Reads a CSV of attendees and, for each row, creates a cloud member account
    tagged department=workshop (so the dynamic group "A365-Workshop-Attendees"
    auto-captures it and CA015 enforces MFA). Then issues a multi-use Temporary
    Access Pass (TAP) that satisfies the MFA requirement, so attendees can sign
    in on lab machines with NO phone and NO BYOD.

    Auth model: SECRET-LESS. This script uses YOUR delegated sign-in via
    Connect-MgGraph. No app registration or client secret is required.
    (The unattended Power Automate/Logic App path uses a managed identity -
     see docs/04-onboarding-flow.md.)

    Idempotent: existing accounts are skipped (a fresh TAP is still issued).

.PARAMETER CsvPath
    Path to the attendee CSV. Required columns: DisplayName. Optional: MailNickname.

.PARAMETER Domain
    Verified tenant domain used to build the UPN.

.PARAMETER TapLifetimeMinutes
    TAP lifetime in minutes (must be <= tenant TAP max). Default: 480 (8h).

.PARAMETER OutputPath
    Where to write the distribution CSV (UPN + TAP). Default: .\attendee-credentials.csv

.EXAMPLE
    .\provision-attendees.ps1 -CsvPath .\attendees.sample.csv
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory)] [string] $CsvPath,
    [Parameter(Mandatory)] [string] $Domain,
    [int]    $TapLifetimeMinutes = 480,
    [string] $OutputPath = ".\attendee-credentials.csv"
)

$ErrorActionPreference = "Stop"
$GraphBase = "https://graph.microsoft.com/v1.0"

# --- Connect (delegated, no secret) ---
$scopes = @(
    "User.ReadWrite.All",
    "Group.Read.All",
    "UserAuthenticationMethod.ReadWrite.All"
)
if (-not (Get-MgContext)) {
    Write-Host "Connecting to Microsoft Graph (delegated sign-in)..." -ForegroundColor Cyan
    Connect-MgGraph -Scopes $scopes -NoWelcome
}
$ctx = Get-MgContext
Write-Host "Connected as $($ctx.Account) | Tenant $($ctx.TenantId)" -ForegroundColor Green

# --- Load attendees ---
if (-not (Test-Path $CsvPath)) { throw "CSV not found: $CsvPath" }
$attendees = Import-Csv -Path $CsvPath
if (-not $attendees) { throw "No rows in $CsvPath" }
Write-Host "Loaded $($attendees.Count) attendee(s) from $CsvPath" -ForegroundColor Cyan

$results = New-Object System.Collections.Generic.List[object]

function New-RandomPassword {
    -join ((65..90) + (97..122) + (48..57) + (33,35,37,64) | Get-Random -Count 20 | ForEach-Object { [char]$_ })
}

foreach ($a in $attendees) {
    $display = ($a.DisplayName).Trim()
    if ([string]::IsNullOrWhiteSpace($display)) { Write-Warning "Skipping row with empty DisplayName"; continue }

    # Build a deterministic mailNickname/UPN if not supplied
    $nick = if ($a.PSObject.Properties.Name -contains 'MailNickname' -and $a.MailNickname) {
        ($a.MailNickname).Trim()
    } else {
        ($display -replace '[^a-zA-Z0-9]', '').ToLower()
    }
    $upn = "$nick@$Domain"

    try {
        # Idempotency: does the user already exist?
        $existing = $null
        try {
            $existing = Invoke-MgGraphRequest -Method GET -Uri "$GraphBase/users/$upn"
        } catch { $existing = $null }

        if ($existing) {
            $userId = $existing.id
            Write-Host "  [exists] $upn ($userId)" -ForegroundColor Yellow
        } else {
            $body = @{
                accountEnabled    = $true
                displayName       = $display
                mailNickname      = $nick
                userPrincipalName = $upn
                department        = "workshop"      # <-- drives dynamic group + teardown
                usageLocation     = "US"
                passwordProfile   = @{
                    forceChangePasswordNextSignIn = $true
                    password                      = (New-RandomPassword)
                }
            } | ConvertTo-Json
            $user = Invoke-MgGraphRequest -Method POST -Uri "$GraphBase/users" -Body $body
            $userId = $user.id
            Write-Host "  [created] $upn ($userId)" -ForegroundColor Green
        }

        # Issue a fresh multi-use TAP
        $tapBody = @{ lifetimeInMinutes = $TapLifetimeMinutes; isUsableOnce = $false } | ConvertTo-Json
        $tap = Invoke-MgGraphRequest -Method POST `
            -Uri "$GraphBase/users/$userId/authentication/temporaryAccessPassMethods" -Body $tapBody

        $results.Add([pscustomobject]@{
            DisplayName       = $display
            UserPrincipalName = $upn
            TemporaryAccessPass = $tap.temporaryAccessPass
            LifetimeMinutes   = $tap.lifetimeInMinutes
            StartDateTime     = $tap.startDateTime
        })
        Write-Host "    TAP issued (valid $($tap.lifetimeInMinutes) min)" -ForegroundColor Green
    }
    catch {
        Write-Warning "  FAILED for '$display' ($upn): $($_.Exception.Message)"
    }
}

# --- Output distribution table ---
$results | Format-Table -AutoSize
$results | Export-Csv -Path $OutputPath -NoTypeInformation -Encoding UTF8
Write-Host "`nWrote credentials to $OutputPath" -ForegroundColor Cyan
Write-Warning "This file contains live TAPs. Distribute securely and delete after the workshop."
