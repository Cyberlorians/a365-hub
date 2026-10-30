#requires -Version 7.2
[CmdletBinding()]
param(
    [Parameter(Mandatory)] [string] $ConfigPath,
    [switch] $RegisterApps
)
. (Join-Path $PSScriptRoot 'workshop-common.ps1')
$config = Read-WorkshopConfig $ConfigPath
$paths = Get-WorkshopPaths $ConfigPath
Initialize-PrivateDirectory $paths.private | Out-Null

if (-not (Test-Path -LiteralPath $paths.toolkit)) {
    & git clone --no-checkout 'https://github.com/stefanpems/a365-lab-toolkit.git' $paths.toolkit
    if ($LASTEXITCODE -ne 0) { throw 'Toolkit clone failed.' }
    & git -C $paths.toolkit checkout --detach $script:ToolkitRevision
    if ($LASTEXITCODE -ne 0) { throw 'Pinned toolkit checkout failed.' }
}
$revision = & git -C $paths.toolkit rev-parse HEAD
if ($LASTEXITCODE -ne 0 -or $revision -ne $script:ToolkitRevision) { throw 'Toolkit directory is not at the reviewed revision. Do not overwrite an existing checkout.' }

if ($RegisterApps) {
    Assert-WorkshopContext $config
    $state = Read-WorkshopState $paths.apps $config
    $mail = Invoke-WorkshopGraph $config GET "servicePrincipals?`$filter=appId eq 'ea9ffc3e-8a23-4a7d-836d-234d7c7565c1'" $null
    if ($mail.value.Count -eq 0) {
        $mailSp = Invoke-WorkshopGraph $config POST 'servicePrincipals' @{ appId = 'ea9ffc3e-8a23-4a7d-836d-234d7c7565c1' }
    } else { $mailSp = $mail.value[0] }
    $mailScope = @($mailSp.oauth2PermissionScopes | Where-Object { $_.value -eq 'McpServers.Mail.All' -and $_.isEnabled })
    if ($mailScope.Count -ne 1) { throw 'Agent 365 Mail scope is unavailable. Check tenant eligibility before continuing.' }
    foreach ($kind in @('cli', 'spa')) {
        $key = "${kind}AppId"
        if ($config[$key]) {
            $app = Invoke-WorkshopGraph $config GET "applications(appId='$($config[$key])')" $null
            if ($app.signInAudience -ne 'AzureADMyOrg') { throw "The $kind app must be single-tenant." }
        } elseif ($state.ContainsKey($key)) {
            $config[$key] = $state[$key]
        } else {
            $body = @{ displayName = "A365 Hub $($config.runName) $kind"; signInAudience = 'AzureADMyOrg' }
            if ($kind -eq 'cli') {
                $body.isFallbackPublicClient = $true
                $body.publicClient = @{ redirectUris = @('http://localhost', 'https://login.microsoftonline.com/common/oauth2/nativeclient') }
            } else {
                $body.spa = @{ redirectUris = @('http://localhost:3000') }
                $body.requiredResourceAccess = @(@{
                    resourceAppId = 'ea9ffc3e-8a23-4a7d-836d-234d7c7565c1'
                    resourceAccess = @(@{ id = $mailScope[0].id; type = 'Scope' })
                })
            }
            $app = Invoke-WorkshopGraph $config POST 'applications' $body
            $config[$key] = $app.appId
            $state[$key] = $app.appId
            $state["${kind}ObjectId"] = $app.id
            Write-WorkshopJson $paths.apps $state
        }
        $sp = Invoke-WorkshopGraph $config GET "servicePrincipals?`$filter=appId eq '$($config[$key])'" $null
        if ($sp.value.Count -eq 0) { Invoke-WorkshopGraph $config POST 'servicePrincipals' @{ appId = $config[$key] } | Out-Null }
        Write-WorkshopJson $ConfigPath $config
    }
}
foreach ($key in @('cliAppId', 'spaAppId')) {
    if (-not $config[$key]) { throw "Sources downloaded. Next, sign in and rerun with -RegisterApps to create $key (or supply an existing approved app)." }
}
$agentPath = Join-Path $paths.toolkit 'aca\obo'
$agentConfigPath = Join-Path $agentPath 'a365.config.json'
if (-not (Test-Path -LiteralPath $agentConfigPath)) {
    $agentConfig = Get-Content (Join-Path $agentPath 'a365.config.json.example') -Raw | ConvertFrom-Json -AsHashtable
    $agentConfig.tenantId = $config.tenantId
    $agentConfig.clientAppId = $config.cliAppId
    $agentConfig.agentIdentityDisplayName = "A365 Hub $($config.runName) Identity"
    $agentConfig.agentBlueprintDisplayName = "A365 Hub $($config.runName) Blueprint"
    Write-WorkshopJson $agentConfigPath $agentConfig
} else {
    $agentConfig = Get-Content -LiteralPath $agentConfigPath -Raw | ConvertFrom-Json -AsHashtable
    if ($agentConfig.tenantId -ne $config.tenantId -or $agentConfig.clientAppId -ne $config.cliAppId) { throw 'Existing Agent 365 config belongs to another tenant/client. Use a separate workshop directory.' }
}
Write-Host "Sources and app configuration ready. Next: Set-Location '$agentPath'; run the a365 setup commands in the Module 2 admin guide."
