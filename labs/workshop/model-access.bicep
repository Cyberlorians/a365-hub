param accountName string
param principalId string

resource model 'Microsoft.CognitiveServices/accounts@2023-05-01' existing = {
  name: accountName
}

resource inferenceRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(model.id, principalId, 'Cognitive Services OpenAI User')
  scope: model
  properties: {
    principalId: principalId
    principalType: 'ServicePrincipal'
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '5e0bd9bd-7b93-4f7a-af87-19fc36ad61bd')
  }
}

output assignmentId string = inferenceRole.id
