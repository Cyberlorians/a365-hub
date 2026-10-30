#requires -Version 7.2
[CmdletBinding()]
param([Parameter(Mandatory)] [string] $ConfigPath)
. (Join-Path $PSScriptRoot 'workshop-common.ps1')
$config = Read-WorkshopConfig $ConfigPath
$paths = Get-WorkshopPaths $ConfigPath
$state = Read-WorkshopState $paths.state $config
if (-not $state.ContainsKey('apiUrl') -or -not $state.ContainsKey('uiUrl')) { throw 'Deploy first; no deployed URLs were recorded.' }
foreach ($name in @('apiUrl', 'uiUrl')) {
    $uri = [uri] $state[$name]
    if ($uri.Scheme -ne 'https' -or $uri.Host -notlike '*.azurecontainerapps.io' -or $uri.UserInfo) { throw "Unexpected deployed $name; refusing to send checks." }
}
$health = Invoke-RestMethod "$($state.apiUrl)/api/health" -TimeoutSec 120
if ($health.status -ne 'ok') { throw 'Health endpoint did not return status=ok.' }
$unauthorized = Invoke-WebRequest "$($state.apiUrl)/chat" -Method POST -ContentType 'application/json' -Body '{"message":"No authentication test"}' -SkipHttpErrorCheck -TimeoutSec 120
if ($unauthorized.StatusCode -ne 401) { throw "Unauthenticated chat should return 401, got $($unauthorized.StatusCode). Stop before sign-in." }
$ui = Invoke-WebRequest $state.uiUrl -TimeoutSec 120
if ($ui.Content -notmatch 'id="login-btn"') { throw 'UI did not contain the expected Sign in control.' }
$state.httpCheckedAt = [DateTime]::UtcNow.ToString('o')
$state.status = 'HTTP checks passed; authenticated inference, receipt, and evidence still require live learner test'
Write-WorkshopJson $paths.state $state
[pscustomobject]@{
    Health = 'PASS'; AgentInitialized = $health.agent_initialized
    UnauthenticatedChat = '401 PASS'; SignInPage = 'PASS'
    LiveInference = 'NOT TESTED'; MailReceipt = 'NOT TESTED'; DownstreamEvidence = 'NOT TESTED'
    LearnerUrl = $state.uiUrl
}
