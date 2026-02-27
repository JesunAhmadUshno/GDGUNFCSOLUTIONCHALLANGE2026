# 🚀 Push to GitHub Script
# Run this after creating the repository on GitHub

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername
)

Write-Host "🎯 Solution Challenge 2026 - GitHub Push Script" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

# Construct the repository URL
$repoUrl = "https://github.com/$GitHubUsername/GDGUNFCSOLUTIONCHALLANGE2026.git"

Write-Host "📋 Repository URL: $repoUrl`n" -ForegroundColor Yellow

# Check if remote already exists
$remoteExists = git remote get-url origin 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "⚠️  Remote 'origin' already exists. Removing..." -ForegroundColor Yellow
    git remote remove origin
}

# Add the remote
Write-Host "🔗 Adding remote origin..." -ForegroundColor Green
git remote add origin $repoUrl

# Rename branch to main
Write-Host "🔄 Renaming branch to main..." -ForegroundColor Green
git branch -M main

# Push to GitHub
Write-Host "`n🚀 Pushing to GitHub...`n" -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ SUCCESS! Your code is now on GitHub!`n" -ForegroundColor Green
    Write-Host "🌐 Repository: https://github.com/$GitHubUsername/GDGUNFCSOLUTIONCHALLANGE2026" -ForegroundColor White
    Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Go to repository Settings → Pages" -ForegroundColor White
    Write-Host "   2. Under 'Source', select 'GitHub Actions'" -ForegroundColor White
    Write-Host "   3. Wait 2-3 minutes for deployment" -ForegroundColor White
    Write-Host "   4. Visit: https://$GitHubUsername.github.io/GDGUNFCSOLUTIONCHALLANGE2026/`n" -ForegroundColor White
    Write-Host "🎉 Your jaw-dropping site will be LIVE! 🚀" -ForegroundColor Green
} else {
    Write-Host "`n❌ Push failed. Common issues:" -ForegroundColor Red
    Write-Host "   - Repository doesn't exist on GitHub yet" -ForegroundColor Yellow
    Write-Host "   - Authentication failed (use Personal Access Token)" -ForegroundColor Yellow
    Write-Host "   - Check your internet connection`n" -ForegroundColor Yellow
}
