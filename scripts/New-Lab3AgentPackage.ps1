<#
.SYNOPSIS
Zips the Lab 3 practice agent ("Project Beacon") so an admin can upload it in the Microsoft 365 admin center.

.DESCRIPTION
Builds .workshop\lab3\ProjectBeacon.zip from labs\workshop\lab3-project-beacon. It only creates a local
file. It changes nothing in your tenant. Then upload it yourself:
  Microsoft 365 admin center > Agents > All agents > Add agent > upload the zip.
Publish it to yourself only and install it for no one. See docs\09-admin-lab-by-lab.md, "Populate Lab 3".
#>
[CmdletBinding()]
param([string] $OutputDirectory = (Join-Path (Join-Path $PSScriptRoot '..') '.workshop\lab3'))
$ErrorActionPreference = 'Stop'
$source = Join-Path $PSScriptRoot '..\labs\workshop\lab3-project-beacon'
foreach ($name in @('manifest.json', 'declarativeAgent.json', 'color.png', 'outline.png')) {
    if (-not (Test-Path -LiteralPath (Join-Path $source $name))) { throw "Missing $name in $source" }
}
New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null
$zip = Join-Path $OutputDirectory 'ProjectBeacon.zip'
if (Test-Path -LiteralPath $zip) { Remove-Item -LiteralPath $zip -Force }
Compress-Archive -Path (Join-Path $source 'manifest.json'), (Join-Path $source 'declarativeAgent.json'),
    (Join-Path $source 'color.png'), (Join-Path $source 'outline.png') -DestinationPath $zip
Write-Host "Created $zip"
Write-Host 'Next: Microsoft 365 admin center > Agents > All agents > Add agent > upload this file.'
Write-Host 'Publish to yourself only. Install: None. Then search the Registry for "Beacon".'
