# Search, menus, discovery filters, and direct price controls

This change responds to the user's screenshots of orange search outlines, an operating-system timeframe menu, and a filter button without options, plus the request to drag price boundaries directly.

## Implemented behavior

- Search has one lavender focus treatment, without the duplicate inner input outline. Suggestions contain matching pools and public creators, support mouse/touch and Arrow/Home/End/Enter, and close on Escape, Tab, blur, or outside interaction. Selecting a pool opens its workspace; selecting a creator opens their profile. The mobile discovery search has the same behavior, including the keyboard shortcut.
- Both native selects are replaced by `BrandSelect`: timeframe and profile experience. The custom listbox uses the terminal's surfaces, lavender selection, keyboard/typeahead navigation, focus recovery, and a viewport-clamped portal that flips above when needed.
- Discovery filters now expose real options. Pools support liquidity/volume/change sorting, asset categories, and minimum liquidity. Strategies support value/PnL/participant sorting, creator scope, and fee limits. Counts update immediately; reset and empty-state recovery clear the relevant filter state.
- Focus and selection outlines use the shared lavender token throughout inputs, buttons, range controls, chart resizing, video focus, and radio/checkbox controls. Orange remains an accent fill/text color rather than a focus outline.
- Min/Max price cards have horizontal drag controls, snapping one bin per four pixels. Direct text entry and +/- controls remain available.
- Chart Min/Max markers are draggable vertical sliders. Conversion uses the chart's current coordinate mapping, converts market-cap values back to USD before computing bins, and keeps quote-denominated fields synchronized. Scaling is held steady during a gesture to prevent jumps. Narrow-range handles separate horizontally so both remain reachable.
- All range controls share the same bounded, non-crossing bin state. Pointer capture, cancellation/Escape, keyboard adjustment, one-sided ranges, and 44px mobile handles are retained.

## Verification

TypeScript/Vite build passed. Existing fee, bin, distribution, chart, wallet-state, profile, portfolio, responsive, landing-scroll, and reduced-motion regressions passed. Dedicated tests verified search selection and recovery, creator navigation, themed timeframe and signup menus, filter application/reset/sort, mobile touch use, direct field/chart drags, cancellation, close-boundary access, market-cap/USD/quote conversion, and synchronized histogram/field/chart state.

Automated WCAG 2 A/AA and 2.1 AA checks found no violations in the seven baseline states and five additional states: search results, empty search, timeframe menu, pool filter dialog, and signup selection. This is an automated check, not complete accessibility certification. The original market snapshots and local-wallet boundaries are unchanged.
