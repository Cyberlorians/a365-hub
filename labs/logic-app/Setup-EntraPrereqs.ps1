<#
.SYNOPSIS
    Creates the Entra ID prerequisites for the A365 onboarding pipeline, idempotently:
      1. The dynamic attendee group (department = workshop).
      2. The Conditional Access MFA policy scoped to that group.
      3. Group-based licensing (best-effort - assigns whatever of the requested SKUs exist).
    Then lists OTHER Conditional Access policies you should review to (manually) exclude
    the attendee group - external/unmanaged attendees can be blocked by device/compliance
    policies. The script never modifies those other policies.

.DESCRIPTION
    Uses Microsoft Graph PowerShell (delegated) so it can request the exact scopes needed
    for Conditional Access + group + licensing. Run as a Global Administrator.
    Everything is idempotent (safe to re-run) and supports -DryRun (no writes).

    Lockout guard: if -PolicyState enabled is requested with NO break-glass exclusions,
    the script downgrades the policy to report-only to avoid locking admins out.

.EXAMPLE
    # Safe preview - shows exactly what would happen, writes nothing
    ./Setup-EntraPrereqs.ps1 -DryRun

.EXAMPLE
    # Create everything; enforce MFA but exclude a break-glass admin
    ./Setup-EntraPrereqs.ps1 -PolicyState enabled -ExcludeUserUpns "admin@contoso.onmicrosoft.com"

.NOTES
    Consented scopes: Group.ReadWrite.All, Policy.ReadWrite.ConditionalAccess,
    LicenseAssignment.ReadWrite.All, Organization.Read.All, Directory.Read.All,
    User.Read.All
#>
[CmdletBinding()]
param(
    [string]   $GroupName    = "A365-Workshop-Attendees",
    [string]   $Department   = "workshop",
    [string]   $CaPolicyName = "CA015 - A365 Workshop Require MFA",

    # Break-glass / admin accounts to EXCLUDE from the CA policy (prevents lockout).
    [string[]] $ExcludeUserUpns = @(),

    [ValidateSet("enabledForReportingButNotEnforced", "enabled")]
    [string]   $PolicyState = "enabledForReportingButNotEnforced",

    # SKUs to assign to the group (best-effort - missing ones are skipped with a note).
    [string[]] $LicenseSkuPartNumbers = @(
        'Microsoft_365_E5_(no_Teams)',
        'Microsoft_365_Copilot',
        'AGENT_365',
        'Microsoft_Teams_Enterprise_New'
    ),

    [switch]   $DryRun
)

$ErrorActionPreference = 'Stop'
function Note($m) { Write-Host "[NOTE] $m" -ForegroundColor Yellow }
function Act($m)  { Write-Host "[DO]   $m" -ForegroundColor Cyan }
function Skip($m) { Write-Host "[SKIP] $m" -ForegroundColor DarkGray }

# --- Ensure Graph auth module ---
if (-not (Get-Module -ListAvailable -Name Microsoft.Graph.Authentication)) {
    Act "Installing Microsoft.Graph.Authentication (CurrentUser scope)"
    if (-not $DryRun) { Install-Module Microsoft.Graph.Authentication -Scope CurrentUser -Force -AllowClobber }
}
Import-Module Microsoft.Graph.Authentication -ErrorAction Stop

Connect-MgGraph -NoWelcome -Scopes @(
    "Group.ReadWrite.All",
    "Policy.ReadWrite.ConditionalAccess",
    "LicenseAssignment.ReadWrite.All",
    "Organization.Read.All",
    "Directory.Read.All",
    "User.Read.All"
)

function Graph($Method, $Uri, $Body) {
    if ($null -ne $Body) {
        return Invoke-MgGraphRequest -Method $Method -Uri $Uri -Body ($Body | ConvertTo-Json -Depth 20) -ContentType "application/json"
    }
    return Invoke-MgGraphRequest -Method $Method -Uri $Uri
}

# ============================================================
# 1. Dynamic attendee group
# ============================================================
Write-Host "`n== 1. Dynamic group '$GroupName' ==" -ForegroundColor White
$rule = "(user.department -eq `"$Department`")"
$existing = (Graph GET "https://graph.microsoft.com/v1.0/groups?`$filter=displayName eq '$GroupName'&`$select=id,displayName,membershipRule").value
if ($existing) {
    $groupId = $existing[0].id
    Skip "group already exists (id $groupId)"
}
else {
    $body = @{
        displayName                   = $GroupName
        description                   = "A365 workshop attendees (auto-populated: department=$Department)."
        mailEnabled                   = $false
        mailNickname                  = ($GroupName -replace '[^a-zA-Z0-9]', '')
        securityEnabled               = $true
        groupTypes                    = @("DynamicMembership")
        membershipRule                = $rule
        membershipRuleProcessingState = "On"
    }
    Act "create dynamic security group; rule = $rule"
    if ($DryRun) { $groupId = "<dryrun-group-id>" }
    else { $groupId = (Graph POST "https://graph.microsoft.com/v1.0/groups" $body).id; Write-Host "  created id $groupId" }
}

# ============================================================
# 2. Conditional Access policy (require MFA for the group)
# ============================================================
Write-Host "`n== 2. Conditional Access '$CaPolicyName' ==" -ForegroundColor White
$excludeIds = @()
foreach ($upn in $ExcludeUserUpns) {
    try { $excludeIds += (Graph GET "https://graph.microsoft.com/v1.0/users/$upn`?`$select=id").id; Write-Host "  exclude break-glass: $upn" }
    catch { Note "could not resolve exclude user '$upn' - skipping" }
}
if ($PolicyState -eq "enabled" -and $excludeIds.Count -eq 0) {
    Note "PolicyState=enabled but NO break-glass exclusions given -> downgrading to report-only to avoid lockout. Re-run with -ExcludeUserUpns <admin> to enforce."
    $PolicyState = "enabledForReportingButNotEnforced"
}

$existingCa = (Graph GET "https://graph.microsoft.com/v1.0/identity/conditionalAccess/policies?`$select=id,displayName,state").value |
    Where-Object { $_.displayName -eq $CaPolicyName }
if ($existingCa) {
    Skip "CA policy already exists (id $($existingCa[0].id), state $($existingCa[0].state))"
}
else {
    $ca = @{
        displayName   = $CaPolicyName
        state         = $PolicyState
        conditions    = @{
            applications   = @{ includeApplications = @("All") }
            users          = @{ includeGroups = @($groupId); excludeUsers = $excludeIds }
            clientAppTypes = @("all")
        }
        grantControls = @{ operator = "OR"; builtInControls = @("mfa") }
    }
    Act "create CA policy (state=$PolicyState, includeGroup=$groupId, excludeUsers=$($excludeIds.Count))"
    if ($DryRun) { Skip "DryRun: not creating CA policy" }
    else { $newCa = Graph POST "https://graph.microsoft.com/v1.0/identity/conditionalAccess/policies" $ca; Write-Host "  created id $($newCa.id)" }
}

# ============================================================
# 3. Group-based licensing (best-effort)
# ============================================================
Write-Host "`n== 3. Group-based licensing ==" -ForegroundColor White
$skus = (Graph GET "https://graph.microsoft.com/v1.0/subscribedSkus?`$select=skuId,skuPartNumber,prepaidUnits,consumedUnits").value
$addLicenses = @()
foreach ($part in $LicenseSkuPartNumbers) {
    $sku = $skus | Where-Object { $_.skuPartNumber -eq $part }
    if (-not $sku) { Note "SKU '$part' not present in tenant - skipping (assign manually if added later)"; continue }
    if ($sku.prepaidUnits.enabled -le 0) { Note "SKU '$part' has 0 enabled seats - skipping"; continue }
    $free = $sku.prepaidUnits.enabled - $sku.consumedUnits
    Act "add license '$part' ($($sku.skuId)); ~$free seats free"
    $addLicenses += @{ skuId = $sku.skuId; disabledPlans = @() }
}
if ($addLicenses.Count -gt 0) {
    if ($DryRun) { Skip "DryRun: not calling assignLicense" }
    else {
        Graph POST "https://graph.microsoft.com/v1.0/groups/$groupId/assignLicense" @{ addLicenses = $addLicenses; removeLicenses = @() } | Out-Null
        Write-Host "  assigned $($addLicenses.Count) license(s) to the group"
    }
}
else {
    Note "No licenses assigned (none of the requested SKUs were available). Continuing - assign manually later (runbook Section 9)."
}

# ============================================================
# 4. Advisory: exclude the group from OTHER CA policies (manual)
# ============================================================
Write-Host "`n== 4. Other Conditional Access policies - REVIEW MANUALLY ==" -ForegroundColor White
$others = (Graph GET "https://graph.microsoft.com/v1.0/identity/conditionalAccess/policies?`$select=id,displayName,state").value |
    Where-Object { $_.displayName -ne $CaPolicyName }
if ($others) {
    Note "Attendees are external/unmanaged. These policies MAY block them (device compliance, managed device, block legacy auth, etc.). Review each and, if needed, EXCLUDE group '$GroupName' ($groupId). This must be TESTED MANUALLY - the script does NOT modify them:"
    foreach ($p in ($others | Sort-Object displayName)) {
        Write-Host ("   - [{0}] {1}  (id {2})" -f $p.state, $p.displayName, $p.id)
    }
}
else {
    Skip "no other CA policies found"
}

Write-Host "`nDone. Attendee group id: $groupId" -ForegroundColor Green
if ($DryRun) { Write-Host "(DryRun - no changes were written)" -ForegroundColor Yellow }
