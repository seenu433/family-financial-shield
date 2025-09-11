// Main Bicep template for Family Financial Shield App
// Deploys Azure Static Web App for cost-effective React hosting

@description('The name of the Static Web App')
param staticWebAppName string = 'family-financial-shield-${uniqueString(subscription().id, resourceGroup().id, location, environmentName)}'

@description('The location for the Static Web App')
param location string = resourceGroup().location

@description('The SKU for the Static Web App (Free tier for cost optimization)')
@allowed(['Free', 'Standard'])
param sku string = 'Free'

@description('The GitHub repository URL')
param repositoryUrl string = ''

@description('The GitHub branch to deploy from')
param branch string = 'main'

@description('Environment name for tagging')
param environmentName string = 'dev'

// User-assigned managed identity (required for deployment)
resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: 'mi-${staticWebAppName}'
  location: location
  tags: {
    'azd-env-name': environmentName
    environment: environmentName
    project: 'family-financial-shield'
  }
}

// Static Web App resource
resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: staticWebAppName
  location: location
  tags: {
    'azd-env-name': environmentName
    environment: environmentName
    project: 'family-financial-shield'
    'cost-center': 'development'
  }
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: branch
    buildProperties: {
      appLocation: '/'
      apiLocation: ''
      outputLocation: 'dist'
    }
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    enterpriseGradeCdnStatus: 'Disabled' // Keep disabled for cost optimization
  }
}

// Outputs
@description('The URL of the deployed Static Web App')
output staticWebAppUrl string = 'https://${staticWebApp.properties.defaultHostname}'

@description('The name of the Static Web App')
output staticWebAppName string = staticWebApp.name

@description('The resource ID of the Static Web App')
output staticWebAppId string = staticWebApp.id

@description('The resource group ID')
output RESOURCE_GROUP_ID string = resourceGroup().id

@description('The managed identity resource ID')
output managedIdentityId string = managedIdentity.id
