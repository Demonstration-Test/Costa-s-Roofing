# Costa's Roofing Secondary-Page Image Heroes

**Status:** Specification approved; awaiting written-spec approval

**Date:** 2026-08-01

**Scope:** `/services`, `/projects`, `/reviews`, `/about`, and `/contact`

## 1. Objective

Add authenticated, full-bleed photography to the hero sections on the five primary secondary pages so they share the homepage's cinematic visual language. Each requested page must remain distinct, readable, responsive, fast, and factually constrained.

The change does not add new business claims or media sources. It reuses only the five project photographs already approved from the Costa's Roofing Facebook page and recorded in `src/content/media.ts` and the media manifest.

This specification is a narrow decorative-use amendment to the original media-use table. The five photographs remain one shared documentary project set; they must not be described or implied as separate projects. Their complete grouped narrative and neutral captions on `/projects` remain unchanged. Reusing an image as an atmospheric route hero does not change its documentary identity or authorize any additional claim.

## 2. Approved direction

Each requested page receives one unique approved project photograph as a full-bleed background beneath the existing oversized editorial typography:

| Route | Media record | Visible subject |
| --- | --- | --- |
| `/services` | `FB-PROJECT-04` | Finished roof-ridge detail |
| `/projects` | `FB-PROJECT-02` | Wide completed exterior |
| `/reviews` | `FB-PROJECT-01` | Completed front exterior |
| `/about` | `FB-PROJECT-03` | Exterior work in progress |
| `/contact` | `FB-PROJECT-05` | Alternate siding work-in-progress frame |

These images remain documentary media, but their hero use is atmospheric. Hero text must not infer a date, location, material, customer, project value, sequence, or before-and-after relationship from any photograph.

The derivative stems, crop focal points, and rendered positions are fixed as follows. Percentages are horizontal then vertical coordinates within the oriented source image. The processing pipeline must use the coordinate as the focal point for a `cover` crop, and CSS must use the matching `object-position` value.

| Route | Derivative stem | Desktop 1440×900 processing focal / `object-position` | Mobile 780×1040 processing focal / `object-position` |
| --- | --- | --- | --- |
| `/services` | `services-hero` | `50% 50%` | `58% 52%` |
| `/projects` | `projects-hero` | `50% 52%` | `55% 55%` |
| `/reviews` | `reviews-hero` | `50% 56%` | `56% 58%` |
| `/about` | `about-hero` | `50% 48%` | `52% 50%` |
| `/contact` | `contact-hero` | `50% 50%` | `55% 52%` |

At rendered widths of 768 CSS pixels and above, the desktop coordinate applies. At 767 CSS pixels and below, the mobile coordinate applies.

## 3. Composition

The existing `PageHero` dimensions, index label, headline, introduction, and roofline motif remain. The image fills the hero behind those elements.

The image treatment uses:

- a strong dark left-to-right gradient beneath the text;
- a lower vignette to preserve the transition into the next section;
- a restrained red atmospheric wash consistent with the existing industrial-cinematic palette;
- page-specific focal positioning so important visible work remains legible at desktop and mobile aspect ratios; and
- the current oversized Oswald headline and Manrope supporting copy without reducing their established hierarchy.

The overlay must keep normal text at or above a WCAG AA contrast ratio of 4.5:1 and large text at or above 3:1 against the most adverse part of every selected crop. The static image and readable copy are the complete experience; no WebGL or animation is required.

## 4. Component boundary

`PageHero` gains an optional authenticated-media configuration. The configuration identifies an approved media record and its page-specific focal positions. When the configuration is absent, `PageHero` renders the existing abstract treatment unchanged.

Only the five routes in this specification supply image media. Service-detail routes, `/exterior-services`, `/privacy`, and the 404 page retain their current abstract heroes.

`PageHero` remains a server component and owns base-path resolution. It reads `process.env.PUBLISH_BASE_PATH ?? ""` and passes every `<source srcSet>` and `<img src>` value through the shared `buildAssetPath` helper. No route may concatenate or duplicate the base path.

When media is configured, `PageHero` renders a semantic `<picture>` layer with:

- a mobile AVIF source using `media="(max-width: 767px)"`;
- a mobile WebP source using `media="(max-width: 767px)"`; and
- a desktop WebP image.

The image is decorative in these five hero instances because the heading and introduction carry the page meaning. It therefore uses `alt=""` only in this contextual hero rendering and cannot become the sole carrier of information. The same media records retain their approved descriptive alternative text in the documentary `/projects` gallery and every other content-bearing context.

Configured media is a build contract. If the approved record or any required derivative is absent, the component or build must fail clearly rather than silently publish an empty hero.

## 5. Media derivatives

The existing media-processing pipeline will create route-appropriate derivatives from the approved 1440-pixel-wide source photographs:

- desktop WebP: 1440 by 900 pixels, no more than 350 KB;
- mobile AVIF: 780 by 1040 pixels, no more than 220 KB; and
- mobile WebP fallback: 780 by 1040 pixels, no more than 220 KB.

Focal crops must follow the table in Section 2 and use visible content only. The processing step may crop and color-correct but must not generate, remove, or materially alter documentary content. The derived filenames, dimensions, byte sizes, and source mapping must remain centralized in the media records and documented in the media manifest.

Automated media tests must inspect every new file and fail unless its dimensions exactly match the required desktop or mobile dimensions and its byte size meets the corresponding hard limit.

These route heroes are their pages' likely largest-contentful-paint images, so they load eagerly with high fetch priority. They must not preload images belonging to other routes.

## 6. Responsive behavior

At desktop widths, the text remains left-weighted while the selected image focal point occupies the center or right side of the composition. At mobile widths, the hero continues to use the current compact editorial hierarchy, while the dedicated portrait crop preserves the selected subject behind the overlay. The `<picture>` source boundary and the CSS focal-position boundary both use the exact 767-pixel maximum defined in Section 2.

The implementation must preserve:

- zero horizontal overflow from 360 through 1920 CSS pixels;
- the current mobile header and call dock;
- visible hero copy without text-image collisions;
- reduced-motion behavior; and
- GitHub Pages asset URLs under the exact `/Costa-s-Roofing` base path.

## 7. Test-first implementation contract

Before production changes, route tests will require:

1. one image-enabled hero on each of the five requested routes;
2. five distinct approved media records across those routes;
3. mobile AVIF, mobile WebP, and desktop WebP sources;
4. correct root and prefixed asset paths;
5. eager, high-priority loading on the route hero image; and
6. unchanged media-free behavior for routes outside this scope.

Root and prefixed URL assertions must exercise the real `PageHero` server rendering and verify that every source URL is produced by the same `buildAssetPath` behavior used elsewhere in the site.

The new test must be observed failing against the current implementation before the component, route, media-record, pipeline, or style changes are made.

## 8. Verification and release gate

Implementation is complete only after all of the following pass:

- full unit test suite;
- TypeScript type checking;
- ESLint without warnings;
- root static export and route verification;
- `/Costa-s-Roofing` static export and route verification;
- settled browser checks for all five routes at mobile and desktop widths;
- no broken images, failed requests, console errors, or horizontal overflow;
- correct responsive source selection and GitHub Pages-prefixed asset paths;
- WCAG AA text contrast over every final desktop and mobile crop;
- the approved settled-page viewport matrix at 360, 390, 768, 1024, 1440, and 1920 CSS pixels on each changed route;
- median-of-three Lighthouse mobile runs on each of the five changed routes using slow 4G and 4× CPU slowdown, with LCP at or below 2.5 seconds, CLS at or below 0.1, and TBT at or below 200 milliseconds; and
- local desktop and mobile visual review by the user.

The change must not be pushed or deployed until the user approves the local desktop and mobile result. The unrelated untracked `Master-Roofing-Prompt.txt` remains outside the release scope.

## 9. Non-goals

This change does not:

- add or replace project photographs;
- add images to service-detail, exterior-services, privacy, or error-page heroes;
- add carousels, video, WebGL, or hero crossfades;
- change approved copy, navigation, business facts, review text, or call behavior;
- present the five photographs as five different projects; or
- add forms, email, scheduling, maps, or other conversion mechanisms.
