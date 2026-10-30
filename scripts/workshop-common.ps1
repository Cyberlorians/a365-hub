#requires -Version 7.2
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$script:ToolkitRevision = '1a1d3f5253771a20915fa519aaaa58f576a5cf35'

function Read-WorkshopConfig {
    param([string] $Path)
    $config = Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json -AsHashtable
    foreach ($key in @('tenantId', 'subscriptionId', 'runName', 'location', 'resourceGroup', 'openAiResourceGroup', 'openAiAccount', 'modelDeployment', 'modelApiVersion')) {
        if (-not $config[$key] -or $config[$key] -match '[<>]') { throw "Set '$key' in $Path before continuing." }
    }
    foreach ($key in @('tenantId', 'subscriptionId')) {
        $id = [guid]::Empty
        if (-not [guid]::TryParse($config[$key], [ref] $id) -or $id -eq [guid]::Empty) { throw "Invalid $key." }
    }
    if ($config.runName -notmatch '^[a-z][a-z0-9]{2,12}$') { throw 'runName must be 3-13 lowercase letters/digits, beginning with a letter.' }
    foreach ($key in @('resourceGroup', 'openAiResourceGroup', 'openAiAccount', 'modelDeployment', 'location', 'modelApiVersion')) {
        if ($config[$key] -notmatch '^[a-zA-Z0-9._()-]+$') { throw "Invalid $key; use an Azure resource name, not a URL or command." }
    }
    return $config
}

function Initialize-PrivateDirectory {
    param([string] $Path)
    $directory = if (Test-Path -LiteralPath $Path) {
        Get-Item -LiteralPath $Path
    } else {
        New-Item -ItemType Directory -Path $Path -WhatIf:$false
    }
    if ($IsWindows) {
        $acl = [IO.FileSystemAclExtensions]::GetAccessControl($directory, [Security.AccessControl.AccessControlSections]::Access)
        $acl.SetAccessRuleProtection($true, $false)
        foreach ($existing in $acl.GetAccessRules($true, $false, [Security.Principal.SecurityIdentifier])) {
            $acl.RemoveAccessRuleSpecific($existing)
        }
        $rule = [Security.AccessControl.FileSystemAccessRule]::new(
            [Security.Principal.WindowsIdentity]::GetCurrent().User, 'FullControl',
            'ContainerInherit,ObjectInherit', 'None', 'Allow')
        $acl.AddAccessRule($rule)
        [IO.FileSystemAclExtensions]::SetAccessControl($directory, $acl)
    } else {
        [IO.File]::SetUnixFileMode($directory.FullName, [IO.UnixFileMode]::UserRead -bor [IO.UnixFileMode]::UserWrite -bor [IO.UnixFileMode]::UserExecute)
    }
    return $directory.FullName
}

function Write-WorkshopJson {
    param([string] $Path, [object] $Value)
    $Value | ConvertTo-Json -Depth 30 | Set-Content -LiteralPath $Path -Encoding utf8
}

function Invoke-WorkshopAz {
    param([string[]] $Arguments)
    $result = & az @Arguments --only-show-errors --output json
    if ($LASTEXITCODE -ne 0) { throw "Azure CLI failed ($($Arguments[0..([Math]::Min(1, $Arguments.Count - 1))] -join ' ')). See the CLI error above; no success was recorded." }
    if ($result) { return ($result -join "`n" | ConvertFrom-Json -AsHashtable) }
}

function Assert-WorkshopContext {
    param([hashtable] $Config)
    $account = Invoke-WorkshopAz @('account', 'show', '--subscription', $Config.subscriptionId)
    if ($account.tenantId -ne $Config.tenantId -or $account.id -ne $Config.subscriptionId) { throw 'Azure subscription/tenant does not match the workshop config. Sign in to the intended tenant first.' }
}

function Invoke-WorkshopGraph {
    param([hashtable] $Config, [string] $Method, [string] $Path, [object] $Body)
    Assert-WorkshopContext $Config
    $token = Invoke-WorkshopAz @('account', 'get-access-token', '--subscription', $Config.subscriptionId, '--resource', 'https://graph.microsoft.com')
    if ($token.tenant -ne $Config.tenantId) { throw 'Graph token is from the wrong tenant.' }
    $parameters = @{
        Method = $Method
        Uri = "https://graph.microsoft.com/v1.0/$Path"
        Headers = @{ Authorization = "Bearer $($token.accessToken)" }
    }
    if ($null -ne $Body) {
        $parameters.ContentType = 'application/json'
        $parameters.Body = $Body | ConvertTo-Json -Depth 30
    }
    return Invoke-RestMethod @parameters
}

function Get-WorkshopPaths {
    param([string] $ConfigPath)
    $private = Split-Path -Parent (Resolve-Path -LiteralPath $ConfigPath).Path
    return @{
        private = $private
        toolkit = Join-Path $private 'toolkit'
        state = Join-Path $private 'deployment.json'
        apps = Join-Path $private 'apps.json'
    }
}

function Read-WorkshopState {
    param([string] $Path, [hashtable] $Config)
    if (-not (Test-Path -LiteralPath $Path)) { return @{ tenantId = $Config.tenantId; subscriptionId = $Config.subscriptionId; runName = $Config.runName } }
    $state = Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json -AsHashtable
    foreach ($key in @('tenantId', 'subscriptionId', 'runName')) {
        if ($state[$key] -ne $Config[$key]) { throw "Existing manifest $Path belongs to a different workshop. Use a new private directory." }
    }
    return $state
}
