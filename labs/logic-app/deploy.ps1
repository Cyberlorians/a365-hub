<#
.SYNOPSIS
    One-shot, repeatable deployment of the A365 Workshop secret-less onboarding pipeline
    into any tenant/subscription.

.DESCRIPTION
    Deploys, in order:
      1. Two API connections (Microsoft Forms + Office 365 Outlook).
      2. The Forms-triggered provisioner Logic App (creates lab user + 8h TAP + email).
      3. The hourly cleanup Logic App (deletes workshop accounts after the TAP expires).
    Then grants each Logic App's system-assigned managed identity the least-privilege
    Microsoft Graph app roles it needs. No app registration, no client secret.

    The ONLY manual step is authorizing the two API connections (OAuth consent) - the
    script pauses and tells you exactly where to click.

.PREREQUISITES
    - Azure CLI (az) logged in as a user who is Owner/Contributor on the target
      subscription AND a Global Administrator (for the Graph app-role grants).
    - A Microsoft Form already created in the target tenant. Run Get-FormMetadata.ps1
      to obtain -FormId, -FullNameQuestionId, and -EmailQuestionId.
    - Entra prerequisites (see docs/04-onboarding-flow.md): TAP policy enabled,
      dynamic group + Conditional Access as desired.

.EXAMPLE
    ./deploy.ps1 `
        -SubscriptionId "00000000-0000-0000-0000-000000000000" `
        -ResourceGroup  "A365-Workshop" `
        -Location       "eastus2" `
        -UpnDomain      "contoso.onmicrosoft.com" `
        -FormId             "<form-id>" `
        -FullNameQuestionId "<full-name-question-id>" `
        -EmailQuestionId    "<email-question-id>"
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory)] [string] $SubscriptionId,
    [Parameter(Mandatory)] [string] $ResourceGroup,
    [string] $Location = "eastus2",
    [Parameter(Mandatory)] [string] $UpnDomain,
    [Parameter(Mandatory)] [string] $FormId,
    [Parameter(Mandatory)] [string] $FullNameQuestionId,
    [Parameter(Mandatory)] [string] $EmailQuestionId,

    [string] $ProvisionerName = "A365-Workshop-Provisioner",
    [string] $CleanupName     = "A365-Workshop-Cleanup",
    [string] $FormsConnectionName    = "microsoftforms",
    [string] $Office365ConnectionName = "office365-1",
    [int]    $TapLifetimeMinutes     = 480,
    [int]    $AccountLifetimeMinutes = 480,
    [switch] $SkipConnections
)

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path

# Microsoft Graph application app-role IDs (constant across tenants)
$GRAPH_APP_ID = '00000003-0000-0000-c000-000000000000'
$ROLE = @{
    'User.ReadWrite.All'                     = '741f803b-c850-494e-b5df-cde7c675a1ca'
    'UserAuthenticationMethod.ReadWrite.All' = '50483e42-d915-4231-9639-7fdb7fd190e5'
}

function Grant-GraphRole {
    param([string] $PrincipalId, [string[]] $RoleNames)
    $gtok = az account get-access-token --resource "https://graph.microsoft.com" --query accessToken -o tsv
    $gh = @{ Authorization = "Bearer $gtok"; 'Content-Type' = 'application/json' }
    $graphSp = (Invoke-RestMethod -Method GET -Headers $gh `
        -Uri "https://graph.microsoft.com/v1.0/servicePrincipals?`$filter=appId eq '$GRAPH_APP_ID'").value[0]
    $existing = (Invoke-RestMethod -Method GET -Headers $gh `
        -Uri "https://graph.microsoft.com/v1.0/servicePrincipals/$PrincipalId/appRoleAssignments").value
    foreach ($name in $RoleNames) {
        $roleId = $ROLE[$name]
        if ($existing | Where-Object { $_.appRoleId -eq $roleId -and $_.resourceId -eq $graphSp.id }) {
            Write-Host "    [=] $name already granted"
            continue
        }
        $body = @{ principalId = $PrincipalId; resourceId = $graphSp.id; appRoleId = $roleId } | ConvertTo-Json
        Invoke-RestMethod -Method POST -Headers $gh `
            -Uri "https://graph.microsoft.com/v1.0/servicePrincipals/$PrincipalId/appRoleAssignments" -Body $body | Out-Null
        Write-Host "    [+] granted $name"
    }
}

Write-Host "==> Selecting subscription $SubscriptionId"
az account set --subscription $SubscriptionId | Out-Null

Write-Host "==> Ensuring resource group $ResourceGroup ($Location)"
az group create --name $ResourceGroup --location $Location --only-show-errors | Out-Null

if (-not $SkipConnections) {
    Write-Host "==> Deploying API connections (Forms + Office 365)"
    az deployment group create --resource-group $ResourceGroup `
        --name "connections-$(Get-Date -Format yyyyMMddHHmmss)" `
        --template-file (Join-Path $here 'connections.template.json') `
        --parameters location=$Location formsConnectionName=$FormsConnectionName office365ConnectionName=$Office365ConnectionName `
        --only-show-errors --query "properties.provisioningState" -o tsv

    Write-Host ""
    Write-Host "  ------------------------------------------------------------------" -ForegroundColor Yellow
    Write-Host "  MANUAL STEP: authorize the two connections (one-time OAuth consent)" -ForegroundColor Yellow
    Write-Host "  Azure Portal > Resource group '$ResourceGroup' > open each API" -ForegroundColor Yellow
    Write-Host "  Connection ('$FormsConnectionName' and '$Office365ConnectionName')" -ForegroundColor Yellow
    Write-Host "  > 'Edit API connection' / 'Authorize' > sign in as the form owner /" -ForegroundColor Yellow
    Write-Host "  the mailbox that sends the pass > Save." -ForegroundColor Yellow
    Write-Host "  ------------------------------------------------------------------" -ForegroundColor Yellow
    Read-Host "  Press ENTER once both connections show 'Connected'"
}

Write-Host "==> Deploying provisioner Logic App ($ProvisionerName)"
$provPrincipal = az deployment group create --resource-group $ResourceGroup `
    --name "provisioner-$(Get-Date -Format yyyyMMddHHmmss)" `
    --template-file (Join-Path $here 'provisioner-forms.template.json') `
    --parameters logicAppName=$ProvisionerName location=$Location upnDomain=$UpnDomain `
                 tapLifetimeMinutes=$TapLifetimeMinutes formId=$FormId `
                 fullNameQuestionId=$FullNameQuestionId emailQuestionId=$EmailQuestionId `
                 formsConnectionName=$FormsConnectionName office365ConnectionName=$Office365ConnectionName `
    --only-show-errors --query "properties.outputs.principalId.value" -o tsv
Write-Host "    provisioner MI principalId: $provPrincipal"

Write-Host "==> Deploying cleanup Logic App ($CleanupName)"
$cleanPrincipal = az deployment group create --resource-group $ResourceGroup `
    --name "cleanup-$(Get-Date -Format yyyyMMddHHmmss)" `
    --template-file (Join-Path $here 'cleanup.template.json') `
    --parameters logicAppName=$CleanupName location=$Location accountLifetimeMinutes=$AccountLifetimeMinutes `
    --only-show-errors --query "properties.outputs.principalId.value" -o tsv
Write-Host "    cleanup MI principalId: $cleanPrincipal"

Write-Host "==> Granting Graph app roles (may take a moment to propagate)"
Write-Host "  Provisioner MI:"
Grant-GraphRole -PrincipalId $provPrincipal -RoleNames @('User.ReadWrite.All','UserAuthenticationMethod.ReadWrite.All')
Write-Host "  Cleanup MI:"
Grant-GraphRole -PrincipalId $cleanPrincipal -RoleNames @('User.ReadWrite.All')

Write-Host ""
Write-Host "==> Done. Public form link:" -ForegroundColor Green
Write-Host "    https://forms.office.com/Pages/ResponsePage.aspx?id=$FormId" -ForegroundColor Green
Write-Host "    Submit a test response and check the provisioner run history."
