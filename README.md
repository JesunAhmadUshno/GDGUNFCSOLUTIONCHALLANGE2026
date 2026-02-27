# 🎯 Solution Challenge 2026 - Resource Directory

<div align="center">

![Solution Challenge 2026](https://img.shields.io/badge/Solution%20Challenge-2026-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**An AWARD-WINNING interactive resource directory that will make your jaw DROP**

**30+ Resources • 6 Categories • 100% Free • 1000% Stunning**

[🚀 Features](#-features) • [🎨 Design](#-design-system) • [⚡ Quick Start](#-quick-start)

</div>

---

## ✨ Features That Will Blow Your Mind

### 🎭 **Cinematic Hero Section**
- **Massive animated gradient text** with 8-second flowing color animation
- **Parallax scrolling effects** for depth and immersion
- **Floating animated badge** with pulsing flame icon
- **Live statistics cards** with hover scale effects
- **Rotating sparkle icon** that never stops being mesmerizing

### 🌟 **Featured Documents Spotlight**
- **Dedicated PDF showcase** with special treatment
- **Download buttons** with animated gradient backgrounds
- **Decorative blur orbs** that scale on hover
- **Primary document gets DOUBLE SIZE** treatment
- **Rotating external link icons** on hover

### 🎨 **Premium Glassmorphism UI**
- **Multi-layer frosted glass** effects throughout
- **Ambient glowing orbs** (4 colors, perpetually animated)
- **Backdrop blur with saturation boost** for that premium feel
- **Dynamic gradient overlays** that appear on hover

### 🔥 **Next-Level Card Interactions**
- **12px lift on hover** with smooth bezier curves
- **Type-specific icons** for every resource (30+ icon mappings!)
- **Rotating external link** on hover (45° rotation + scale)
- **Corner accent gradients** that intensify on interaction
- **Animated "Explore →" button** that slides in
- **Color-coded glows** matching Google brand palette

### ⚡ **Buttery Smooth Animations**
- **Staggered grid reveal** (50ms delay per card)
- **Parallax hero** fades as you scroll
- **Filter pills** with scale bounce effects
- **Stats that pulse and breathe** with custom keyframes
- **Gradient dividers** that grow from center
- **Footer dots** that cascade-pulse infinitely

### 🔍 **Advanced Filtering System**
- **Real-time search** across titles and descriptions
- **6 category filters** with icon indicators
- **Instant results counter** with fade-in animation
- **Separate PDF section** (doesn't clutter main grid)
- **Empty state** with emoji and helpful message

### 🎯 **Micro-interactions Everywhere**
- **Custom scrollbar** with Google brand gradient
- **Text selection** highlights in Google Blue
- **Hover states** on literally everything
- **Scale animations** on stats, badges, and buttons
- **Smooth color transitions** (300-500ms timing)

### 📱 **Pixel-Perfect Responsive**
- Mobile-first design methodology
- Breakpoints: sm (640), md (768), lg (1024), xl (1280)
- Text scales beautifully (7xl → 9xl on hero)
- Grid adapts: 1 col → 2 col → 3 col

## 🎨 Design System

### Color Palette
```css
Google Blue:   #4285F4
Google Red:    #EA4335
Google Yellow: #FBBC05
Google Green:  #34A853
Background:    #0F172A (slate-950)
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Hero Headline**: 96-128px, Black weight, -0.05em tracking
- **Section Headers**: 32-48px, Bold weight
- **Body Text**: 16px, Regular weight

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with static export |
| **TypeScript** | Type safety and better DX |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Buttery smooth animations |
| **Lucide React** | Beautiful, consistent icons |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/GDGUNFSolutionChallange2026.git
   cd GDGUNFSolutionChallange2026/solution-challenge-resources
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

This creates an optimized static export in the `out/` folder.

### Deploy to GitHub Pages

#### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to **Pages** section
   - Under **Source**, select **GitHub Actions**

3. **Automatic Deploy**
   - The workflow will automatically build and deploy on every push to `main`
   - Your site will be live at: `https://yourusername.github.io/GDGUNFSolutionChallange2026/`

#### Option 2: Manual Deployment

```bash
npm run build
```

Then upload the `out/` folder to your hosting provider.

## 📁 Project Structure

```
solution-challenge-resources/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles & utilities
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main page component
│   └── data/
│       └── resources.json      # Resource data
├── public/                     # Static assets
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎯 Resource Categories

The directory organizes resources into 6 main categories:

1. **Interactive** - Google Skills, Codelabs, Gamified Experiences
2. **Foundational** - IT Support, Communication, Project Management
3. **App Dev** - Angular, Flutter, Android, Firebase, Jetpack Compose
4. **AI & Data** - Machine Learning, Gemini, TensorFlow, PaLM API
5. **Infrastructure** - Cloud Computing, Firestore, GCP
6. **Community** - Discord Servers, GitHub Repositories

## 🔧 Customization

### Update the Repository Name
Edit `next.config.js` and change the `basePath`:
```javascript
basePath: '/YourRepositoryName',
```

### Add New Resources
Edit `src/data/resources.json` and add new entries:
```json
{
  "id": 29,
  "title": "Your Resource",
  "description": "Description here",
  "url": "https://example.com",
  "category": "App Dev",
  "color": "blue",
  "type": "Tutorial"
}
```

### Modify Colors
Edit `tailwind.config.js` under `theme.extend.colors`.

## 🌐 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

**Jesun Ahmad Ushno**  
Representing GDG On Campus University Of Niagara Falls Canada

---

## 🙏 Acknowledgments

- **Google Developer Groups** - For organizing the Solution Challenge
- **Next.js Team** - For the incredible framework
- **Tailwind Labs** - For the best CSS framework
- **Framer** - For making animations accessible

---

<div align="center">

**Built with ❤️ for the 2026 Solution Challenge**

![Google Colors](https://img.shields.io/badge/Google-4285F4?style=for-the-badge&logo=google&logoColor=white)

</div>
