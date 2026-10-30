targetScope = 'resourceGroup'

param location string
param runName string
param openAiResourceGroup string
param openAiAccount string

var suffix = uniqueString(subscription().id, resourceGroup().id)
var prefix = 'hub-${runName}'

resource identity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: '${prefix}-runtime'
  location: location
  tags: { a365HubRun: runName }
}

resource registry 'Microsoft.ContainerRegistry/registries@2023-07-01' = {
  name: 'hub${suffix}'
  location: location
  sku: { name: 'Basic' }
  properties: { adminUserEnabled: false }
  tags: { a365HubRun: runName }
}

resource pullRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(registry.id, identity.id, 'AcrPull')
  scope: registry
  properties: {
    principalId: identity.properties.principalId
    principalType: 'ServicePrincipal'
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d')
  }
}

resource environment 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: '${prefix}-environment'
  location: location
  tags: { a365HubRun: runName }
  properties: {
    appLogsConfiguration: { destination: 'none' }
  }
}

module modelAccess 'model-access.bicep' = {
  name: '${prefix}-model-access'
  scope: resourceGroup(openAiResourceGroup)
  params: {
    accountName: openAiAccount
    principalId: identity.properties.principalId
  }
}

output registryName string = registry.name
output registryServer string = registry.properties.loginServer
output identityId string = identity.id
output runtimePrincipalId string = identity.properties.principalId
output modelRoleAssignmentId string = modelAccess.outputs.assignmentId
output environmentName string = environment.name
output apiUrl string = 'https://${prefix}-api.${environment.properties.defaultDomain}'
output uiUrl string = 'https://${prefix}-ui.${environment.properties.defaultDomain}'
