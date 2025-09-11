# Family Financial Shield - Azure Deployment Script (PowerShell)
# This script deploys the React app to Azure Static Web Apps using Azure Developer CLI

Write-Host "🚀 Family Financial Shield - Azure Deployment" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# Check if Azure Developer CLI is installed
if (-not (Get-Command azd -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Azure Developer CLI (azd) is not installed." -ForegroundColor Red
    Write-Host "Please install it from: https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd" -ForegroundColor Yellow
    exit 1
}

# Check if user is logged in to Azure
try {
    azd auth show | Out-Null
} catch {
    Write-Host "🔐 Logging into Azure..." -ForegroundColor Yellow
    azd auth login
}

# Check if environment exists, if not initialize it
if (-not (Test-Path ".azure\*\*")) {
    Write-Host "🏗️  Initializing Azure environment..." -ForegroundColor Yellow
    azd init --template . --force
}

# Build the application
Write-Host "📦 Building the application..." -ForegroundColor Yellow
npm run build

# Deploy to Azure
Write-Host "☁️  Deploying to Azure..." -ForegroundColor Yellow
azd up

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your app should be available at the URL provided above." -ForegroundColor Green
Write-Host ""
Write-Host "💡 Cost Information:" -ForegroundColor Cyan
Write-Host "   - Azure Static Web Apps Free tier: `$0/month" -ForegroundColor Green
Write-Host "   - Includes: 100GB bandwidth, custom domains, SSL certificates" -ForegroundColor Green
Write-Host "   - This deployment uses the most cost-effective Azure hosting option!" -ForegroundColor Green
