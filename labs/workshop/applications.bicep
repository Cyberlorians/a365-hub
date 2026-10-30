param location string
param runName string
param registryServer string
param identityId string
param environmentName string
param imageTag string
param tenantId string
param blueprintId string
param agentId string
param openAiEndpoint string
param modelDeployment string
param modelApiVersion string

@secure()
param blueprintSecret string

var prefix = 'hub-${runName}'
var mailAudience = 'ea9ffc3e-8a23-4a7d-836d-234d7c7565c1'

resource environment 'Microsoft.App/managedEnvironments@2024-03-01' existing = {
  name: environmentName
}

resource runtimeIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' existing = {
  name: last(split(identityId, '/'))
}

resource api 'Microsoft.App/containerApps@2024-03-01' = {
  name: '${prefix}-api'
  location: location
  tags: { a365HubRun: runName }
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: { '${identityId}': {} }
  }
  properties: {
    managedEnvironmentId: environment.id
    configuration: {
      activeRevisionsMode: 'Single'
      ingress: { external: true, targetPort: 3978, allowInsecure: false }
      registries: [{ server: registryServer, identity: identityId }]
      secrets: [{ name: 'blueprint-secret', value: blueprintSecret }]
    }
    template: {
      scale: { minReplicas: 0, maxReplicas: 1 }
      containers: [{
        name: 'agent'
        image: '${registryServer}/beacon-api:${imageTag}'
        resources: { cpu: json('0.5'), memory: '1Gi' }
        env: [
          { name: 'PORT', value: '3978' }
          { name: 'HOST', value: '0.0.0.0' }
          { name: 'AZURE_CLIENT_ID', value: runtimeIdentity.properties.clientId }
          { name: 'AZURE_OPENAI_ENDPOINT', value: openAiEndpoint }
          { name: 'AZURE_OPENAI_DEPLOYMENT', value: modelDeployment }
          { name: 'AZURE_OPENAI_API_VERSION', value: modelApiVersion }
          { name: 'TENANT_ID', value: tenantId }
          { name: 'UI_AUDIENCE', value: mailAudience }
          { name: 'UI_ALLOWED_ORIGINS', value: 'https://${prefix}-ui.${environment.properties.defaultDomain}' }
          { name: 'MAIL_TOKEN_MODE', value: 'direct' }
          { name: 'AUTH_HANDLER_NAME', value: 'AGENTIC' }
          { name: 'USE_AGENTIC_AUTH', value: 'true' }
          { name: 'AGENTAPPLICATION__USERAUTHORIZATION__HANDLERS__AGENTIC__TYPE', value: 'AgenticUserAuthorization' }
          { name: 'AGENTAPPLICATION__USERAUTHORIZATION__HANDLERS__AGENTIC__SETTINGS__SCOPES', value: '${mailAudience}/.default' }
          { name: 'AGENTAPPLICATION__USERAUTHORIZATION__HANDLERS__AGENTIC__SETTINGS__ALT_BLUEPRINT_NAME', value: 'SERVICE_CONNECTION' }
          { name: 'CONNECTIONSMAP__0__SERVICEURL', value: '*' }
          { name: 'CONNECTIONSMAP__0__CONNECTION', value: 'service_connection' }
          { name: 'CONNECTIONS__SERVICE_CONNECTION__SETTINGS__CLIENTID', value: blueprintId }
          { name: 'CONNECTIONS__SERVICE_CONNECTION__SETTINGS__CLIENTSECRET', secretRef: 'blueprint-secret' }
          { name: 'CONNECTIONS__SERVICE_CONNECTION__SETTINGS__TENANTID', value: tenantId }
          { name: 'A365_AGENT_ID', value: agentId }
          { name: 'OTEL_SERVICE_NAME', value: '${prefix}-api' }
        ]
      }]
    }
  }
}

resource ui 'Microsoft.App/containerApps@2024-03-01' = {
  name: '${prefix}-ui'
  location: location
  tags: { a365HubRun: runName }
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: { '${identityId}': {} }
  }
  properties: {
    managedEnvironmentId: environment.id
    configuration: {
      activeRevisionsMode: 'Single'
      ingress: { external: true, targetPort: 80, allowInsecure: false }
      registries: [{ server: registryServer, identity: identityId }]
    }
    template: {
      scale: { minReplicas: 0, maxReplicas: 1 }
      containers: [{
        name: 'web'
        image: '${registryServer}/beacon-ui:${imageTag}'
        resources: { cpu: json('0.25'), memory: '0.5Gi' }
      }]
    }
  }
}

output apiUrl string = 'https://${api.properties.configuration.ingress.fqdn}'
output uiUrl string = 'https://${ui.properties.configuration.ingress.fqdn}'
