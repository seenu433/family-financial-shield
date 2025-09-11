#!/bin/bash

# Family Financial Shield - Azure Deployment Script
# This script deploys the React app to Azure Static Web Apps using Azure Developer CLI

set -e

echo "🚀 Family Financial Shield - Azure Deployment"
echo "=============================================="

# Check if Azure Developer CLI is installed
if ! command -v azd &> /dev/null; then
    echo "❌ Azure Developer CLI (azd) is not installed."
    echo "Please install it from: https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd"
    exit 1
fi

# Check if user is logged in to Azure
if ! azd auth show &> /dev/null; then
    echo "🔐 Logging into Azure..."
    azd auth login
fi

# Check if environment exists, if not initialize it
if [ ! -f .azure/*/env ]; then
    echo "🏗️  Initializing Azure environment..."
    azd init --template . --force
fi

# Build the application
echo "📦 Building the application..."
npm run build

# Deploy to Azure
echo "☁️  Deploying to Azure..."
azd up

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at the URL provided above."
echo ""
echo "💡 Cost Information:"
echo "   - Azure Static Web Apps Free tier: $0/month"
echo "   - Includes: 100GB bandwidth, custom domains, SSL certificates"
echo "   - This deployment uses the most cost-effective Azure hosting option!"
