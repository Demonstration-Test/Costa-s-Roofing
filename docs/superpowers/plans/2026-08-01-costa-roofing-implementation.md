# Costa's Roofing Website Implementation Plan

**Date:** 2026-08-01  
**Design specification:** `docs/superpowers/specs/2026-08-01-costa-roofing-website-design.md`  
**Visual references:** `docs/design/concepts/`  
**Delivery:** static Next.js App Router export with empty and prefixed base-path support

## 1. Outcome

Deliver the complete twelve-route Costa's Roofing site described in the approved specification and match the six approved visual references at agency-signoff quality. The public experience remains phone-only and uses only approved facts, review excerpts, logo, and Facebook project media.

The implementation follows red-green-refactor. Production behavior is not added until the corresponding test has been written and observed failing for the expected reason.

## 2. Approved Visual Reference Set

| Surface | Reference |
| --- | --- |
| Desktop header and hero | `docs/design/concepts/hero-desktop.png` |
| Intent pathways and services | `docs/design/concepts/services-desktop.png` |
| Authentic project sequence | `docs/design/concepts/projects-desktop.png` |
| Review proof and service area | `docs/design/concepts/reviews-desktop.png` |
| Final CTA and footer | `docs/design/concepts/cta-footer-desktop.png` |
| Mobile first viewport at 390px | `docs/design/concepts/hero-mobile-390.png` |

Production must embed the unchanged authentic logo and project photographs. The concept screenshots are layout and styling references, not production media.

## 3. Technical Shape

- Next.js App Router, TypeScript, React, and Tailwind CSS
- Static export with `trailingSlash: true`
- `PUBLISH_BASE_PATH` validation and one URL-builder module
- Server Components for route content and metadata
- Small Client Components only for navigation enhancement, GSAP sequences, Lenis, and WebGL
- GSAP/ScrollTrigger for the red roofline and section reveals
- Framer Motion for navigation and small interaction states
- React Three Fiber/Three.js for a lazy, optional hero enhancement
- Vitest, Testing Library, and build-artifact tests
- `next/image` with static-export-compatible unoptimized local derivatives and explicit sizes
- `next/font` for a condensed display family and readable grotesk body family

## 4. Task Sequence

### Task 1 — Project foundation and test harness

Create:

- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `next.config.ts`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `vitest.config.ts`
- `vitest.setup.ts`
- `.gitignore`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/page.tsx` as a minimal temporary route shell

Install the runtime and development dependencies required by Section 3. Avoid generators that add unreviewed sample content.

Verify:

- `npm test` starts Vitest successfully with no test files.
- `npm run typecheck` reaches the temporary shell.
- `npm run build` produces a static export.

The temporary page contains no fabricated business copy and is replaced during the first feature cycle.

### Task 2 — Reacquire, validate, and process authentic media

Acquire the six approved Facebook assets into:

- `assets/source/facebook/FB-LOGO-01.jpg`
- `assets/source/facebook/FB-PROJECT-01.jpg`
- `assets/source/facebook/FB-PROJECT-02.jpg`
- `assets/source/facebook/FB-PROJECT-03.jpg`
- `assets/source/facebook/FB-PROJECT-04.jpg`
- `assets/source/facebook/FB-PROJECT-05.jpg`

Create:

- `scripts/process-media.mjs`
- `src/content/media.ts`
- `src/content/media.test.ts`
- `docs/media/costas-facebook-media-manifest.md`
- optimized derivatives under `public/media/optimized/`

Red:

- Test that the mandatory logo, mandatory hero roof detail, and minimum three-image project set are present.
- Test that every served derivative has dimensions, alt text, documentary status, and base-path-safe local path.
- Observe failure because the media registry and derivatives do not exist.

Green:

- Reacquire the exact filenames through the approved Facebook page.
- Record byte size, dimensions, SHA-256, source, intended use, and approval status.
- Produce bounded WebP/AVIF derivatives, including hero desktop at or below 350KB and hero mobile at or below 220KB.
- Implement the typed media registry and pass the validation tests.

Stop implementation and return a media-source blocker if the minimum contract in the design specification cannot be met.

### Task 3 — Business content, claim guard, and URL configuration

Create:

- `src/content/business.ts`
- `src/content/services.ts`
- `src/content/reviews.ts`
- `src/content/routes.ts`
- `src/lib/site-url.ts`
- `src/lib/content-guard.ts`
- matching `*.test.ts` files

Red:

- Test the exact phone display and `tel:+19735172952` URI.
- Test the public brand, broad service area, supplied rating snapshot, 24-hour call wording, and omitted address/email/legal name.
- Test the eight approved service families and six approved review excerpts.
- Test empty and valid prefixed base paths, rejected malformed paths, configured HTTPS origins, and rejected origins with path/query/credentials.
- Test every banned phrase and bracketed placeholder rule against rendered content records.
- Observe each test fail because the modules do not exist.

Green:

- Implement the smallest typed content and URL modules that satisfy the approved contract.
- Refactor shared immutable types only after all tests are green.

### Task 4 — Metadata, sitemap, and robots behavior

Create:

- `src/lib/site-metadata.ts`
- `src/lib/site-metadata.test.ts`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/components/seo/organization-json-ld.tsx`

Red:

- Test configured and unconfigured origins with both empty and prefixed base paths.
- Assert canonical, Open Graph URL, JSON-LD URL, sitemap URLs, route-level robots metadata, and robots-file content.
- Assert the street address, hours, rating, legal name, licenses, and unsupported claims are absent from JSON-LD.
- Observe the expected missing-module failures.

Green:

- Implement the deterministic metadata contract from Section 12 of the approved specification.
- Keep route metadata in Server Components.

### Task 5 — Design system and shared shell

Create:

- `src/lib/fonts.ts`
- `src/components/site/site-header.tsx`
- `src/components/site/mobile-navigation.tsx`
- `src/components/site/site-footer.tsx`
- `src/components/ui/phone-cta.tsx`
- `src/components/ui/roofline-mark.tsx`
- `src/components/ui/section-heading.tsx`
- component tests for navigation, footer, and phone CTAs

Extract and lock:

- Backgrounds: near-black `#070708`, raised charcoal `#111113`, warm white `#F3EEE5`
- Accent: Costa red near `#D12B2B`, adjusted only for accessible contrast
- Display typography: condensed uppercase family matching the references
- Body/control typography: clean grotesk with readable UI sizing
- Square buttons, fine rules, clipped polygon media frames, minimal radius
- 8px spacing foundation and large editorial section rhythm

Red:

- Test visible desktop phone access.
- Test the mobile native `<details>/<summary>` baseline and all navigation destinations.
- Test footer omission of address and email.
- Observe failures before implementing components.

Green:

- Implement the semantic shell and exact approved navigation/copy.
- Use progressive enhancement so navigation remains operable without JavaScript.

### Task 6 — Homepage static composition

Create:

- `src/components/home/cinematic-hero.tsx`
- `src/components/home/intent-pathways.tsx`
- `src/components/home/service-index.tsx`
- `src/components/home/project-sequence.tsx`
- `src/components/home/review-proof.tsx`
- `src/components/home/service-area-band.tsx`
- `src/components/home/final-call.tsx`
- focused component tests

Red:

- Test the allowed first-viewport copy list, CTA labels, section order, review attribution, one-project wording, and call-only conversion behavior.
- Test that documentary images use the approved media registry.
- Test that no form, email, address, fake metric, or unsupported action is present.
- Observe the expected failures.

Green:

- Implement one reference slice at a time in this order: hero, pathways/services, project proof, reviews/service area, final CTA/footer.
- After each slice, render in the in-app browser and compare to its accepted concept before starting the next slice.

### Task 7 — Motion and optional WebGL enhancement

Create:

- `src/components/motion/motion-provider.tsx`
- `src/components/motion/roofline-motif.tsx`
- `src/components/motion/use-document-visibility.ts`
- `src/components/hero/hero-webgl.tsx`
- `src/components/hero/hero-webgl-boundary.tsx`
- `src/lib/webgl-capability.ts`
- matching focused tests

Red:

- Test reduced-motion and unavailable-context decisions.
- Test hidden-document pause state and static fallback persistence.
- Test that WebGL failure does not remove the headline, proof, photo, or phone CTA.
- Observe failures before adding client behavior.

Green:

- Keep the authentic static hero rendered first.
- Lazy-load the WebGL enhancement after the core hero.
- Use abstract roof planes, restrained rain, seam line, fog, capped pixel density, mobile quality reduction, offscreen pause, and document-hidden pause.
- Keep GSAP and Framer Motion from owning the same transform.

### Task 8 — Secondary routes

Create the approved routes under `src/app/`:

- `services/page.tsx`
- `roof-repair/page.tsx`
- `roof-replacement/page.tsx`
- `roof-inspection/page.tsx`
- `storm-damage/page.tsx`
- `exterior-services/page.tsx`
- `projects/page.tsx`
- `reviews/page.tsx`
- `about/page.tsx`
- `contact/page.tsx`
- `privacy/page.tsx`
- `not-found.tsx`

Create shared route composition components under `src/components/pages/`.

Red:

- Add route-contract tests for required headings, approved content records, phone actions, related-route links, and explicit exclusions.
- Add privacy-copy tests for the five approved factual statements and forbidden legal promises.
- Observe route tests fail before writing page modules.

Green:

- Implement Server Component pages from the centralized content.
- Keep each route visually consistent with the accepted design system without inventing new component families.

### Task 9 — Static export and deep-route verification

Create:

- `scripts/verify-export.mjs`
- `tests/export/static-export.test.ts`

Red:

- Assert all twelve `route/index.html` outputs, base-path-safe assets/links, phone URIs, preview `noindex`, and configured canonical/sitemap behavior.
- Run first against the incomplete export and confirm expected failures.

Green:

- Repair configuration and route output until empty-base and `/costas-roofing` prefixed builds both pass.
- Verify the full exported directory, not only the development server.

### Task 10 — Browser, accessibility, performance, and fidelity QA

Create final evidence:

- `docs/qa/fidelity-ledger.md`
- `docs/qa/release-checklist.md`
- browser screenshots under a temporary QA directory during comparison

Use the in-app browser first.

Verify:

- Viewports `360`, `390`, `768`, `1024`, `1440`, and `1920`
- Direct loading of every route
- Native menu, keyboard order, visible focus, tap targets, reduced motion, and 200% zoom
- No horizontal overflow after lazy media settles
- Phone action availability and exact URI
- No console, hydration, missing-asset, or network errors
- WebGL context-null fallback and hidden-tab pause
- Median of three Lighthouse mobile runs against the approved budgets
- Concept-to-browser comparison at native concept dimensions when practical

Use `view_image` on every accepted concept and the corresponding final browser screenshot. Record at least five concrete comparison points covering copy, layout, type, palette, media treatment, spacing, responsive behavior, and motion. Fix every material mismatch before handoff.

Remove temporary screenshots and reports that are not part of the final evidence set.

## 5. Required Commands

The final package scripts must support:

```text
npm test
npm run typecheck
npm run lint
npm run build
npm run build:prefixed
npm run verify:export
```

Run the complete suite after every refactor and before final QA.

## 6. Commit Strategy

Use focused local commits after each green milestone:

1. project foundation and test harness
2. authentic media manifest and optimized derivatives
3. business content, guards, and URL/metadata rules
4. shared design system and shell
5. homepage static composition
6. motion and WebGL enhancement
7. secondary routes
8. export, accessibility, performance, and fidelity fixes

Do not add the pre-existing `Master-Roofing-Prompt.txt` to a commit unless the user later requests it.
