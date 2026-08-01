# Costa's Roofing Fidelity Ledger

Reviewed against the six approved visual concepts on 2026-08-01. Final reference captures:

- `docs/qa/screenshots/homepage-desktop-1440.png`
- `docs/qa/screenshots/homepage-mobile-390.png`

## Comparison

| Area | Approved direction | Production result |
| --- | --- | --- |
| Header and hero | Black masthead, authentic logo, condensed headline, angular roof crop, direct red call action | Preserved at desktop and mobile sizes. The production header adds the approved Contact route while retaining the same visual hierarchy. |
| Typography and palette | Oversized condensed display type with black, ivory, and red | Preserved. Red was split into accessible light- and dark-surface variants without changing the brand character. |
| Services | Editorial, numbered service rows with restrained supporting copy | Preserved across all eight verified services. Mobile rows collapse cleanly without horizontal overflow. |
| Project proof | One authentic project sequence, angular frames, no invented project claims | Preserved with the five approved documentary photographs and factual progress/completion captions. |
| Reviews | Large 5.0 proof, supplied excerpts, clear attribution | Preserved with the 37-review snapshot and approved excerpts. No relative review dates are shown. |
| Final call | Large roofline motif and phone-first conversion | Preserved. Every conversion path ends at `tel:+19735172952`; no form or fake confirmation exists. |
| Mobile composition | Hero image and CTA layered beneath the headline, with the next section beginning above the call dock | Preserved at 390 px. The fixed call dock remains visible while the first pathway heading enters the viewport. |
| Motion | Cinematic entry, rain/weather movement, roofline drawing, scroll-triggered reveals, reduced-motion fallback | Delivered with CSS plus a deferred platform-native motion script. This retains the approved feel while eliminating initial React/WebGL blocking work. Reduced-motion visitors receive the static authentic hero. |

## Deliberate production decisions

- The authentic project photograph remains the hero at every size; decorative WebGL was not mounted in the release path because it prevented the approved mobile performance budget from passing.
- The mobile browser receives a 128 KB AVIF with a 185.4 KB WebP fallback. The crop and documentary content are unchanged.
- The preview remains `noindex, nofollow` until a real `PUBLIC_SITE_ORIGIN` is supplied. No fictional canonical URL was introduced.

Result: approved concepts are materially represented across desktop and mobile, with accessibility and performance refinements that do not change the factual content or core art direction.
