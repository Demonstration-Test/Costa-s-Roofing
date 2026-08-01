# Costa's Roofing Release Checklist

Validated 2026-08-01 against the approved design and content specification.

## Scope and factual controls

- [x] All 12 approved routes render as static folder-style pages.
- [x] All phone actions use `tel:+19735172952` and display `(973) 517-2952`.
- [x] Service area is limited to “Harrison and surrounding cities.”
- [x] Hours use “Open 24 hours for calls.”
- [x] Rating snapshot is 5.0 from 37 Google reviews.
- [x] Services are limited to the repeatedly evidenced review scope.
- [x] No email, lead form, address, fake booking, emergency promise, financing, license, insurance, warranty, or unsupported city list is published.
- [x] Authentic source media is used for the logo and project story; no AI documentary imagery is present.

## Automated validation

- [x] `npm test` — 100 tests pass.
- [x] `npm run typecheck` — passes.
- [x] `npm run lint` — passes without warnings.
- [x] `git diff --check` — passes.
- [x] `npm audit --json` — 0 vulnerabilities after compatible PostCSS and Sharp overrides.
- [x] `npm run build && npm run verify:export` — 12 root routes verified.
- [x] `npm run build:prefixed` plus prefixed verifier — 12 routes verified at `/costas-roofing`.
- [x] Static post-processing removes unused Next hydration scripts while preserving JSON-LD and `site-motion.js`.

## Browser and responsive validation

- [x] Settled homepage checked at 360, 390, 768, 1024, 1440, and 1920 CSS pixels.
- [x] All 12 direct routes checked at 390 and 1440 CSS pixels with HTTP 200 responses and visible H1 headings.
- [x] No horizontal overflow at any checked width.
- [x] All settled images load; the mobile hero selects the AVIF source when supported.
- [x] Mobile menu and persistent phone control work without JavaScript framework hydration.
- [x] First keyboard focus is the visible “Skip to content” link.
- [x] Reduced motion disables canvas enhancement and collapses animation duration.
- [x] A 720 px CSS viewport, equivalent to a 1440 px viewport at 200% zoom, has no overflow after settled media.
- [x] No console, page, or failed-request errors were recorded in the final route sweep.

## Performance and accessibility

Median of three Lighthouse 12.8.2 mobile runs using slow 4G and 4× CPU slowdown:

| Metric | Target | Median |
| --- | ---: | ---: |
| Performance score | — | 99 |
| Accessibility score | — | 100 |
| Best-practices score | — | 100 |
| Largest Contentful Paint | ≤ 2.5 s | 2.185 s |
| Cumulative Layout Shift | ≤ 0.1 | 0 |
| Total Blocking Time | ≤ 200 ms | 0 ms |

The preview SEO score is 66 solely because the unconfigured artifact is intentionally `noindex, nofollow`. Public indexing and canonical metadata require a real `PUBLIC_SITE_ORIGIN`.

Hero media budgets:

- Mobile AVIF: 128 KB; WebP fallback: 185.4 KB (budget ≤ 220 KB).
- Desktop WebP: 323.9 KB (budget ≤ 350 KB).
- Below-the-fold project images remain lazy-loaded.

## Release boundary

- [x] Final root preview artifact is present in `out/`.
- [x] No deployment or repository push was performed.
- [ ] Configure the real `PUBLIC_SITE_ORIGIN` before a public build.
- [ ] Run one final live-domain route/canonical check after hosting is selected.
