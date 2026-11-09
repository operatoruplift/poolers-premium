# UX quick review — Poolers terminal

## Scope and evidence

This quick review covers the existing `/app` terminal, its discovery panel, chart, and strategy composer for crypto-native LP users. Money-related controls need precise values and predictable responses even though this project is a local interaction prototype. The review combines a rendered Chromium session at 1440×960 and 390×844, current `src/App.tsx` / `src/index.css`, and the supplied original-app capture at `/workspace/scratch/poolers-original-audit/pools.png`. No wallet was connected and no financial request was submitted. Original backend, signed flows, and every responsive state are outside this review.

Evidence captures: `/workspace/scratch/audit-v3-desktop.png` and `/workspace/scratch/audit-v3-mobile.png`. A browser check changed **Lower price range** to `-25`; the stored control value changed, but the composer histogram's HTML did not.

## The three things that matter most

1. The range controls do not drive the main liquidity visualization, so the most important input feels disconnected from its outcome.
2. Placeholder token glyphs and generated candle values replace recognizable market material from the reference application.
3. Repeated promotional language, status labels, and lavender chrome compete with the pool and position information.

## Findings

| ID | Finding | Dimension | Severity | Confidence | Effort |
|---|---|---|---|---|---|
| FORM-01 | Range changes do not update the liquidity histogram | Forms / core flows | High | Observed (code + rendered interaction) | M |
| DATA-01 | Chart is synthetic SVG output with no chart navigation | Data display / core flows | High | Observed (code); original comparison Observed (capture) | M |
| VIS-01 | Token artwork is replaced by letters and `≋` | Visual hierarchy / onchain identity | Medium | Observed (rendered + code + reference capture) | S |
| COPY-01 | Promotional phrasing replaces task labels | Content / core flows | Medium | Observed (rendered + code) | S |
| HIER-01 | Repeated prototype-status chrome dilutes the workspace | Hierarchy / content | Medium | Observed (rendered) | S |
| VIS-02 | Lavender colors and gradient treatments cover most chrome | Design system / hierarchy | Medium, taste with scan-cost consequence | Observed (rendered + code) | M |
| TYPE-01 | Core-screen auxiliary text falls to 8–9px | Accessibility / data display | Medium | Observed (computed + rendered) | S |
| FLOW-01 | Composer order differs from the reference workflow | Core flows / IA | Medium | Observed (rendered + reference capture) | M |

**FORM-01 — Range visualization.** `LiquidityBars` accepts `shape` and `large`, not range or selected bins. Changing the lower range to `-25` changed its input value but left the histogram unchanged. The user has to trust the numbers rather than seeing the selected liquidity. Make a single selected-bin state drive histogram selection, draggable handles, minimum/maximum fields, bin count, allocation, and reset; support keyboard and pointer input.

**DATA-01 — Market chart.** `MarketCandles` creates its OHLC values from trigonometric functions and offers pointer hover only. The original capture shows a full market chart with range context and more dominant chart area. A price chart that cannot pan, zoom, or inspect actual bars does not support the expected market-reading task. Use the original public market data and chart assets or a proper chart implementation; connect period controls and range overlays to the same domain model.

**VIS-01 — Asset identity.** The current first token element renders `<span>S</span><span>≋</span>`, while the original screenshot uses recognizable token images. Similar letter circles make users read each pair to distinguish assets. Use the actual token artwork, retain a fallback only on image failure, and keep a consistent image diameter and overlap.

**COPY-01 — Task language.** The current terminal displays “FIND YOUR CURRENT,” “A position with your perspective,” “Your starting point,” and “Thoughtful strategies. Shared perspectives.” These labels add reading without explaining a trading control. Replace them with the original product nouns: Pools, Strategies, Amount, Strategy, Price range, and Social LP profit. Keep explanations to controls that require them.

**HIER-01 — Status repetition.** “INTERACTIVE DEMO,” “Sample markets,” “DEMO FUNDS,” “SAMPLE DATA,” “Illustrative market data,” and “No real transactions” appear across the same workspace. This repeatedly interrupts the pool → chart → composer scan path. Remove the prohibited words from visible copy as requested, remove decorative status bands, and retain any necessary scope explanation once in a secondary information surface; do not imply that local actions submit real transactions.

**VIS-02 — Quiet chrome.** The screenshot shows lavender secondary text, purple-bordered cards, gradient buttons, purple selections, and purple figures across all three columns. This leaves little distinction between market signals and interface decoration. Use neutral graphite surfaces and three neutral text roles; reserve the purple identity for the P mark, selection, and the main action, while chart colors carry market meaning.

**TYPE-01 — Readability.** Computed sizes include 9px for “FIND YOUR CURRENT” and the composer notice, and 8px for “SAMPLE DATA”; the notice also inherits negative letter spacing. This makes secondary trading information harder to read, particularly after fitting three columns. Remove the unnecessary labels, use at least 11–12px for remaining auxiliary text, and use tabular figures without negative tracking for amounts. Contrast was not measured in this sweep; no WCAG contrast failure is asserted.

**FLOW-01 — Composer sequence.** The original composer begins with Social LP Profit, then Amount, Strategy, Price Range and the primary action. The current composer starts with an icon/title introduction and puts Creator fee after the range controls. Experienced users must remap the original control order while also decoding new labels. Restore the reference order and grouping, then improve its spacing and contrast without moving the controls again.

## Direction

- **Product:** A Solana liquidity terminal for selecting pools and creating or following LP strategies.
- **Character:** Precise, dense, restrained.
- **World:** Market instruments and order-entry terminals.
- **Moments:** The price chart and the selected liquidity range carry the rich color; surrounding controls stay neutral.
- **Signature:** The user's purple P mark and a consistent selected-bin indication.

## Prioritized fixes

1. Restore original composer order and connect one bin-range model to handles, fields, distribution, and reset.
2. Replace token placeholders and synthetic chart presentation with the original product's assets and market material.
3. Remove the prohibited visible words and reduce copy to task labels.
4. Consolidate surfaces, text roles, spacing, and figure typography into a neutral terminal system.
5. Verify pointer drag, keyboard stepping, min/max constraints, reset, mobile panel access, and amount validation.

## What is working

The current shell already separates discovery, market context, and strategy input, and mobile exposes dedicated Discover / Market / Create panels. Native range inputs respond to keyboard/value changes. The prototype's local state and action handlers remain separate from real wallet transactions; visual remediation should preserve that boundary.

## Limits and open questions

This is a focused heuristic sweep, not a full accessibility or protocol audit. The user's requested fidelity should be verified against a fresh live reference because the comparison capture may no longer reflect every current asset or control. No claim of full original-app parity is made by this report.

---

Method: [UX Audit by paulunemoon](https://github.com/paulunemoon/ux-audit-skill) and [Unslop by Damir Sokolovsky](https://github.com/heydamir/unslop), CC BY 4.0 for Unslop. This report applies their evidence-first and craft-pass guidance; it does not reproduce their full skill text.


## Implementation follow-through — 9 November 2026

- Replaced the disconnected percentage sliders with bin-based range handles, one-bin buttons, editable prices, and a shared range model driving the chart price lines and distribution.
- Implemented the original 5–25% fee geometry with pointer capture and keyboard support. Allocation presets select the original inclusive 70-bin ranges; distributions follow the original linear shape rules.
- Replaced generated candles and token glyphs with public Poolers artwork, captured OHLC history, and a pan/zoom chart. Source dates remain visible; no live-update claim is made.
- Removed the repeated placeholder-status copy from rendered pages and dialogs. Consolidated terminal surfaces, typography, and text roles around the original dense workspace.
- Applied the user's new swap.io reference to the landing page: black/slate colors, blue-violet accent, fixed navigation, and a scroll-linked handoff from headline to product.

Validation exercised pointer dragging, keyboard stepping, numeric price commit/cancel, non-crossing bounds, allocation presets, chart pan/zoom and timeframes, local ledger actions, profile changes, responsive layouts, and reduced motion. Local wallet interactions still do not request signatures or broadcast transactions. This is not a full protocol or WCAG audit.
