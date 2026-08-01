# Costa's Roofing Secondary-Page Image Heroes Implementation Plan

**Date:** 2026-08-01

**Design specification:** `docs/superpowers/specs/2026-08-01-secondary-page-image-heroes-design.md`

**Delivery boundary:** local implementation and verification first; GitHub push and Pages deployment only after desktop/mobile visual approval

## 1. Outcome

Give `/services`, `/projects`, `/reviews`, `/about`, and `/contact` distinct full-bleed authenticated image heroes while preserving the current editorial hierarchy, factual controls, one-project media identity, static export, and exact GitHub Pages base path.

The work follows red-green-refactor. The five-route image contract and derivative budgets must fail in tests before production files are changed.

## 2. Technical shape

- Extend the existing server-rendered `PageHero`; do not create five parallel hero components.
- Add optional approved-media configuration with desktop and mobile focal positions.
- Resolve every source through `buildAssetPath` inside `PageHero`.
- Add typed page-hero variant roles to `src/content/media.ts`.
- Generate 15 bounded derivatives from the five existing approved source photographs.
- Preserve the current abstract `PageHero` when media configuration is absent.
- Use CSS custom properties for desktop/mobile `object-position` values and the existing 767-pixel breakpoint.
- Keep hero images decorative in this context while preserving descriptive gallery alt text.

## 3. Task sequence

### Task 1 — Write and observe the failing route contract

Update:

- `src/components/pages/routes.test.tsx`
- `src/content/media.test.ts`

Add a focused `PageHero` test only if the route suite cannot directly prove root and prefixed source URLs.

Red assertions:

- The five requested routes each render one `.page-hero__media` picture.
- The five routes reference five distinct approved media records.
- Each picture has mobile AVIF, mobile WebP, and desktop WebP paths.
- Every hero image uses `alt=""`, eager loading, and high fetch priority.
- Root and `/Costa-s-Roofing` renders prefix every `<source>` and `<img>` path through shared URL behavior.
- `/exterior-services`, service-detail routes, `/privacy`, and the 404 hero remain media-free.
- Every required derivative exists with its exact dimensions and hard byte budget.

Run the focused tests and record the expected failures caused by the absent media contract and files.

### Task 2 — Generate and register bounded derivatives

Update:

- `scripts/process-media.mjs`
- `src/content/media.ts`
- `docs/media/costas-facebook-media-manifest.md`

Generate for each route stem:

- `{stem}-desktop.webp` at 1440×900 and no more than 350 KB;
- `{stem}-mobile.avif` at 780×1040 and no more than 220 KB; and
- `{stem}-mobile.webp` at 780×1040 and no more than 220 KB.

Implement deterministic focal-point cropping from the exact percentages in the approved specification. Start with restrained WebP/AVIF qualities, run the real dimension/byte assertions, and reduce quality only where a derivative exceeds its hard budget. Do not alter the source photographs.

Register each derivative under the corresponding approved media record with typed `page-hero-desktop`, `page-hero-mobile-avif`, and `page-hero-mobile` roles. Extend each record's intended use without changing its documentary identity.

Update the manifest with filenames, dimensions, exact byte sizes, role, source ID, and the decorative-use amendment.

### Task 3 — Implement the shared image-enabled PageHero

Update:

- `src/components/pages/page-hero.tsx`
- `src/app/globals.css`
- `src/app/services/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/reviews/page.tsx`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`

Add an optional media configuration containing the approved media ID and desktop/mobile object positions. If media is configured, require all three page-hero variants and fail clearly when any variant is missing.

Render the picture before the existing content with the exact 767-pixel mobile sources. Build all paths with `buildAssetPath`, use an empty contextual alt, set eager/high-priority loading, and expose the focal positions through scoped CSS custom properties.

Add a dark directional overlay, lower vignette, restrained red wash, and existing grid texture above the image. Preserve the current headline, introduction, index label, roofline motif, hero dimensions, mobile header clearance, and abstract fallback.

Wire the five approved route/media mappings exactly as specified.

### Task 4 — Reach green and refactor only shared duplication

Run the focused route, hero, media, and URL tests. Fix production behavior until all new assertions pass.

Then run the complete test suite and refactor only if needed to keep variant selection or focal configuration centralized. Do not modify route copy, business data, gallery narratives, or routes outside the approved scope.

### Task 5 — Verify builds, accessibility, and responsive behavior

Run:

- `npm test`
- `npm run typecheck`
- `npm run lint`
- `git diff --check`
- root `npm run build` plus `npm run verify:export`
- exact `/Costa-s-Roofing` public-origin build plus `npm run verify:export`

Extend the browser QA coverage for all five changed routes at 360, 390, 768, 1024, 1440, and 1920 CSS pixels. Settle media before recording results. Require HTTP 200, visible H1, no overflow, no broken images, no failed requests, and no console/page errors.

Verify the mobile AVIF source at 390 pixels, desktop WebP source at 1440 pixels, focal positions, empty contextual alt, first keyboard focus, reduced motion, and WCAG AA contrast over the final crops.

Run median-of-three Lighthouse mobile checks for each changed route under slow 4G and 4× CPU slowdown. Require LCP ≤2.5 seconds, CLS ≤0.1, and TBT ≤200 milliseconds.

### Task 6 — Visual approval and release

Capture representative local screenshots for:

- the five desktop heroes at 1440×900; and
- the five mobile heroes at 390×844.

Present the local result to the user and wait for explicit desktop/mobile approval. Do not push while approval is pending.

After approval:

- stage only the reviewed implementation, generated derivatives, tests, specification/plan, manifest, and QA evidence;
- leave `Master-Roofing-Prompt.txt` untouched;
- commit the approved release;
- push `master` to `Demonstration-Test/Costa-s-Roofing`;
- monitor the GitHub Pages workflow through deployment; and
- repeat the direct-route, canonical, image, console, overflow, and responsive checks on the live Pages URL.

## 4. Stop conditions

Stop and return to design or user review if:

- any selected source cannot produce readable desktop/mobile framing without inventing content;
- a derivative cannot meet the hard byte limit at acceptable visual quality;
- WCAG AA contrast would require obscuring the image beyond the approved treatment;
- a route requires copy or factual changes to accommodate the image; or
- the user does not approve the local desktop/mobile result.
