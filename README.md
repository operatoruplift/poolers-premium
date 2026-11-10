# Poolers interface

A React redesign of [app.poolers.xyz](https://app.poolers.xyz), with Poolers token artwork, captured market history, bin-based strategy controls, and a landing page informed by [swap.io](https://swap.io/). Terminal framing and social discovery draw on the supplied [fomo.family](https://fomo.family/) trading captures and the [NoHomo Svelte reconstruction](https://github.com/shali1995/NoHomo).

## Run

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

Use Node.js 22.12+ or 24. Vercel builds the Vite app and serves `dist`; SPA rewrites support direct entry to every interface.

## Interfaces

- `/` — landing page with a scroll-linked transition into the product view, distribution controls, and FAQs.
- `/app` — pool and strategy discovery, market charts, range composition, and position management.
- `/app/portfolio` — portfolio, available funds, deposits, withdrawals, and activity.
- `/app/profile` — profile preferences, created/joined positions, and activity.
- `/signup` — three-step profile setup using the requested background video without overlays.
- `/pools/:address` — a shareable pool workspace, with browser Back support.
- `/strategy/:id` — a shared strategy's allocation review; wallet connection follows the review.

Application components live in `src/App.tsx`; styles live in `src/index.css`. React, Tailwind CSS v4, Motion, Lucide, and TradingView Lightweight Charts provide the interface.

## Controls

- Social LP profit: 5–25%, 1% steps, pointer capture, and keyboard support.
- Price range: original bin-price math, non-crossing histogram handles, draggable Min/Max price cards and chart markers, direct price entry, and one-bin +/- controls.
- Allocation: balanced, base-only, or quote-only presets. Shape and selected bins update together.
- Price chart: original OHLC history, volume, crosshair, pan, zoom, timeframe aggregation, price/market-cap views, and linked minimum/maximum price lines.
- Workspace: collapsible discovery, expanded chart with Escape recovery, pointer/keyboard chart-height adjustment, and a visible strategy action while the desktop composer scrolls.
- Social discovery: actual creator avatars, persistent follows, All creators/Following filters, join actions, and copyable strategy links.
- Search and filters: pool/creator suggestions, keyboard selection, branded listboxes, pool sorting/category/liquidity filters, and strategy sorting/creator/fee filters.
- Accessibility: skip links, announced selected states, keyboard slider instructions, larger touch controls, high-contrast focus rings, and an expandable recent-candle data table.

## Data and local interactions

Token and creator artwork comes from public URLs resolved by the original Poolers app. `public/tokens/sources.json` and `public/creators/sources.json` record provenance. Market, strategy, and OHLC records were captured on 8 November 2026; the chart displays its source timestamp. Historical files retain upstream stale/partial metadata. These records do not update in real time.

The local wallet, position actions, funding controls, follows, and profile changes update browser storage under `poolers.workspace.v2`. They do not connect a real wallet, request signatures, submit transactions, or write to the original Poolers backend. Reset workspace restores the initial state. Profile setup does not persist a password.

New position activity carries an explicit pool ID, so history remains scoped correctly even when two pools share a base token. Older pair-labelled records remain readable; account history retains all activity.

The purple P is rendered as an inline vector in the interface. The matching standalone asset is `public/poolers-mark.svg`.

Primary actions share lavender, purple, and blue gradient tokens in `src/index.css`. Lavender marks keyboard focus and selection; orange remains an accent fill/text color. Secondary actions stay neutral.

## Review and attribution

The design pass used [UX Audit by paulunemoon](https://github.com/paulunemoon/ux-audit-skill) and [Unslop by Damir Sokolovsky](https://github.com/heydamir/unslop). Unslop is licensed under CC BY 4.0; this credit is retained for the applied workflow. Evidence, prioritized changes, and remaining differences are recorded in `ux-audit-terminal-2026-11-08.md`, `ux-audit-polish-2026-11-09.md`, and `ux-audit-fomo-reference-2026-11-09.md`.

TradingView Lightweight Charts is Apache 2.0 licensed. Its chart attribution remains visible. See `THIRD_PARTY_NOTICES.md` for third-party references.

Search/menu/filter and direct price-control behavior is documented in `interaction-review-2026-11-10.md`.

## Deployment

Source repository: [operatoruplift/poolers-premium](https://github.com/operatoruplift/poolers-premium). No environment variables are required. Vercel deployments can build a specific Git commit; continuous deployment requires connecting the repository in project Settings → Git.
