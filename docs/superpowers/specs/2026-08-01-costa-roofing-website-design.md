# Costa's Roofing Website Design Specification

**Date:** 2026-08-01  
**Status:** Approved design, ready for implementation planning  
**Project root:** `D:\Costa's Roofing`

## 1. Objective

Build a cinematic, conversion-focused, static-capable website for Costa's Roofing. The experience should move visually from exposure and uncertainty toward a sealed, dry, stable result. It must prioritize calls, authentic proof, accessibility, and performance over spectacle.

The first release is phone-only. It must not contain a lead form, simulated submission, appointment confirmation, email action, CRM integration, financing flow, ZIP checker, emergency-service promise, or other behavior that is not operationally configured.

## 2. Approved Business Facts

| Field | Approved public value | Publication rule |
| --- | --- | --- |
| Public brand | Costa's Roofing | Use this name throughout. |
| Legal name | Not approved for publication | Omit completely. |
| Phone | `(973) 517-2952` / `+19735172952` | Display consistently and link with `tel:+19735172952`. |
| Email | None supplied | Omit email links and all email-dependent behavior. |
| Street address | `602 William St, Harrison, NJ 07029` was supplied as the service base | Do not display the street address in visible content, metadata, or structured data. |
| Service area | Harrison and surrounding cities | Use this exact level of specificity. Do not create unsupported city lists or city landing pages. |
| Hours | Open 24 hours, Monday through Sunday | Present as 24-hour call availability only. Do not imply guaranteed response time. |
| Emergency service | Not verified | Do not advertise emergency repair, emergency tarping, dispatch, or guaranteed availability. |
| Rating | 5.0 from 37 Google reviews | May be displayed as a supplied current snapshot. Keep the value centralized and date-reviewed. |
| Facebook | `https://www.facebook.com/p/Costas-Roofing-61551744815173/` | Use as the approved social and authentic-media source. |

Third-party legal-name, registration, license, insurance, bonding, warranty, certification, and address claims are not approved and must not be published.

## 3. Approved Service Scope

The first release may describe only services repeatedly evidenced in the supplied Google review text:

- Roof repair
- Roof replacement and roof installation
- Roof inspection
- Storm and wind-damage roof repair
- Gutter installation and repair
- Siding installation and replacement
- Skylight installation and repair
- Attic and roof ventilation work

The site must not add commercial roofing, maintenance programs, emergency tarping, roof cleaning, solar work, masonry, chimney repair, specific roofing membranes, specific manufacturers, specific materials, insurance assistance, financing, or warranties unless separately verified and approved.

## 4. Audience and Conversion Model

The site serves three intent groups:

1. Visitors dealing with an active leak, visible damage, or recent storm/wind damage.
2. Visitors planning a roof replacement or inspection.
3. Visitors considering gutters, siding, skylights, or ventilation work.

All conversion paths end in a phone call. Contextual calls to action may say:

- Call `(973) 517-2952`
- Call to request a roof inspection
- Call about a roof leak
- Call about storm or wind damage
- Call for a roof replacement estimate
- Call about gutters, siding, skylights, or ventilation

The site must not label an inspection or estimate as free. It must not claim immediate, same-day, emergency, or guaranteed service.

## 5. Creative Direction: Cinematic Proof

### 5.1 Visual language

Use the existing logo's black, white, and Costa-red palette:

- Near-black charcoal for the primary environment
- Warm white for readable content surfaces
- Costa red for calls to action and the recurring roofline
- Muted slate and rain-gray for secondary surfaces
- Soft warm light for the protected/resolved state

The experience should feel premium, durable, precise, local, human, and weather-aware. It must avoid giant shields, disaster imagery, fake crews, fake trucks, fake houses, fake project photography, generic stock homeowners, and insurance-themed fear tactics.

### 5.2 Core narrative

The site opens with subtle weather tension. An abstract roof plane and thin red flashing line appear under light rain. As the visitor moves through the homepage, the red line seals the roofline, connects service pathways, frames authentic project media, underlines review proof, and resolves into a complete roof silhouette above the final call action.

Primary headline:

> PROTECTION, RESTORED.

Supporting line:

> Roofing and exterior work for Harrison and surrounding cities—built around responsive communication, careful workmanship, and thorough cleanup.

Top proof line:

> 5.0 Google rating · 37 reviews · Open 24 hours for calls

## 6. Homepage Experience

The homepage sequence is:

1. **Header:** unchanged logo, Services, Projects, Reviews, About, Contact, and a persistent phone action.
2. **Cinematic hero:** abstract roof environment, restrained rain, authentic finished-roof media, primary phone CTA, and a secondary jump to services.
3. **Urgency pathways:** active leak or damage, replacement planning, and exterior improvements. These are call-routing prompts, not diagnostic tools.
4. **Verified services:** grouped service cards tied to the approved service list.
5. **Authentic project sequence:** one documented exterior project using approved Facebook media. It must not be presented as multiple projects or as a fabricated before-and-after comparison.
6. **Review proof:** selected supplied reviews in an editorial layout, focused on communication, workmanship, cleanup, responsiveness, and fair pricing.
7. **Call process:** a simple invitation to call and discuss the property and next step. Do not invent a multi-step operational workflow.
8. **Service area:** Harrison and surrounding cities, with no unsupported city list or map boundary.
9. **Final phone CTA:** clear phone number, 24-hour call availability, and no response-time or emergency promise.

On mobile, the sequence becomes more direct, weather effects are reduced, and a persistent call control remains visible without covering content.

## 7. Route Architecture

Implement the following routes:

- `/`
- `/services`
- `/roof-repair`
- `/roof-replacement`
- `/roof-inspection`
- `/storm-damage`
- `/exterior-services`
- `/projects`
- `/reviews`
- `/about`
- `/contact`
- `/privacy`

`/exterior-services` covers gutters, siding, skylights, and ventilation so the initial release does not create thin individual pages. There are no city pages, form routes, thank-you route, financing route, insurance route, emergency route, careers route, specials route, or unsupported roofing-system pages.

Every navigation item and call to action must have a working destination. The phone number must remain visible without opening the desktop navigation menu.

## 8. Content and Component Boundaries

Use centralized, typed data rather than scattering facts across visual components.

### 8.1 Content modules

- `business`: public name, phone, hours, service-area language, social link, rating snapshot, and last-reviewed date
- `navigation`: route labels and destinations
- `services`: approved services, grouping, summaries, and route relationships
- `reviews`: reviewer name, source, approved excerpt, full supplied text reference, and display status
- `media`: stable media ID, local filename, source URL, type, intended use, alt text, documentary/decorative status, and approval status
- `seo`: per-route title, description, and optional public site origin

### 8.2 UI units

- `SiteHeader` and `MobileNavigation`: navigation and visible phone access
- `PhoneCTA`: the only conversion primitive; accepts contextual label and analytics-safe event name
- `CinematicHero`: composes the static media fallback, WebGL environment, and hero content without owning business facts
- `RooflineMotif`: owns the recurring SVG/GSAP line sequence
- `IntentPathways`: routes visitor intent to the correct call wording or service content
- `ServiceGrid` and `ServiceDetail`: render typed service data
- `ProjectSequence`: renders only approved media records from one project set
- `ReviewProof`: renders approved review excerpts without altering attribution
- `ServiceAreaStatement`: renders the approved broad service-area wording
- `SiteFooter`: repeats contact, navigation, hours, privacy, and Facebook link

Visual components may receive content records but must not define or alter business facts.

## 9. Motion and WebGL

Use animation only where it strengthens the exposure-to-protection story:

- GSAP and ScrollTrigger: roofline tracing, section transitions, project-sequence reveals, and hero weather resolution
- Framer Motion: navigation states, small component entrances, buttons, and mobile menu behavior
- Lenis: progressive smooth scrolling that disables itself for reduced motion
- React Three Fiber / Three.js: restrained abstract roof planes, subtle rain, seam/flashing line, soft fog, and gentle camera depth in the hero

GSAP and Framer Motion must not control the same transform property on the same element.

The WebGL layer must:

- Use abstract geometry only
- Never imply it is a completed Costa's Roofing project
- Cap device pixel ratio
- Reduce particles, shadows, blur, and camera movement on mobile or constrained devices
- Pause when offscreen or when the document is hidden
- Disable for reduced motion
- Fall back to an optimized authentic roof image plus a static red roofline

The site must not trap scrolling or require motion to understand content.

## 10. Media Manifest

The following media was observed on the approved public Facebook page and inspected before design approval. The user expressly directed that this business-page media be used. No geographic, date, material, or customer claim may be inferred from the images.

| ID | Facebook filename | Type | Intended use | Documentary status | Approval and privacy rule |
| --- | --- | --- | --- | --- | --- |
| `FB-LOGO-01` | `429768876_122139234194058160_6149121170925206293_n.jpg` | Existing logo | Header, footer, favicon source | Authentic brand asset | Preserve artwork and wording; do not redraw or add credentials. |
| `FB-PROJECT-01` | `683655083_17986260380987246_5390409633409325555_n.jpg` | Completed exterior photo | Homepage/project detail | Authentic company-page project media | Crop and color-correct only; avoid location or material claims. |
| `FB-PROJECT-02` | `662302317_17986260389987246_3564814741320234066_n.jpg` | Completed exterior wide photo | Project sequence | Authentic company-page project media | Crop and color-correct only; avoid location or material claims. |
| `FB-PROJECT-03` | `671294453_17986260407987246_6648509351510577430_n.jpg` | In-progress exterior photo | Project process frame | Authentic company-page project media | Show as in-progress work; do not claim a before state. |
| `FB-PROJECT-04` | `675462134_17986260416987246_5797338533586378673_n.jpg` | Completed roof-detail photo | Hero fallback and roof detail | Authentic company-page project media | Crop and color-correct only; do not label the shingle brand or system. |
| `FB-PROJECT-05` | `673809123_17986260398987246_9190427219154465490_n.jpg` | In-progress exterior photo | Project process frame | Authentic company-page project media | Do not present visible jobsite conditions as a safety or process claim. |

All six assets are approved for this project. They show one project set and must remain grouped as one project story. Other Facebook images are excluded from the initial design unless separately inventoried and approved. No AI-generated documentary imagery is permitted. Decorative abstract roof geometry and weather effects are allowed when clearly non-documentary.

## 11. Review Use

The supplied review corpus is the only customer-quote source for the first release. Use a representative subset and preserve reviewer attribution. Excerpts may be shortened for layout without changing meaning. Relative timestamps such as “three months ago” must be omitted because they become stale.

Do not convert individual review anecdotes into universal claims. In particular:

- Specific project prices must not become advertised pricing.
- Individual completion times must not become scheduling promises.
- Material comments must not become manufacturer or warranty claims.
- Insurance anecdotes must not become insurance-service claims.
- Project locations must not become service-area claims.

## 12. SEO and Metadata

Provide unique, factual titles and descriptions for every route. Include Organization or appropriate home-service structured data using only the approved public name, phone, Facebook URL, hours, rating snapshot when supported by the selected schema, and broad area-served wording. Omit the street address and every unverified legal, license, insurance, warranty, and certification field.

The public website origin has not been supplied. Implement it as an optional, validated configuration value. Local builds must not emit a fake production canonical. Canonical links, absolute Open Graph URLs, and the production sitemap are generated only when a non-local public origin is configured. Robots behavior must prevent accidental indexing of an unconfigured preview.

## 13. Accessibility and Progressive Enhancement

- Use semantic landmarks and heading order.
- Keep visible focus states and keyboard-operable navigation.
- Maintain sufficient text, control, and focus contrast.
- Provide descriptive alt text based only on visible image content.
- Use large touch targets and a non-obstructive mobile call control.
- Never convey essential information only by motion, position, or color.
- At 200% browser zoom, content and navigation must remain usable without horizontal page overflow.
- With JavaScript disabled, the core content, routes, navigation, and phone links remain available.
- With reduced motion, remove rain, scroll scrubbing, parallax, smooth scrolling, and nonessential transitions.

## 14. Performance and Failure Behavior

- Use responsive AVIF or WebP derivatives for local project media while retaining the original source files outside the served bundle when practical.
- Preload only the true hero fallback asset.
- Define image dimensions to prevent layout shift.
- Lazy-load below-the-fold project media.
- Code-split the WebGL layer and avoid loading it when the fallback is selected.
- Pause animation and rendering in hidden tabs and offscreen sections.
- Avoid third-party widgets, maps, chat, scheduling, review embeds, advertising pixels, and trackers in the first release.
- If an image fails, use a neutral roofline treatment and preserve the text content.
- If WebGL fails, preserve the authentic fallback image, headline, proof line, and phone CTA.
- If enhanced scrolling fails, native scrolling remains intact.

## 15. Testing and Acceptance Criteria

### 15.1 Automated checks

- TypeScript and production build complete without errors.
- Every approved route renders.
- Every internal navigation target resolves.
- Every phone CTA uses exactly `tel:+19735172952`.
- Content guards reject bracketed placeholders and banned unsupported phrases.
- No email, form, fake confirmation, street address, emergency claim, legal name, license number, warranty, financing, or insurance claim appears in the rendered site.
- Metadata uses the centralized facts and omits fake public origins.

### 15.2 Browser and responsive checks

- Verify the settled page at small mobile, large mobile, tablet, desktop, and large desktop widths.
- Verify header, menu, call control, each route, and direct/deep-route loading.
- Verify keyboard navigation, focus order, reduced motion, and 200% zoom.
- Scroll far enough to settle lazy media before judging images or overflow.
- Check console, hydration, network, missing-asset, and horizontal-overflow errors.
- Verify WebGL pause/fallback behavior and that the phone CTA remains usable while animations run.
- Verify the non-WebGL experience preserves the same hierarchy and conversion path.

### 15.3 Acceptance standard

The delivered interface must match the approved Cinematic Proof direction, use only approved facts and media, keep the phone conversion path obvious, and remain fast and usable when cinematic enhancement is unavailable.

## 16. Explicit Exclusions

The first release excludes deployment, domain purchase, email delivery, forms, CRM, scheduling, SMS, uploads, financing, insurance workflows, emergency dispatch, call tracking, analytics providers, chat, maps, city landing pages, commercial-roof claims, maintenance programs, manufacturer claims, warranties, promotions, licenses, certifications, and generated documentary imagery.

These exclusions are deliberate boundaries, not unfinished placeholders.
