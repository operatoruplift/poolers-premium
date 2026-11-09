# Poolers — accessibility, social surfaces, and parity review

Scope: a quick review of the existing landing page and liquidity workspace, followed by the improvements the user requested. Audience: mixed, with a dense trading workspace for experienced LPs. This is a usable local prototype; wallet infrastructure and live transactions are outside this pass.

## Evidence and limits

- Rendered the premium app at 1440×1000 and the original public pool screen at 1440×960 and 390×844 on 9 November 2026. The original finished its application loading state; its embedded chart remained blank. Earlier loader-only captures are excluded as parity evidence.
- Examined the current React/CSS and ran axe-core against the rendered landing and terminal. Contrast ratios below are computed by axe from rendered styles, not pixel sampling.
- Inspected fomo.family's public landing and dashboard product screenshot. Its interactive trading screen requires login, so no authenticated interaction claims are made. Reference notes and screenshots are under `/workspace/scratch/fomo-polish/`.
- Existing original-control evidence: `/workspace/scratch/original-controls-assets.md`. Current screenshots: `/workspace/scratch/original-v6-desktop.png` and `original-v6-mobile.png`.

## The three things that matter most

1. Secondary labels are too faint in several frequently used areas. Fix their contrast before adding decorative effects.
2. Some small controls work with a keyboard but need larger touch targets and clearer selected states. The chart also needs a text/data alternative.
3. The original discovery feed places people and strategy actions front and center. Poolers can recover that social character with its real creator avatars, follow controls, and shareable pool links.

## Findings

| ID | Finding and consequence | Kind | Severity | Confidence | Effort |
|---|---|---|---|---|---|
| A1 | Chart source text is 3.36:1, the search shortcut 3.11:1, and selected-pool TVL labels 3.32:1. Small metadata becomes hard to read. | Defect | High | Observed (axe computed + rendered) | S |
| A2 | Landing step numbers are 3.41:1 and footer text 3.30:1. These labels lose legibility against the dark canvas. | Defect | Medium | Observed (axe computed + rendered) | S |
| A3 | The chart container has `role=img` around an interactive attribution link; axe reports nested-interactive. There is no table alternative to canvas candles. | Defect | Medium | Observed (code + axe) | M |
| A4 | Price step buttons are 24×28px on desktop and 28×28px on mobile; range handles have 40px hit areas. Small targets increase accidental taps. | Opportunity | Medium | Observed (code) | S |
| A5 | Active workspace/discovery tabs are indicated visually without a corresponding pressed state. Keyboard users must also traverse header controls before reaching content. | Defect | Medium | Observed (code) | S |
| S1 | Strategy rows use small avatars and no direct follow/share actions, while original public strategy discovery shows avatars, Join, and Copy link. Finding a person or returning to a strategy takes extra steps. | Opportunity | Medium | Observed (rendered + code) | M |
| P1 | The original desktop has a collapse affordance beside discovery and a chart divider handle. The premium layout has fixed columns. | Opportunity | Low | Observed (rendered); resize behavior not tested | M |
| V1 | Current 5–8px control corners vary across related surfaces. Fomo's measured 12px button corners and restrained raised cards suggest a friendlier consistent treatment. | Taste | Low | Observed (computed + rendered reference) | S |

## Direction for this pass

- Product: a Solana liquidity workspace where people discover pools and share strategies.
- Character: exact, approachable, quietly social.
- World: a shared trading desk, with graphite surfaces and readable market data.
- Moments: the real candlestick chart and recognizable creator/token imagery.
- Signature: purple Poolers identity with a restrained warm champagne accent for social/focus details; financial up/down and base/quote colors retain their meanings.

Keep the liked Swap-inspired landing composition and scroll behavior. Apply the user's Fomo reference to card grouping, avatars, button dimensions, and social actions. This is a polish pass, not a new visual direction.

## Prioritized work

1. Correct contrast, chart semantics/data access, focus, touch sizing, and selected-state announcements.
2. Unify card/button radii and add the complementary accent sparingly.
3. Strengthen existing creator discovery/follow actions and provide shareable pool URLs.
4. Add desktop discovery collapse and a wider chart view with Escape recovery.

## Parity boundary

The core composition, actual token artwork, strategy distributions, fee slider limits, bin math, editable price bounds, and create/join/portfolio flows are represented. It is not an exact clone. The original mobile screen stacks chart and composer with a Pools drawer; this version separates Pools, Chart, and Create strategy into tabs. The original has resizable pane dividers; collapse/expand can cover the common use but not arbitrary dragging. Only captured 5-minute history and coarser aggregations are available, rather than original short live timeframes. Some original strategy/profile lifecycle screens and live wallet/backend behavior are not reproduced. These differences must not be described as completed parity.

## What's working and left alone

Keep the sharp inline SVG P logo, actual token/creator assets, source timestamps, bin-based range logic, genuine OHLC chart interactions, local balance conservation, reduced-motion support, and registration video without overlays. Do not invent social counts or add marketing filler to the terminal.

This is a focused heuristic and automated review, not a WCAG certification or a screen-reader usability study. Safari, Firefox, authenticated original-app flows, and user research are not covered.

## Implementation and verification

Implemented the contrast and focus corrections, explicit pressed states on workspace/discovery/chart controls, skip links, slider instructions with quote units, 44px mobile range/price controls, and a recent-five-candle table. The chart now uses a group role so its interactive attribution link remains accessible. Sign-up's faint helper/progress/legal text was also corrected after a broader rendered check identified it.

Applied the restrained champagne accent to focus, the fee control, and followed-creator details. Preserved the purple identity, sharp vector logo, chart direction colors, and base/quote range colors. Added quiet rounded strategy cards, actual creator imagery, direct follow/join/copy-link actions, and an initial creator strategy feed. Pool and strategy links now reopen the appropriate market; browser Back restores the previous pool.

Desktop discovery can collapse and the chart can expand, with Escape restoring the workspace. The strategy action stays visible while desktop composer fields scroll. Arbitrary pane dragging remains a parity gap.

Verification: TypeScript/Vite production build; Playwright keyboard, pointer, bin math, histogram/chart linkage, OHLC aggregation, balance conservation, create/join/exit, profile, navigation, responsive widths 320/390/768/1024/1440, landing scroll and reduced motion. New follow/share/deep-link, collapse/expand/Escape, data table, skip-link, and 44px mobile control checks passed. Axe-core found no violations under WCAG 2 A/AA and 2.1 AA rule tags in the terminal with chart table open, social strategies, portfolio, profile, mobile composer, sign-up, and landing states. This automated result does not establish complete accessibility conformance.

## Color and density refinement

Following user feedback, replaced the champagne/yellow accent with orange (`#ff9b62`). Primary landing, wallet, workspace, and sign-up buttons now share a lavender → purple → blue gradient, replacing the landing button's saturated blue/magenta treatment. Shared CSS tokens keep normal and hover states aligned. Computed text contrast across sampled gradient segments is at least 7.04:1 normally and 8.51:1 on hover.

Tightened discovery-card padding and creator-row spacing, removed redundant internal dividers, and made Copy link a quiet secondary action. Reduced desktop composer gaps while retaining mobile touch sizes. Re-ran the production build, existing interaction/responsive regressions, and the seven-state accessibility check successfully. Updated product previews to match the revised interface.
