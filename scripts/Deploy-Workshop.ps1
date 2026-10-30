#requires -Version 7.2
[CmdletBinding()]
param(
    [Parameter(Mandatory)] [string] $ConfigPath,
    [switch] $Plan,
    [switch] $ApproveDeployment
)
. (Join-Path $PSScriptRoot 'workshop-common.ps1')
$config = Read-WorkshopConfig $ConfigPath
if ($Plan) {
    [pscustomobject]@{
        Tenant = $config.tenantId; Subscription = $config.subscriptionId
        ResourceGroup = $config.resourceGroup; Region = $config.location
        Creates = 'ACR, managed identity, Container Apps environment, API and web UI'
        Model = "$($config.openAiResourceGroup)/$($config.openAiAccount)/$($config.modelDeployment)"
        Changes = 'AcrPull and OpenAI User roles for the runtime; add UI redirect to the SPA'
        Deletes = 'Nothing'; TenantPolicies = 'Unchanged'
        Costs = 'ACR Basic, Container Apps, model tokens; operator must approve budget'
    }
    return
}
if (-not $ApproveDeployment) { throw 'Run -Plan first. Deployment requires -ApproveDeployment and the permissions/budget described in the admin guide.' }
Assert-WorkshopContext $config
$paths = Get-WorkshopPaths $ConfigPath
Initialize-PrivateDirectory $paths.private | Out-Null
$state = Read-WorkshopState $paths.state $config
if ($state.ContainsKey('resourceGroup') -and $state.resourceGroup -ne $config.resourceGroup) { throw 'Resource group differs from the saved deployment. Use a new private workshop directory instead of orphaning the earlier run.' }
foreach ($key in @('cliAppId', 'spaAppId')) {
    $id = [guid]::Empty
    if (-not [guid]::TryParse($config[$key], [ref] $id) -or $id -eq [guid]::Empty) { throw "Run Initialize-Workshop.ps1 first; $key is missing." }
}
$revision = & git -C $paths.toolkit rev-parse HEAD
if ($LASTEXITCODE -ne 0 -or $revision -ne $script:ToolkitRevision) { throw 'Initialize the pinned toolkit before deploying.' }
$generatedPath = Join-Path $paths.toolkit 'aca\obo\a365.generated.config.json'
$generated = Get-Content -LiteralPath $generatedPath -Raw | ConvertFrom-Json -AsHashtable
foreach ($key in @('agentBlueprintId', 'agenticAppId')) {
    $id = [guid]::Empty
    if (-not [guid]::TryParse($generated[$key], [ref] $id) -or $id -eq [guid]::Empty) { throw "a365 setup did not produce $key. Finish setup from aca\\obo first." }
}
$model = Invoke-WorkshopAz @('cognitiveservices', 'account', 'show', '-g', $config.openAiResourceGroup, '-n', $config.openAiAccount, '--subscription', $config.subscriptionId)
Invoke-WorkshopAz @('cognitiveservices', 'account', 'deployment', 'show', '-g', $config.openAiResourceGroup, '-n', $config.openAiAccount, '--deployment-name', $config.modelDeployment, '--subscription', $config.subscriptionId) | Out-Null
if (-not $model.properties.endpoint.StartsWith('https://')) { throw 'Azure OpenAI returned no HTTPS endpoint.' }
if (-not $state.ContainsKey('deploymentId')) {
    $state.deploymentId = [guid]::NewGuid().ToString()
    $state.resourceGroup = $config.resourceGroup
    Write-WorkshopJson $paths.state $state
}
$exists = Invoke-WorkshopAz @('group', 'exists', '-n', $config.resourceGroup, '--subscription', $config.subscriptionId)
if ($exists) {
    $group = Invoke-WorkshopAz @('group', 'show', '-n', $config.resourceGroup, '--subscription', $config.subscriptionId)
    if (-not $group.tags -or $group.tags.a365HubRun -ne $config.runName -or $group.tags.a365HubDeployment -ne $state.deploymentId) { throw 'Refusing to use a resource group not owned by this exact deployment manifest. Choose a new, dedicated resourceGroup.' }
} else {
    Invoke-WorkshopAz @('group', 'create', '-n', $config.resourceGroup, '-l', $config.location, '--tags', "a365HubRun=$($config.runName)", "a365HubDeployment=$($state.deploymentId)", '--subscription', $config.subscriptionId) | Out-Null
}
$state.resourceGroup = $config.resourceGroup
$state.toolkitRevision = $script:ToolkitRevision
$state.blueprintId = $generated.agentBlueprintId
$state.agentId = $generated.agenticAppId
$state.status = 'Infrastructure pending'
Write-WorkshopJson $paths.state $state
$templates = Join-Path $PSScriptRoot '..\labs\workshop'
$infra = Invoke-WorkshopAz @('deployment', 'group', 'create', '--subscription', $config.subscriptionId, '-g', $config.resourceGroup,
    '-n', "$($config.runName)-infrastructure", '--template-file', (Join-Path $templates 'infrastructure.bicep'),
    '--parameters', "location=$($config.location)", "runName=$($config.runName)", "openAiResourceGroup=$($config.openAiResourceGroup)", "openAiAccount=$($config.openAiAccount)")
if ($infra.properties.provisioningState -ne 'Succeeded') { throw 'Infrastructure deployment did not succeed.' }
$outputs = $infra.properties.outputs
$state.runtimeIdentityId = $outputs.identityId.value
$state.runtimePrincipalId = $outputs.runtimePrincipalId.value
$state.modelRoleAssignmentId = $outputs.modelRoleAssignmentId.value
Write-WorkshopJson $paths.state $state

$build = Initialize-PrivateDirectory (Join-Path $paths.private ("build-" + [guid]::NewGuid().ToString('N')))
$archive = Join-Path $build 'source.zip'
& git -C $paths.toolkit archive --format=zip "--output=$archive" $script:ToolkitRevision 'aca/obo' 'ui'
if ($LASTEXITCODE -ne 0) { throw 'Could not archive pinned, tracked source. No local secrets may be included in the build.' }
Expand-Archive -LiteralPath $archive -DestinationPath $build
Remove-Item -LiteralPath $archive
$imageTag = [DateTime]::UtcNow.ToString('yyyyMMddHHmmss')
$uiConfig = @{
    msal = @{ clientId = $config.spaAppId; authority = "https://login.microsoftonline.com/$($config.tenantId)" }
    agents = @(@{
        id = 'beacon'; kind = 'aca'; name = 'Project Beacon Mail Agent'
        description = 'Training only. Mail sends as the signed-in lab user.'
        apiBase = $outputs.apiUrl.value
        scope = 'ea9ffc3e-8a23-4a7d-836d-234d7c7565c1/McpServers.Mail.All'
    })
}
('window.APP_CONFIG = ' + ($uiConfig | ConvertTo-Json -Depth 10) + ';') | Set-Content (Join-Path $build 'ui\config.js') -Encoding utf8
Copy-Item (Join-Path $templates 'ui.Dockerfile') (Join-Path $build 'ui\Dockerfile')
foreach ($image in @(@{ name = 'beacon-api'; path = 'aca\obo' }, @{ name = 'beacon-ui'; path = 'ui' })) {
    Invoke-WorkshopAz @('acr', 'build', '--subscription', $config.subscriptionId, '-r', $outputs.registryName.value,
        '-t', "$($image.name):$imageTag", '--no-logs', (Join-Path $build $image.path)) | Out-Null
}

$spa = Invoke-WorkshopGraph $config GET "applications(appId='$($config.spaAppId)')" $null
$redirects = @(@($spa.spa.redirectUris) + $outputs.uiUrl.value | Select-Object -Unique)
Invoke-WorkshopGraph $config PATCH "applications/$($spa.id)" @{ spa = @{ redirectUris = $redirects } } | Out-Null

$secure = Read-Host 'Blueprint client secret from a365 setup (input hidden; not the encrypted generated value)' -AsSecureString
$parametersPath = Join-Path $paths.private ("parameters-" + [guid]::NewGuid().ToString('N') + '.json')
$pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
try {
    $parameters = @{
        location = $config.location; runName = $config.runName
        registryServer = $outputs.registryServer.value; identityId = $outputs.identityId.value
        environmentName = $outputs.environmentName.value; imageTag = $imageTag
        tenantId = $config.tenantId; blueprintId = $generated.agentBlueprintId; agentId = $generated.agenticAppId
        openAiEndpoint = $model.properties.endpoint; modelDeployment = $config.modelDeployment; modelApiVersion = $config.modelApiVersion
        blueprintSecret = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
    }
    $arm = @{ '$schema' = 'https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#'; contentVersion = '1.0.0.0'; parameters = @{} }
    foreach ($key in $parameters.Keys) { $arm.parameters[$key] = @{ value = $parameters[$key] } }
    Write-WorkshopJson $parametersPath $arm
    $deployment = Invoke-WorkshopAz @('deployment', 'group', 'create', '--subscription', $config.subscriptionId,
        '-g', $config.resourceGroup, '-n', "$($config.runName)-applications",
        '--template-file', (Join-Path $templates 'applications.bicep'), '--parameters', "@$parametersPath")
    if ($deployment.properties.provisioningState -ne 'Succeeded') { throw 'Application deployment did not succeed.' }
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
    $secure.Dispose()
    if (Test-Path -LiteralPath $parametersPath) { Remove-Item -LiteralPath $parametersPath }
    $parameters = $null
    $arm = $null
}
$state.apiUrl = $deployment.properties.outputs.apiUrl.value
$state.uiUrl = $deployment.properties.outputs.uiUrl.value
$state.status = 'Deployed; live task/evidence tests still required'
Write-WorkshopJson $paths.state $state
Write-Host "UI: $($state.uiUrl)"
Write-Host "API: $($state.apiUrl)"
Write-Host "Next: Test-Workshop.ps1 -ConfigPath '$ConfigPath', then consent and the live learner steps. Deployment is not proof of mail delivery."
