# Poolers — premium interface concept

A new visual direction for [poolers.xyz](https://poolers.xyz), with a purple P identity, a polished product landing page and an Aurora-inspired registration experience.

## Run locally

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

Requires Node.js 22.12+ or 24. The Vercel project uses the included Vite configuration and SPA rewrite, so `/signup` works on direct navigation.

## Interfaces

- `/` — responsive landing page, interactive sample dashboard, strategy discovery and FAQs.
- `/signup` — video-backed, three-step registration preview with input validation, password visibility, preferences and profile review.

All application components live in `src/App.tsx`; all styles live in `src/index.css`. React 19, Tailwind CSS v4, Motion and Lucide are used. `src/main.tsx` only mounts the app.

## Brand

The purple P monogram adapts the attached visual direction. The clean, scalable mark is `public/poolers-mark.svg`; `public/poolers-logo.png` is the generated glossy rendition. The video uses the exact CloudFront source requested in the brief, without an overlay or tint.

## Preview boundary

This repository is a frontend redesign, separate from the existing Poolers application. Dashboard figures and positions are illustrative, explicitly labelled sample data. Dashboard controls update the local preview; they do not execute transactions. Registration validates and previews a profile in React memory only. It does not create a live account, persist a password, connect wallets or implement OAuth. The login link opens the existing Poolers website. Live authentication, wallet connections and protocol/API integrations are future integration work.

## Deployment

Vercel runs `npm run build` and serves `dist`. No environment variables are required for this preview. A Git-connected project deploys updates pushed to `main` automatically.
