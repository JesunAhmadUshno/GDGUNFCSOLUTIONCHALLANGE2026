# 🚀 Quick Start Guide

## Get Your Site Live in 5 Minutes!

### Step 1: Install Dependencies
```bash
cd solution-challenge-resources
npm install
```

### Step 2: Preview Locally
```bash
npm run dev
```
Open http://localhost:3000 to see your site!

### Step 3: Customize (Optional)
- **Change repository name**: Edit `next.config.js` line 3
- **Add resources**: Edit `src/data/resources.json`
- **Modify branding**: Edit footer in `src/app/page.tsx`

### Step 4: Deploy to GitHub Pages

1. **Create a new GitHub repository** named `GDGUNFSolutionChallange2026`

2. **Initialize and push**
   ```bash
   git init
   git add .
   git commit -m "🎉 Initial commit - Solution Challenge Resource Directory"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/GDGUNFSolutionChallange2026.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Wait 2-3 minutes for deployment

4. **Visit your site** at:
   ```
   https://YOUR_USERNAME.github.io/GDGUNFSolutionChallange2026/
   ```

## 🎨 Customization Tips

### Change Colors
Open `tailwind.config.js` and modify the Google colors:
```javascript
colors: {
  google: {
    blue: '#4285F4',    // Change these!
    red: '#EA4335',
    yellow: '#FBBC05',
    green: '#34A853',
  },
}
```

### Add More Categories
1. Add category to array in `src/app/page.tsx` (line 24)
2. Add icon import at the top
3. Map icon in `categoryIcons` object (line 26)

### Modify Footer
Edit the footer section in `src/app/page.tsx` (starting around line 350)

## 🐛 Troubleshooting

**404 Error on GitHub Pages?**
- Make sure `basePath` in `next.config.js` matches your repo name
- Wait 3-5 minutes after first deployment

**White screen after deployment?**
- Check browser console for errors
- Verify all paths use relative URLs
- Clear browser cache

**Animations not working?**
- Make sure all dependencies installed: `npm install`
- Check that Framer Motion is in package.json

## 📞 Need Help?

- Check the main README.md
- Review Next.js documentation
- Ask in GDG Discord community

---

**Created by Jesun Ahmad Ushno for GDG UNF Canada** 🇨🇦
