# ApplyAI

A premium homepage for **ApplyAI** — a fictional job-application assistant that helps users analyze resumes, track applications, and prepare for interviews.

> Built as a submission for the Acdyon Technologies Frontend Challenge — Part 2: The Premium Home Page.

## 🔗 Live Demo

**[https://acdyon-beryl.vercel.app](https://acdyon-beryl.vercel.app)**

## Tech Stack

- **React 19** — UI components
- **Vite 8** — Build tool and dev server
- **Tailwind CSS v4** — Utility-first styling via `@tailwindcss/vite`
- **Lucide React** — Lightweight icons

## Features

- 🌗 Full dark mode (toggle + system preference)
- 🎨 Glassmorphism, gradient text, micro-animations
- 📜 Scroll-reveal animations via IntersectionObserver
- 📱 Fully responsive (390px mobile → 1440px desktop)
- 🎮 Easter egg (try the Konami Code…)
- ✅ Zero fake testimonials, user counts, or logos

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173)

### Production build

```bash
npm run build
```

Output is in the `dist/` directory.

## Project Structure

```
├── index.html
├── vite.config.js
├── DECISIONS.md
├── README.md
└── src/
    ├── main.jsx              # Entry point
    ├── index.css             # Design system — dark mode, glassmorphism, animations
    ├── App.jsx               # Root layout + Konami Code easter egg
    ├── hooks/
    │   ├── useDarkMode.js    # Dark mode state + localStorage persistence
    │   └── useScrollReveal.js # IntersectionObserver scroll animations
    └── components/
        ├── Navbar.jsx        # Sticky navbar with dark mode toggle + mobile menu
        ├── Hero.jsx          # Headline, CTAs, floating product preview card
        ├── Dashboard.jsx     # Full product showcase — static demo dashboard
        ├── Features.jsx      # 4 feature cards with hover interactions
        ├── HowItWorks.jsx    # 3-step process section
        ├── FinalCTA.jsx      # Closing call-to-action
        ├── Footer.jsx        # Footer links and copyright
        ├── AuthModal.jsx     # Sign in / Sign up modal with validation
        └── DashboardPage.jsx # Post-login dashboard view
```

## Deployment

Deployed on **Vercel** — auto-deploys from `main` branch.

No environment variables or backend required.
