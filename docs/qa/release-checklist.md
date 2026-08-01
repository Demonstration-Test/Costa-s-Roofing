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

- [x] `npm test` — 128 tests pass.
- [x] `npm run typecheck` — passes.
- [x] `npm run lint` — passes without warnings.
- [x] `git diff --check` — passes.
- [x] `npm audit --json` — 0 vulnerabilities after compatible PostCSS and Sharp overrides.
- [x] `npm run build && npm run verify:export` — 12 root routes verified.
- [x] `npm run build:prefixed` plus prefixed verifier — 12 routes verified at `/Costa-s-Roofing`.
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

## Secondary-page image hero validation

- [x] Services, Projects, Reviews, About, and Contact use five distinct approved documentary photographs as full-bleed hero backgrounds.
- [x] Each route has a 1440 by 900 desktop WebP plus 780 by 1040 mobile AVIF and WebP derivatives within the approved byte budgets.
- [x] All five routes pass settled checks at 360, 390, 768, 1024, 1440, and 1920 CSS pixels with correct responsive sources, HTTP 200 responses, no broken images, no browser errors, no heading clipping, and zero horizontal overflow.
- [x] Lighthouse color-contrast audits pass on all 15 throttled mobile runs.
- [x] Detailed evidence is recorded in `docs/qa/secondary-heroes/browser-summary.json` and `docs/qa/secondary-heroes/lighthouse-summary.json`.

Median of three final Lighthouse mobile runs per changed route:

| Route | Performance | Accessibility | Best practices | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Services | 98 | 100 | 100 | 2.385 s | 0 | 0 ms |
| Projects | 97 | 100 | 100 | 2.460 s | 0 | 0 ms |
| Reviews | 99 | 100 | 100 | 2.160 s | 0 | 0 ms |
| About | 98 | 100 | 100 | 2.460 s | 0 | 0 ms |
| Contact | 98 | 100 | 100 | 2.460 s | 0 | 0 ms |

The user approved both the desktop and mobile contact sheets on 2026-08-01 and authorized publication.

## Release boundary

- [x] Final root preview artifact is present in `out/`.
- [x] GitHub Pages publishes from `master` through the reviewed Actions workflow.
- [x] The public build uses `https://demonstration-test.github.io` with the exact `/Costa-s-Roofing` repository base path.
- [x] All 12 live routes, public canonicals, sitemap URLs, settled media, and responsive layouts were checked after deployment.

Live site: <https://demonstration-test.github.io/Costa-s-Roofing/>
