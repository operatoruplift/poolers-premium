# Poolers — review against the supplied Fomo trading interface

Scope: the Poolers terminal's surfaces, density, social discovery, and navigation controls. This continues the user's requested redesign using the newly supplied Fomo screenshot, rendered DOM, and HAR as reference. Audience: mixed, with an expert LP workflow. This is a focused visual/interaction review, not an audit of Fomo's authenticated account behavior.

## Evidence and limits

- The user supplied a 2048×1031 screenshot of the actual trading screen and two identical rendered HTML captures (300,749 bytes each). These show the discovery panel, token header, chart toolbar, social table, trade card, and About card.
- The HAR contains 77 entries. Only static CSS response bodies were extracted. The root stylesheet explicitly linked in the DOM was fetched publicly without authentication. No captured account requests were replayed; cookies, headers, account responses, and private identifiers remain outside this repository.
- One separate upload exceeded the tool's 32 MiB transfer limit and was not read. The available screenshot, DOM, and stylesheet evidence are sufficient for this style pass.
- The actual signed-in session and runtime interactions remain unobserved because browser control is unavailable. A DOM snapshot establishes controls and selected states, not their working behavior.
- The subsequently supplied [NoHomo repository](https://github.com/shali1995/NoHomo) was inspected as source text. It is a Svelte reconstruction with captured styles and replacement OpenDEX data, rather than official Fomo source. Its chart-height drag handler is implemented in source; its sidebar handle and Split controls are inert. Those source observations are not claims of live tested behavior.

## The three things that matter most

1. Fomo's trading interface has a more specific surface/radius system than its landing showcase: a `#060510` canvas, `#12111a` surfaces, 6–8px controls, and 12–16px major panels.
2. Its social character comes from names and avatars embedded in financial lists, plus useful contextual filters. Poolers already has suitable creator assets and follow state.
3. The screenshot frames major regions while keeping rows quiet. Poolers' current edge-to-edge vertical dividers can adopt that clearer grouping without changing its LP controls.

## Findings and actions

| ID | Finding / consequence | Type | Severity | Confidence | Action |
|---|---|---|---|---|---|
| V1 | Current terminal uses a graphite `#101014` canvas and continuous full-height column dividers. The supplied trading reference instead groups discovery and the right rail as inset bordered panels. | Opportunity | Low | Observed (Poolers CSS; user screenshot + DOM + reference CSS) | Use a cool near-black canvas and inset desktop region frames. |
| V2 | Many Poolers controls share 10–12px corners. The actual Fomo terminal uses a hierarchy of 6–8px controls and 12–16px regions. Uniform rounding weakens grouping. | Taste | Low | Observed (both stylesheets and supplied DOM utility usage) | Keep major cards rounded, make compact controls shallower. Preserve the approved primary gradient. |
| S1 | Poolers stores creator follows but has no Following filter in discovery. A user cannot use that state to narrow the feed. Fomo visibly offers contextual Following filters. | Opportunity | Medium | Observed (Poolers code; user screenshot + DOM) | Add an accessible All creators / Following feed filter using existing local state. |
| D1 | The Poolers chart occupies most of the initial desktop center height, pushing creator strategies below the initial view. The reference shares its center area with a framed financial/social panel; the reconstruction also implements height adjustment. | Opportunity | Low | Observed (previous rendered Poolers captures + user screenshot + reconstruction source) | Reduce desktop chart height modestly, frame Strategies/History, and add a keyboard/pointer height control; retain mobile chart dimensions and pan/zoom. |
| B1 | The pool History view checks filtered `poolEvents` but maps `workspace.events`, which can show unrelated activity when that pool has any events. | Defect | Medium | Observed (code); mixed-pool rendering initially inferred | Render the filtered collection and verify with two pools. |

## Direction

- Product: a Solana liquidity workspace for discovering pools and sharing LP strategies.
- Character: exact, compact, sociable.
- World: a trading desk with cool near-black surfaces and clear financial data.
- Moments: the real OHLC chart, liquidity-bin controls, and recognizable creators.
- Signature: the sharp purple Poolers P, approved lavender/purple/blue primary actions, and orange interaction cues.

## Boundaries

Keep Poolers' token/creator artwork, Inter font, current palette accents, fee/bin math, wallet prototype, and responsive workspace. Do not copy Fomo account data, balances, token claims, runtime bundles, account APIs, brand imagery, or font files into Poolers. Keep the contrast and 44px touch-target improvements rather than copying the reference's smallest controls or low-contrast tertiary text.

The supplied DOM explicitly contains a mobile-web trading blocker. Therefore it does not establish a Fomo mobile trading layout to reproduce. Poolers retains its usable mobile tabs and composer.

This focused review does not establish full WCAG conformance, original Poolers parity, or authenticated Fomo interaction parity.

## Implemented and verified

Applied the cool near-black surface family and inset desktop region frames, with shallow control radii and a framed Strategies/History panel. The chart canvas shares the page background. Desktop composer spacing is tighter while mobile controls retain their larger targets. The approved lavender/purple/blue primary gradient, orange interaction accents, Inter type, and Poolers assets remain.

Added All creators/Following discovery, including persistent follows, an empty-state recovery action, and focus recovery when unfollowing the last matching creator. Added a desktop chart-height separator with pointer capture, keyboard adjustment, measured ARIA values, 340–1000px bounds, and cancel recovery. The chart instance remains mounted during resizing; mobile and expanded views retain their own sizes.

Fixed pool History to render its filtered events and added explicit pool IDs to new position activity. Legacy pair-labelled events remain supported without matching an unrelated pool merely because it shares a base token.

Validation passed: TypeScript/Vite production build; existing LP fee/bin/price-entry/shape/chart/history/wallet/portfolio/profile regressions; widths 320/390/768/1024/1440; landing scroll and reduced motion; new Following filter/persistence/focus, same-base-token history isolation, chart resize keyboard/drag/bounds, expansion, and responsive reset checks. Axe-core's WCAG 2 A/AA and 2.1 AA rule tags reported no violations in seven checked states. Product previews were refreshed from the updated app. This is an automated/heuristic result, not accessibility certification.
