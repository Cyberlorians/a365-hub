#requires -Version 7.2
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'workshop-common.ps1')
$temporary = Join-Path ([IO.Path]::GetTempPath()) ('a365-hub-test-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $temporary | Out-Null
$global:WorkshopTest = @{ checks = 0; apps = @{}; servicePrincipals = @{}; failApplicationDeployment = $false; secureParametersChecked = $false }
function Assert($Condition, [string] $Message) {
    if (-not $Condition) { throw "FAIL: $Message" }
    $global:WorkshopTest.checks++
}
function Assert-Throws([scriptblock] $Action, [string] $Message) {
    $failed = $false
    try { & $Action | Out-Null } catch { $failed = $true }
    Assert $failed $Message
}
$config = @{
    tenantId = '11111111-1111-1111-1111-111111111111'
    subscriptionId = '22222222-2222-2222-2222-222222222222'
    runName = 'beacon01'; location = 'eastus2'; resourceGroup = 'a365-beacon01'
    openAiResourceGroup = 'models'; openAiAccount = 'training-model'
    modelDeployment = 'chat'; modelApiVersion = '2024-12-01-preview'
    cliAppId = ''; spaAppId = ''
}
$global:AzCalls = @()
$global:AzResult = '{}'
$global:AzExit = 0
function az {
    $global:AzCalls += ,@($args)
    $global:LASTEXITCODE = $global:AzExit
    $global:AzResult
}
try {
    foreach ($file in Get-ChildItem -LiteralPath $PSScriptRoot -Filter '*workshop*.ps1') {
        $tokens = $null; $errors = $null
        [Management.Automation.Language.Parser]::ParseFile($file.FullName, [ref] $tokens, [ref] $errors) | Out-Null
        Assert ($errors.Count -eq 0) "PowerShell parsing: $($file.Name)"
    }
    foreach ($guide in @('docs\07-module-01-admin-runbook.md', 'docs\08-module-02-admin-runbook.md')) {
        $text = Get-Content -LiteralPath (Join-Path $PSScriptRoot "..\$guide") -Raw
        foreach ($block in [regex]::Matches($text, '(?ms)^```powershell\r?\n(.*?)^```')) {
            $tokens = $null; $errors = $null
            [Management.Automation.Language.Parser]::ParseInput($block.Groups[1].Value, [ref] $tokens, [ref] $errors) | Out-Null
            Assert ($errors.Count -eq 0) "Copy/paste PowerShell snippet in $guide"
        }
    }
    $configPath = Join-Path $temporary 'config.json'
    Write-WorkshopJson $configPath $config
    Assert ((Read-WorkshopConfig $configPath).runName -eq 'beacon01') 'Valid config'
    $bad = $config.Clone(); $bad.tenantId = '<tenant-guid>'
    Write-WorkshopJson $configPath $bad
    Assert-Throws { Read-WorkshopConfig $configPath } 'Reject placeholders before commands'
    $bad.tenantId = $config.tenantId; $bad.runName = '../../other'
    Write-WorkshopJson $configPath $bad
    Assert-Throws { Read-WorkshopConfig $configPath } 'Reject invalid run names'
    Write-WorkshopJson $configPath $config
    $plan = & (Join-Path $PSScriptRoot 'Deploy-Workshop.ps1') -ConfigPath $configPath -Plan
    Assert ($plan.Deletes -eq 'Nothing' -and $global:AzCalls.Count -eq 0) 'Plan makes no cloud calls'
    Assert-Throws { & (Join-Path $PSScriptRoot 'Deploy-Workshop.ps1') -ConfigPath $configPath } 'Require explicit deploy approval'
    $global:AzResult = '{"id":"wrong","tenantId":"wrong"}'
    Assert-Throws { Assert-WorkshopContext $config } 'Reject wrong Azure context'
    $global:AzExit = 1
    Assert-Throws { Invoke-WorkshopAz @('account', 'show') } 'Native failure stops execution'
    $global:AzExit = 0
    $global:AzResult = '{"id":"22222222-2222-2222-2222-222222222222","tenantId":"11111111-1111-1111-1111-111111111111"}'
    Assert-WorkshopContext $config
    Assert ($global:AzCalls[-1] -contains $config.subscriptionId) 'Explicit subscription forwarded'
    $statePath = Join-Path $temporary 'state.json'
    Write-WorkshopJson $statePath @{ tenantId = 'wrong'; subscriptionId = $config.subscriptionId; runName = 'beacon01' }
    Assert-Throws { Read-WorkshopState $statePath $config } 'Reject cross-tenant manifest'
    $private = Initialize-PrivateDirectory (Join-Path $temporary 'private')
    Assert (Test-Path -LiteralPath $private) 'Private directory creation'
    if ($IsWindows) {
        Assert ((Get-Acl -LiteralPath $private).AreAccessRulesProtected) 'Credentials directory does not inherit shared ACLs'
    }

    function Import-Module { [CmdletBinding()] param([string] $Name) }
    function Connect-MgGraph { param($TenantId, $ContextScope, [switch] $NoWelcome, $Scopes) }
    function Get-MgContext { @{ TenantId = '11111111-1111-1111-1111-111111111111' } }
    $global:Directory = @{ users = @{}; members = @(); licenses = @{}; taps = @{}; disabled = @(); revoked = @(); tapWrites = 0 }
    $skuId = '33333333-3333-3333-3333-333333333333'
    function Invoke-MgGraphRequest {
        param($Method, $Uri, $OutputType, $Body, $ContentType)
        $path = $Uri.Replace('https://graph.microsoft.com/v1.0/', '')
        $bodyObject = if ($Body) { $Body | ConvertFrom-Json -AsHashtable } else { @{} }
        if ($Method -eq 'GET' -and $path -like 'domains/*') { return @{ isVerified = $true } }
        if ($Method -eq 'GET' -and $path -like 'groups?*filter*') { return @{ value = @() } }
        if ($Method -eq 'POST' -and $path -eq 'groups') { return @{ id = '44444444-4444-4444-4444-444444444444' } }
        if ($Method -eq 'GET' -and $path -eq 'subscribedSkus') {
            return @{ value = @(@{ skuId = '33333333-3333-3333-3333-333333333333'; capabilityStatus = 'Enabled'; prepaidUnits = @{ enabled = 10 }; consumedUnits = $global:Directory.licenses.Count }) }
        }
        if ($Method -eq 'GET' -and $path -match "^users\?.*userPrincipalName eq '([^']+)'") {
            return @{ value = @($global:Directory.users.Values | Where-Object { $_.userPrincipalName -eq $Matches[1] }) }
        }
        if ($Method -eq 'POST' -and $path -eq 'users') {
            $id = [guid]::NewGuid().ToString()
            $global:Directory.users[$id] = @{ id = $id; userPrincipalName = $bodyObject.userPrincipalName }
            return $global:Directory.users[$id]
        }
        if ($Method -eq 'GET' -and $path -match '^users/([^/?]+)\?') { return $global:Directory.users[$Matches[1]] }
        if ($path -match '^groups/[^/]+/members') {
            if ($Method -eq 'GET') { return @{ value = @($global:Directory.members | ForEach-Object { @{ id = $_ } }) } }
            $global:Directory.members += ($bodyObject.'@odata.id' -split '/')[-1]
            return
        }
        if ($Method -eq 'GET' -and $path -match '^users/([^/]+)/licenseDetails$') {
            return @{ value = @($global:Directory.licenses[$Matches[1]] | ForEach-Object { if ($_) { @{ skuId = $_ } } }) }
        }
        if ($Method -eq 'POST' -and $path -match '^users/([^/]+)/assignLicense$') {
            $global:Directory.licenses[$Matches[1]] = @($bodyObject.addLicenses | ForEach-Object { $_.skuId })
            return
        }
        if ($path -match '^users/([^/]+)/authentication/temporaryAccessPassMethods$') {
            $id = $Matches[1]
            if ($Method -eq 'GET') { return @{ value = @($global:Directory.taps[$id] | Where-Object { $_ }) } }
            $global:Directory.tapWrites++
            $tap = @{ id = [guid]::NewGuid().ToString(); temporaryAccessPass = 'TEST-ONLY-NOT-A-CREDENTIAL'; lifetimeInMinutes = 60; startDateTime = [DateTime]::UtcNow.ToString('o') }
            $global:Directory.taps[$id] = $tap
            return $tap
        }
        if ($Method -eq 'DELETE' -and $path -match '^users/([^/]+)/authentication/temporaryAccessPassMethods/[^/]+$') {
            $global:Directory.taps.Remove($Matches[1]); return
        }
        if ($Method -eq 'PATCH' -and $path -match '^users/([^/]+)$') { $global:Directory.disabled += $Matches[1]; return }
        if ($Method -eq 'POST' -and $path -match '^users/([^/]+)/revokeSignInSessions$') { $global:Directory.revoked += $Matches[1]; return }
        throw "Unexpected Graph call in offline test: $Method $path"
    }
    $userArgs = @{
        TenantId = $config.tenantId; RunName = 'beacon01'; Domain = 'lab.example'
        OutputDirectory = (Join-Path $private 'users')
    }
    $userScript = Join-Path $PSScriptRoot 'New-WorkshopUsers.ps1'
    & $userScript @userArgs -Stage PrepareGroup 6>$null
    Assert ($global:Directory.users.Count -eq 0) 'PrepareGroup creates no users or credentials'
    $messages = & $userScript @userArgs -Stage Provision -SkuIds $skuId 6>&1 | Out-String
    Assert ($global:Directory.users.Count -eq 2) 'Provision creates one learner and one recipient'
    Assert ($global:Directory.tapWrites -eq 2) 'Only created users receive TAPs'
    Assert ($messages -notmatch 'TEST-ONLY-NOT-A-CREDENTIAL') 'Never print TAP values'
    Assert ((Import-Csv (Join-Path $userArgs.OutputDirectory 'attendee-credentials.csv')).Count -eq 2) 'Private credential export'
    & $userScript @userArgs -Stage Provision -SkuIds $skuId 6>$null
    Assert ($global:Directory.users.Count -eq 2 -and $global:Directory.tapWrites -eq 2) 'Rerun neither duplicates users nor replaces existing TAPs'
    & $userScript @userArgs -Stage Provision -SkuIds $skuId -LearnerCount 3 6>$null
    Assert ($global:Directory.users.Count -eq 4 -and $global:Directory.tapWrites -eq 4) 'Two fresh learners can be added without touching existing credentials'
    & $userScript @userArgs -Stage Provision -SkuIds $skuId -LearnerCount 3 -RenewTaps 6>$null
    Assert ($global:Directory.users.Count -eq 4 -and $global:Directory.tapWrites -eq 8) 'TAP replacement requires explicit renewal and does not create extra users'
    & $userScript @userArgs -Stage Close -WhatIf 6>$null
    Assert ($global:Directory.disabled.Count -eq 0) 'WhatIf never disables accounts'
    & $userScript @userArgs -Stage Close -Confirm:$false 6>$null
    Assert ($global:Directory.disabled.Count -eq 4 -and $global:Directory.revoked.Count -eq 4) 'Close uses only exact run-owned IDs'
    $paths = Get-WorkshopPaths $configPath
    New-Item -ItemType Directory -Path (Join-Path $paths.toolkit 'aca\obo') -Force | Out-Null
    Write-WorkshopJson (Join-Path $paths.toolkit 'aca\obo\a365.config.json.example') @{
        tenantId = ''; clientAppId = ''; agentIdentityDisplayName = ''; agentBlueprintDisplayName = ''
    }
    $fixture = Join-Path $temporary 'source-fixture'
    New-Item -ItemType Directory -Path (Join-Path $fixture 'aca\obo'), (Join-Path $fixture 'ui') | Out-Null
    Set-Content (Join-Path $fixture 'aca\obo\Dockerfile') 'FROM scratch'
    foreach ($name in @('index.html', 'app.js', 'styles.css')) { Set-Content (Join-Path $fixture "ui\$name") 'offline-source-fixture' }
    function git {
        if ($args -contains 'rev-parse') { return '1a1d3f5253771a20915fa519aaaa58f576a5cf35' }
        if ($args -contains 'archive') {
            $destination = @($args | Where-Object { $_ -like '--output=*' })[0].Substring(9)
            [IO.Compression.ZipFile]::CreateFromDirectory($fixture, $destination)
            return
        }
        throw "Unexpected git call in offline test: $args"
    }
    function az {
        $arguments = @($args)
        $text = $arguments -join ' '
        $global:AzCalls += ,$arguments
        $global:LASTEXITCODE = 0
        Assert ($text -notmatch 'TEST-BLUEPRINT-SECRET') 'No secret value in native arguments'
        if ($text -like 'account show *') { return (@{ id = $config.subscriptionId; tenantId = $config.tenantId } | ConvertTo-Json -Compress) }
        if ($text -like 'account get-access-token *') { return (@{ tenant = $config.tenantId; accessToken = 'TEST-TOKEN-NOT-A-CREDENTIAL' } | ConvertTo-Json -Compress) }
        if ($text -like 'cognitiveservices account show *') { return '{"properties":{"endpoint":"https://training-model.openai.azure.com/"}}' }
        if ($text -like 'cognitiveservices account deployment show *') { return '{}' }
        if ($text -like 'group exists *') { return 'false' }
        if ($text -like 'group create *') { return '{}' }
        if ($text -like 'group show *') {
            $owner = if ($global:WorkshopTest.wrongGroupOwner) { 'different-manifest' } else { $state.deploymentId }
            return (@{ tags = @{ a365HubRun = $config.runName; a365HubDeployment = $owner } } | ConvertTo-Json -Compress)
        }
        if ($text -like 'group delete *' -or $text -like 'role assignment delete *') { return }
        if ($text -like 'role assignment list *') {
            return (,@{
                id = "/subscriptions/$($config.subscriptionId)/resourceGroups/$($config.openAiResourceGroup)/providers/Microsoft.CognitiveServices/accounts/$($config.openAiAccount)/providers/Microsoft.Authorization/roleAssignments/99999999-9999-9999-9999-999999999999"
                principalId = $(if ($global:WorkshopTest.wrongModelPrincipal) { 'different-principal' } else { '88888888-8888-8888-8888-888888888888' })
                roleDefinitionId = "/subscriptions/$($config.subscriptionId)/providers/Microsoft.Authorization/roleDefinitions/5e0bd9bd-7b93-4f7a-af87-19fc36ad61bd"
            } | ConvertTo-Json -Compress)
        }
        if ($text -like 'acr build *') { return '{"status":"Succeeded"}' }
        if ($text -like 'deployment group create *') {
            if ($text -like '*-infrastructure*') {
                return (@{ properties = @{ provisioningState = 'Succeeded'; outputs = @{
                    registryName = @{ value = 'trainingregistry' }; registryServer = @{ value = 'trainingregistry.azurecr.io' }
                    identityId = @{ value = '/subscriptions/test/resourceGroups/test/providers/Microsoft.ManagedIdentity/userAssignedIdentities/runtime' }
                    runtimePrincipalId = @{ value = '88888888-8888-8888-8888-888888888888' }
                    modelRoleAssignmentId = @{ value = "/subscriptions/$($config.subscriptionId)/resourceGroups/$($config.openAiResourceGroup)/providers/Microsoft.CognitiveServices/accounts/$($config.openAiAccount)/providers/Microsoft.Authorization/roleAssignments/99999999-9999-9999-9999-999999999999" }
                    environmentName = @{ value = 'training-environment' }
                    apiUrl = @{ value = 'https://training-api.test.azurecontainerapps.io' }
                    uiUrl = @{ value = 'https://training-ui.test.azurecontainerapps.io' }
                } } } | ConvertTo-Json -Depth 10 -Compress)
            }
            $parameterArgument = @($arguments | Where-Object { $_ -like '@*parameters-*.json' })[0]
            $arm = Get-Content -LiteralPath $parameterArgument.Substring(1) -Raw | ConvertFrom-Json
            Assert ($arm.parameters.blueprintSecret.value -eq 'TEST-BLUEPRINT-SECRET') 'Secure parameter file transports the expected secret'
            $global:WorkshopTest.secureParametersChecked = $true
            if ($global:WorkshopTest.failApplicationDeployment) { $global:LASTEXITCODE = 1; return }
            return '{"properties":{"provisioningState":"Succeeded","outputs":{"apiUrl":{"value":"https://training-api.test.azurecontainerapps.io"},"uiUrl":{"value":"https://training-ui.test.azurecontainerapps.io"}}}}'
        }
        throw "Unexpected Azure call in offline test: $text"
    }
    function Invoke-RestMethod {
        param($Uri, $Method, $Headers, $ContentType, $Body, $TimeoutSec)
        if ($Uri -like '*/api/health') { return @{ status = 'ok'; agent_initialized = $false } }
        if ($Uri -like '*servicePrincipals?*') {
            if ($Uri -like '*ea9ffc3e*') { return @{ value = @(@{ oauth2PermissionScopes = @(@{ value = 'McpServers.Mail.All'; isEnabled = $true; id = '55555555-5555-5555-5555-555555555555' }) }) } }
            $id = [regex]::Match($Uri, "appId eq '([^']+)'").Groups[1].Value
            return @{ value = @($global:WorkshopTest.servicePrincipals[$id] | Where-Object { $_ }) }
        }
        if ($Method -eq 'POST' -and $Uri -like '*/servicePrincipals') {
            $bodyValue = $Body | ConvertFrom-Json
            $global:WorkshopTest.servicePrincipals[$bodyValue.appId] = @{ id = [guid]::NewGuid().ToString() }
            return $global:WorkshopTest.servicePrincipals[$bodyValue.appId]
        }
        if ($Method -eq 'POST' -and $Uri -like '*/applications') {
            $bodyValue = $Body | ConvertFrom-Json
            $appId = [guid]::NewGuid().ToString()
            $global:WorkshopTest.apps[$appId] = @{ id = [guid]::NewGuid().ToString(); appId = $appId; signInAudience = 'AzureADMyOrg'; spa = @{ redirectUris = @('http://localhost:3000') } }
            return $global:WorkshopTest.apps[$appId]
        }
        if ($Method -eq 'GET' -and $Uri -like '*/applications(appId=*') {
            $appId = [regex]::Match($Uri, "appId='([^']+)'").Groups[1].Value
            return $global:WorkshopTest.apps[$appId]
        }
        if ($Method -eq 'PATCH' -and $Uri -like '*/applications/*') {
            Assert ($Body -match 'https://training-ui.test.azurecontainerapps.io') 'Actual UI origin registered with SPA'
            return
        }
        throw "Unexpected HTTP call in offline test: $Method $Uri"
    }
    function Read-Host { param($Prompt, [switch] $AsSecureString) ConvertTo-SecureString 'TEST-BLUEPRINT-SECRET' -AsPlainText -Force }
    function Invoke-WebRequest {
        param($Uri, $Method, $ContentType, $Body, [switch] $SkipHttpErrorCheck, $TimeoutSec)
        if ($Method -eq 'POST') { return @{ StatusCode = 401; Content = '{"error":"missing bearer token"}' } }
        return @{ StatusCode = 200; Content = '<button id="login-btn">Sign in</button>' }
    }
    & (Join-Path $PSScriptRoot 'Initialize-Workshop.ps1') -ConfigPath $configPath -RegisterApps 6>$null
    Assert ($global:WorkshopTest.apps.Count -eq 2) 'Initializer creates distinct CLI and SPA apps'
    & (Join-Path $PSScriptRoot 'Initialize-Workshop.ps1') -ConfigPath $configPath -RegisterApps 6>$null
    Assert ($global:WorkshopTest.apps.Count -eq 2) 'Initialization rerun preserves existing app IDs'
    $config = Read-WorkshopConfig $configPath
    Write-WorkshopJson (Join-Path $paths.toolkit 'aca\obo\a365.generated.config.json') @{
        agentBlueprintId = '66666666-6666-6666-6666-666666666666'
        agenticAppId = '77777777-7777-7777-7777-777777777777'
    }
    & (Join-Path $PSScriptRoot 'Deploy-Workshop.ps1') -ConfigPath $configPath -ApproveDeployment 6>$null
    $state = Get-Content -LiteralPath $paths.state -Raw | ConvertFrom-Json
    Assert ($state.status -like 'Deployed;*' -and $global:WorkshopTest.secureParametersChecked) 'Complete mocked build/deploy flow records actual output URLs'
    Assert (@(Get-ChildItem -LiteralPath $temporary -Filter 'parameters-*.json').Count -eq 0) 'Remove secure parameter file after success'
    $http = & (Join-Path $PSScriptRoot 'Test-Workshop.ps1') -ConfigPath $configPath
    Assert ($http.MailReceipt -eq 'NOT TESTED' -and $http.UnauthenticatedChat -eq '401 PASS') 'HTTP checks do not claim authenticated task or receipt'
    $global:WorkshopTest.failApplicationDeployment = $true
    Assert-Throws { & (Join-Path $PSScriptRoot 'Deploy-Workshop.ps1') -ConfigPath $configPath -ApproveDeployment 6>$null } 'Failed application deployment stops instead of claiming success'
    Assert (@(Get-ChildItem -LiteralPath $temporary -Filter 'parameters-*.json').Count -eq 0) 'Remove secure parameter file after failure'
    $global:WorkshopTest.wrongGroupOwner = $true
    Assert-Throws { & (Join-Path $PSScriptRoot 'Remove-WorkshopDeployment.ps1') -ConfigPath $configPath -Confirm:$false 6>$null } 'Cleanup refuses a group owned by another deployment manifest'
    $global:WorkshopTest.wrongGroupOwner = $false
    $global:WorkshopTest.wrongModelPrincipal = $true
    Assert-Throws { & (Join-Path $PSScriptRoot 'Remove-WorkshopDeployment.ps1') -ConfigPath $configPath -Confirm:$false 6>$null } 'Cleanup refuses a different runtime model assignment'
    $global:WorkshopTest.wrongModelPrincipal = $false
    $before = $global:AzCalls.Count
    & (Join-Path $PSScriptRoot 'Remove-WorkshopDeployment.ps1') -ConfigPath $configPath -WhatIf 6>$null
    $deletes = @($global:AzCalls | Select-Object -Skip $before | Where-Object { ($_ -join ' ') -match '^(group delete|role assignment delete)' })
    Assert ($deletes.Count -eq 0) 'Azure cleanup WhatIf never deletes resources or model roles'
    & (Join-Path $PSScriptRoot 'Remove-WorkshopDeployment.ps1') -ConfigPath $configPath -Confirm:$false 6>$null
    $deletes = @($global:AzCalls | Select-Object -Skip $before | Where-Object { ($_ -join ' ') -match '^(group delete|role assignment delete)' })
    Assert ($deletes.Count -eq 2) 'Azure cleanup deletes only the recorded model assignment and owned group'
    Write-Host "PASS: $($global:WorkshopTest.checks) offline automation checks. No Azure/Graph network calls or live credentials."
} finally {
    Remove-Item -LiteralPath $temporary -Recurse -Force
    Remove-Variable Directory, AzCalls, AzResult, AzExit, WorkshopTest -Scope Global -ErrorAction SilentlyContinue
}
