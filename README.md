# Poolers — premium interface concept

A usable interactive redesign of [app.poolers.xyz](https://app.poolers.xyz), with a sharp purple P identity, a product landing page, an Aurora-inspired registration experience, and a three-column liquidity workspace.

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

- `/` — responsive landing page, terminal preview, product introduction and FAQs.
- `/app` — pool terminal with discovery, categories, charts, strategy composition, and participation flows. Portfolio and profile are available in the app navigation.
- `/app/portfolio` and `/app/profile` — direct entry to the portfolio and profile interfaces.
- `/signup` — video-backed, three-step registration preview with input validation, password visibility, preferences and profile review.

All application components live in `src/App.tsx`; all styles live in `src/index.css`. React 19, Tailwind CSS v4, Motion and Lucide are used. `src/main.tsx` only mounts the app.

## Brand

The purple P monogram adapts the attached visual direction. The clean, scalable mark is `public/poolers-mark.svg`; `public/poolers-logo.png` is the generated glossy rendition. The video uses the exact CloudFront source requested in the brief, without an overlay or tint.

## Usable application mockup

The app follows the original product structure: pool/strategy discovery on the left, market charts and strategy activity in the center, and a strategy composer on the right. On phones, Discover / Market / Create panels provide access to the same controls.

Try a demo wallet to create and join strategies, close or exit positions, deposit or withdraw simulated USDC, edit your profile, follow creators, and inspect your activity. Balances and positions update together. Demo state is versioned and saved only in this browser under `poolers.premium.workspace.v1`. Reset demo restores the sample workspace.

All application behavior is implemented in editable React source. The original site's compiled runtime and backend are not copied or proxied.

## Mockup boundary

This is an interactive mockup with illustrative market data and simulated funds. It does not execute transactions, request signatures, or connect a real wallet. Registration validates and previews a profile in React memory only; it never persists a password. OAuth, live accounts, and protocol integrations are outside the mockup scope. The login link opens the existing Poolers website.

## Deployment

Vercel runs `npm run build` and serves `dist`. No environment variables are required. The deployed source is pushed to `operatoruplift/poolers-premium`; Git-based deployments can be created from that repository. Continuous deployment requires connecting it in Vercel Settings → Git.
