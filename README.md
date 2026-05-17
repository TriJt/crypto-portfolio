# ⬡ Crypto Ambassador Portfolio

> Cyberpunk / Neon dark-theme portfolio for a **Crypto Ambassador & Community Builder**  
> Built as a **zero-dependency single-file HTML** for instant deployment — or follow the React setup below.

---

## 🚀 Option A — Instant Deploy (Recommended)

The `index.html` file is **100% self-contained**. No build step needed.

```bash
# Just open it:
open index.html

# Or serve locally:
npx serve .
# → http://localhost:3000
```

Deploy to **Vercel / Netlify / GitHub Pages** by uploading the folder — done.

---

## ⚙️ Option B — Full React + Vite Project

### 1. Scaffold

```bash
npm create vite@latest crypto-portfolio -- --template react-ts
cd crypto-portfolio
npm install
npm install framer-motion react-router-dom lucide-react
```

### 2. Tailwind CSS v4

```bash
npm install -D tailwindcss@next @tailwindcss/vite
```

`vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

`src/index.css`:
```css
@import "tailwindcss";

@theme {
  --color-cyan-neon: #00f5ff;
  --color-violet-neon: #8b5cf6;
  --color-fuchsia-neon: #f0abfc;
  --color-emerald-neon: #10b981;
  --color-pink-neon: #ff006e;
  --color-bg-deep: #030712;
  --color-bg-dark: #060d1a;
  --color-surface: #111827;

  --font-display: 'Orbitron', monospace;
  --font-body: 'Rajdhani', sans-serif;
  --font-mono: 'Share Tech Mono', monospace;
}
```

### 3. Project Structure

```
src/
├── data/
│   └── portfolioData.json        ← All content here
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── SectionWrapper.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── FeaturedCarousel.tsx
│   │   └── CommunityLinks.tsx
│   └── projects/
│       ├── ProjectCard.tsx
│       └── FilterBar.tsx
├── pages/
│   ├── Home.tsx
│   ├── Projects.tsx
│   └── About.tsx
├── App.tsx
└── main.tsx
```

### 4. App.tsx (React Router)

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-deep text-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
```

### 5. Page transition wrapper (Framer Motion)

```tsx
// components/layout/SectionWrapper.tsx
import { motion } from 'framer-motion'

export default function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

### 6. Run

```bash
npm run dev      # → http://localhost:5173
npm run build    # → dist/
npm run preview  # preview build
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary | `#00f5ff` (Cyan Neon) |
| Secondary | `#8b5cf6` (Violet) |
| Accent | `#f0abfc` (Fuchsia) |
| Success | `#10b981` (Emerald) |
| Background | `#030712` |
| Font Display | Orbitron |
| Font Body | Rajdhani |
| Font Mono | Share Tech Mono |

---

## ✏️ Customization

Edit `portfolioData.json` to update:
- Personal info, avatar, location
- Social links
- Stats (followers, projects, events)
- All project cards — add/remove freely

To add a **real avatar**: set `"avatar": "https://your-image-url.jpg"` in personalInfo.

---

## 📦 Deploy

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod --dir=dist

# GitHub Pages (Vite)
npm run build && gh-pages -d dist
```

---

Made with ♥ for **Web3 Vietnam** 🇻🇳
