# 🚀 GitHub Deployment Instructions

## Step 1: Create GitHub Repository

1. **Go to GitHub:** https://github.com/new
2. **Repository name:** `GDGUNFCSOLUTIONCHALLANGE2026`
3. **Description:** `Stunning resource directory for 2026 GDG Solution Challenge - Built with Next.js, Tailwind CSS, and Framer Motion`
4. **Visibility:** Public
5. **DO NOT initialize with README, .gitignore, or license** (we already have these)
6. Click **"Create repository"**

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. **Use these instead:**

```powershell
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/GDGUNFCSOLUTIONCHALLANGE2026.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**, select **GitHub Actions**
4. Your site will automatically deploy on every push!

## Your Live Site URL

After deployment (2-3 minutes), your site will be available at:
```
https://YOUR_USERNAME.github.io/GDGUNFCSOLUTIONCHALLANGE2026/
```

---

## Quick Commands Reference

```powershell
# Check current status
git status

# View commit history
git log --oneline

# View remote
git remote -v

# Make changes and push
git add .
git commit -m "Update resources"
git push
```

## Troubleshooting

**Error: "remote origin already exists"**
```powershell
git remote remove origin
git remote add origin YOUR_REPO_URL
```

**Error: "authentication failed"**
- Use a Personal Access Token instead of password
- Create one at: https://github.com/settings/tokens

---

**Need help?** Check the main README.md for full documentation!
