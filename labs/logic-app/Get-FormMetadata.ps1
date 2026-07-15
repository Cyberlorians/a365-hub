<#
.SYNOPSIS
    Discovers the Form ID and question IDs needed to deploy the provisioner Logic App.

.DESCRIPTION
    Given a Microsoft Forms responder/design URL (or a raw form ID), this prints the
    form title, its public responder link, and every question's ID + title. Copy the
    full-name and email question IDs into deploy.ps1 (or the template parameters).

    Auth uses your current Azure CLI login (az login) against the Forms resource -
    no secrets. You must be the form owner or a co-owner.

.EXAMPLE
    ./Get-FormMetadata.ps1 -FormUrl "https://forms.office.com/Pages/DesignPageV2.aspx?...&id=abc123..."

.EXAMPLE
    ./Get-FormMetadata.ps1 -FormId "<form-id>"
#>
[CmdletBinding(DefaultParameterSetName = 'ById')]
param(
    [Parameter(Mandatory, ParameterSetName = 'ByUrl')]
    [string] $FormUrl,

    [Parameter(Mandatory, ParameterSetName = 'ById')]
    [string] $FormId
)

$ErrorActionPreference = 'Stop'

if ($PSCmdlet.ParameterSetName -eq 'ByUrl') {
    if ($FormUrl -notmatch 'id=([^&]+)') {
        throw "Could not find an 'id=' value in the URL. Pass -FormId instead."
    }
    $FormId = [System.Uri]::UnescapeDataString($Matches[1])
}

$token = az account get-access-token --resource "https://forms.office.com" --query accessToken -o tsv
if (-not $token) { throw "Not signed in. Run 'az login' first." }
$headers = @{ Authorization = "Bearer $token" }

$form = Invoke-RestMethod -Method GET -Headers $headers -Uri "https://forms.office.com/formapi/api/forms('$FormId')"
$questions = Invoke-RestMethod -Method GET -Headers $headers -Uri "https://forms.office.com/formapi/api/forms('$FormId')/questions"

Write-Host ""
Write-Host "Form title    : $($form.title)"
Write-Host "Form ID       : $FormId"
Write-Host "Responder URL : https://forms.office.com/Pages/ResponsePage.aspx?id=$FormId"
Write-Host ""
Write-Host "Questions (copy the IDs you need into deploy.ps1):"
Write-Host ("{0,-40} {1}" -f "QUESTION ID", "TITLE")
Write-Host ("{0,-40} {1}" -f ("-" * 38), ("-" * 20))
foreach ($q in ($questions.value | Sort-Object order)) {
    Write-Host ("{0,-40} {1}" -f $q.id, $q.title)
}
Write-Host ""
