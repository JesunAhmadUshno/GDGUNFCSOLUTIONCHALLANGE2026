# 🚀 Complete GitHub Setup - Interactive Script
# This script will guide you through the entire process

Write-Host "`n" -NoNewline
Write-Host "════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   🎯 SOLUTION CHALLENGE 2026 - GITHUB SETUP" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

# Step 1: Get GitHub username
Write-Host "📝 STEP 1: Enter your GitHub information`n" -ForegroundColor Yellow
$username = Read-Host "   GitHub Username"

Write-Host "`n✅ Got it! Repository will be at:" -ForegroundColor Green
Write-Host "   https://github.com/$username/GDGUNFCSOLUTIONCHALLANGE2026`n" -ForegroundColor White

# Step 2: Create repository instructions
Write-Host "📋 STEP 2: Create the repository on GitHub`n" -ForegroundColor Yellow
Write-Host "   1. Open: https://github.com/new" -ForegroundColor White
Write-Host "   2. Repository name: GDGUNFCSOLUTIONCHALLANGE2026" -ForegroundColor White
Write-Host "   3. Description: Stunning resource directory for 2026 GDG Solution Challenge" -ForegroundColor White
Write-Host "   4. Select: Public" -ForegroundColor White
Write-Host "   5. DO NOT check any initialization options" -ForegroundColor Red
Write-Host "   6. Click 'Create repository'`n" -ForegroundColor White

$created = Read-Host "   Have you created the repository? (y/n)"

if ($created -ne 'y') {
    Write-Host "`n⚠️  Please create the repository first, then run this script again.`n" -ForegroundColor Yellow
    exit
}

# Step 3: Push to GitHub
Write-Host "`n🚀 STEP 3: Pushing your code to GitHub...`n" -ForegroundColor Yellow

$repoUrl = "https://github.com/$username/GDGUNFCSOLUTIONCHALLANGE2026.git"

# Remove existing remote if any
git remote remove origin 2>$null

# Add remote
Write-Host "   🔗 Adding remote..." -ForegroundColor Gray
git remote add origin $repoUrl

# Rename to main
Write-Host "   🔄 Setting branch to main..." -ForegroundColor Gray
git branch -M main

# Push
Write-Host "   📤 Pushing code...`n" -ForegroundColor Gray
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n" -NoNewline
    Write-Host "════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "   ✅ SUCCESS! YOUR CODE IS ON GITHUB!" -ForegroundColor Green
    Write-Host "════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "`n"
    
    Write-Host "🌐 Repository URL:" -ForegroundColor Cyan
    Write-Host "   https://github.com/$username/GDGUNFCSOLUTIONCHALLANGE2026`n" -ForegroundColor White
    
    Write-Host "📋 STEP 4: Enable GitHub Pages`n" -ForegroundColor Yellow
    Write-Host "   1. Go to: https://github.com/$username/GDGUNFCSOLUTIONCHALLANGE2026/settings/pages" -ForegroundColor White
    Write-Host "   2. Under 'Source', select 'GitHub Actions'" -ForegroundColor White
    Write-Host "   3. Wait 2-3 minutes for automatic deployment`n" -ForegroundColor White
    
    Write-Host "🎉 Your live site URL (after deployment):" -ForegroundColor Cyan
    Write-Host "   https://$username.github.io/GDGUNFCSOLUTIONCHALLANGE2026/`n" -ForegroundColor Green
    
    Write-Host "🔥 Your jaw-dropping website will be LIVE for the world to see! 🚀`n" -ForegroundColor Magenta
    
} else {
    Write-Host "`n❌ Push failed!`n" -ForegroundColor Red
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "   • Repository doesn't exist yet - create it first" -ForegroundColor White
    Write-Host "   • Authentication failed - you may need a Personal Access Token" -ForegroundColor White
    Write-Host "   • Create one at: https://github.com/settings/tokens`n" -ForegroundColor White
}
