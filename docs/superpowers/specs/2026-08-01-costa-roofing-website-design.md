# Costa's Roofing Website Design Specification

**Date:** 2026-08-01  
**Status:** Approved design, ready for implementation planning  
**Project root:** `D:\Costa's Roofing`

## 1. Objective

Build a cinematic, conversion-focused website for Costa's Roofing as a Next.js App Router static export. The experience should move visually from exposure and uncertainty toward a sealed, dry, stable result. It must prioritize calls, authentic proof, accessibility, and performance over spectacle.

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

The rating and hours snapshot was supplied and approved in this project conversation on `2026-08-01`. That date is the centralized `lastReviewed` value; it is an internal freshness marker and is not displayed as the date on which Google published or verified the reviews.

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

### 7.1 Route content contracts

- `/`: the complete homepage sequence in Section 6.
- `/services`: intro, the four core roofing service summaries, the grouped exterior-service summary, contextual call action, and related-route links.
- `/roof-repair`: leak/damage concerns, the verified repair scope, boundaries against remote diagnosis, relevant review excerpt, and call action.
- `/roof-replacement`: replacement/installation scope, planning considerations without lifespan or material-performance promises, relevant review excerpt, and call action.
- `/roof-inspection`: reasons a visitor may request an inspection, a statement that calling does not confirm an appointment, relevant review excerpt, and call action.
- `/storm-damage`: wind and storm-damage repair scope, safety guidance to avoid climbing onto a roof, no emergency/insurance promise, relevant review excerpt, and call action.
- `/exterior-services`: four subsections for gutters, siding, skylights, and ventilation, each limited to the approved scope, followed by a single call action.
- `/projects`: one project story assembled from the approved Facebook media set, with neutral captions based only on visible content. No invented location, date, material, customer, scope value, or before/after claim.
- `/reviews`: the approved rating snapshot, the six approved excerpts in Section 11, a note that individual experiences vary, and a call action.
- `/about`: public brand, Harrison-area focus, and review-evidenced themes of communication, workmanship, cleanup, and responsiveness. No founding date, legal identity, owner biography, team size, credentials, or years-in-business claim.
- `/contact`: phone number, 24-hour call availability, broad service-area wording, Facebook link, and contextual call prompts. No address, email, map, form, or appointment confirmation.
- `/privacy`: the factual first-release notice specified in Section 12.1.

Service detail routes reuse `ServiceDetail`, review records, and `PhoneCTA`; they do not define parallel copies of business data. Projects, reviews, about, contact, and privacy use the route-specific page units defined in Section 8.2.

### 7.2 Rendering, export, and base-path contract

- Use Next.js App Router with TypeScript and `output: "export"`.
- Use folder-style static routes with `trailingSlash: true`, producing `route/index.html` so direct/deep routes work on static hosts that serve directory indexes.
- Use a centralized `PUBLISH_BASE_PATH` build setting that accepts either an empty string or one leading-slash path segment such as `/costas-roofing`.
- Apply the validated base path to internal navigation and local assets through one URL helper. Do not hard-code root-relative project paths inside components.
- Verify both empty-base and prefixed-base builds. A host must publish the complete export directory and support directory-index resolution; hosts that cannot do so are outside the first-release hosting contract.
- Core content is server-rendered into the static HTML. Client components own only navigation state and progressive animation.

`PUBLIC_SITE_ORIGIN` and `PUBLISH_BASE_PATH` are separate settings. `PUBLIC_SITE_ORIGIN` is either absent or an HTTPS origin consisting only of scheme and host, with no path, query, fragment, credentials, or trailing slash. `PUBLISH_BASE_PATH` is either empty or matches `^/[A-Za-z0-9._-]+$`. One shared URL builder joins the origin, base path, folder-style route, and trailing slash exactly once.

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

- `SiteHeader` and `MobileNavigation`: navigation and visible phone access; the mobile baseline uses native HTML `<details>` and `<summary>` so links remain operable without JavaScript, with Framer Motion added only as enhancement
- `PhoneCTA`: the only conversion primitive; accepts a contextual label and always resolves to the centralized phone URI
- `CinematicHero`: composes the static media fallback, WebGL environment, and hero content without owning business facts
- `RooflineMotif`: owns the recurring SVG/GSAP line sequence
- `IntentPathways`: routes visitor intent to the correct call wording or service content
- `ServiceGrid` and `ServiceDetail`: render typed service data
- `ProjectSequence`: renders only approved media records from one project set
- `ReviewProof`: renders approved review excerpts without altering attribution
- `ServiceAreaStatement`: renders the approved broad service-area wording
- `SiteFooter`: repeats contact, navigation, hours, privacy, and Facebook link

Additional route-level units:

- `ServicesOverviewPage`: composes all verified service summaries and related links
- `ServiceDetailPage`: shared route shell for roof repair, replacement, inspection, and storm damage
- `ExteriorServicesPage`: owns the four approved exterior subsections
- `ProjectsPage`: owns the one-project media narrative and captions
- `ReviewsPage`: owns the rating snapshot and approved excerpts
- `AboutPage`: owns the constrained company introduction and evidence-led themes
- `ContactPage`: owns phone, hours, service area, and Facebook actions
- `PrivacyPage`: renders the fixed factual notice contract in Section 12.1

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
- Reduce particles, shadows, blur, and camera movement below `768px`
- Pause when offscreen or when the document is hidden
- Disable for reduced motion
- Fall back to an optimized authentic roof image plus a static red roofline

Fallback selection is deterministic. Render the authentic static fallback in the initial HTML. Do not mount the WebGL enhancement when `prefers-reduced-motion: reduce` matches or when a capability probe cannot obtain either a WebGL2 or WebGL context. If canvas initialization or rendering throws, a local error boundary removes the canvas and leaves the already-rendered fallback intact. Other devices receive the enhancement with the `<768px` quality reduction; do not infer a separate “constrained device” class from user agent or unsupported heuristics.

The site must not trap scrolling or require motion to understand content.

## 10. Media Manifest

The following media was observed on the approved public Facebook page and inspected before design approval. The user expressly directed that this business-page media be used. No geographic, date, material, or customer claim may be inferred from the images.

| ID | Facebook filename | Type | Intended use | Documentary status | Approval and privacy rule |
| --- | --- | --- | --- | --- | --- |
| `FB-LOGO-01` | `429768876_122139234194058160_6149121170925206293_n.jpg` | Existing logo | Header, footer, favicon source | Authentic brand asset | Preserve artwork and wording; do not redraw or add credentials. |
| `FB-PROJECT-01` | `683655083_17986260380987246_5390409633409325555_n.jpg` | Completed exterior photo | Homepage and `/projects` | Authentic company-page project media | Crop and color-correct only; avoid location or material claims. |
| `FB-PROJECT-02` | `662302317_17986260389987246_3564814741320234066_n.jpg` | Completed exterior wide photo | Project sequence | Authentic company-page project media | Crop and color-correct only; avoid location or material claims. |
| `FB-PROJECT-03` | `671294453_17986260407987246_6648509351510577430_n.jpg` | In-progress exterior photo | Project process frame | Authentic company-page project media | Show as in-progress work; do not claim a before state. |
| `FB-PROJECT-04` | `675462134_17986260416987246_5797338533586378673_n.jpg` | Completed roof-detail photo | Hero fallback and roof detail | Authentic company-page project media | Crop and color-correct only; do not label the shingle brand or system. |
| `FB-PROJECT-05` | `673809123_17986260398987246_9190427219154465490_n.jpg` | In-progress exterior photo | Project process frame | Authentic company-page project media | Do not present visible jobsite conditions as a safety or process claim. |

All six assets are approved for this project. They show one project set and must remain grouped as one project story. Other Facebook images are excluded from the initial design unless separately inventoried and approved. No AI-generated documentary imagery is permitted. Decorative abstract roof geometry and weather effects are allowed when clearly non-documentary.

### 10.1 Acquisition and local paths

The first implementation step is to reacquire the six approved files from the approved Facebook page through the browser asset inventory used during design review. Store untouched acquisitions outside the served export at:

- `assets/source/facebook/FB-LOGO-01.jpg`
- `assets/source/facebook/FB-PROJECT-01.jpg`
- `assets/source/facebook/FB-PROJECT-02.jpg`
- `assets/source/facebook/FB-PROJECT-03.jpg`
- `assets/source/facebook/FB-PROJECT-04.jpg`
- `assets/source/facebook/FB-PROJECT-05.jpg`

Record the acquired byte size, pixel dimensions, and SHA-256 hash in `docs/media/costas-facebook-media-manifest.md`. Create served derivatives under `public/media/optimized/` and map them from `src/content/media.ts`. If an approved asset cannot be reacquired or does not visually match the inspected filename, exclude it rather than substituting another image.

`FB-LOGO-01` and `FB-PROJECT-04` are mandatory. The project sequence also requires at least three matching project images, including one completed view (`FB-PROJECT-01`, `FB-PROJECT-02`, or `FB-PROJECT-04`) and one in-progress view (`FB-PROJECT-03` or `FB-PROJECT-05`). Failure to meet that minimum blocks interface implementation and must be returned to the user as a media-source issue. If the minimum is met but one or two optional project frames fail, exclude those frames and render the project sequence with the remaining approved images. A media-free or substituted-stock version is not an acceptable first-release state.

## 11. Review Use

The supplied review corpus at `C:\Users\Anoth\.codex\attachments\5906ad06-0a8f-45d3-aa87-56e8d146b666\pasted-text.txt` is the only customer-quote source for the first release. Preserve that path as a provenance note in the implementation media/content audit; the production application must not depend on the attachment path at runtime. Excerpts may be shortened for layout without changing meaning. Relative timestamps such as “three months ago” must be omitted because they become stale.

The approved initial excerpts are:

| Reviewer | Approved excerpt |
| --- | --- |
| Carlos Rivas | “The crew was extremely efficient and professional from start to finish.” |
| Jeanne Fasano | “Clear communication, very reasonably priced, extremely accommodating, and very close attention to detail.” |
| Alex Neff | “Fast, organized, and high-quality work from the entire team.” |
| John Gagliano | “After the job was complete they completely cleaned the entire property.” |
| Jake Handler | “Very honest and would absolutely use them again.” |
| Stephen O'Brien | “They left the property cleaner than they arrived.” |

Do not convert individual review anecdotes into universal claims. In particular:

- Specific project prices must not become advertised pricing.
- Individual completion times must not become scheduling promises.
- Material comments must not become manufacturer or warranty claims.
- Insurance anecdotes must not become insurance-service claims.
- Project locations must not become service-area claims.

## 12. SEO and Metadata

Provide unique, factual titles and descriptions for every route. Use one `Organization` JSON-LD record containing only `@context`, `@type: "Organization"`, `name`, `url` when a production origin is configured, `telephone`, `sameAs` with the approved Facebook URL, and `areaServed` with the literal value `Harrison and surrounding cities`. Do not include `address`, `openingHours`, `aggregateRating`, `review`, legal name, license, insurance, warranty, certification, or price fields. The visible rating and 24-hour call statement are content snapshots, not structured business-opening claims.

The public website origin has not been supplied. Use the `PUBLIC_SITE_ORIGIN` validation contract in Section 7.2. When it is configured, every canonical, `og:url`, sitemap URL, and JSON-LD `url` is built as `PUBLIC_SITE_ORIGIN + PUBLISH_BASE_PATH + route + trailing slash`; the organization URL uses the same builder with `/`. When it is absent, omit canonical tags, `og:url`, and the JSON-LD `url`; generate an empty sitemap URL set; and emit `robots.txt` with `User-agent: *` and `Disallow: /`. Never use localhost, a Facebook URL, or an invented domain as the production origin.

### 12.1 Privacy route copy contract

The `/privacy` route is a factual website notice dated `2026-08-01`, not a claim of legal compliance. It must state:

- This first-release website has no contact form, customer account, file upload, analytics provider, advertising pixel, chat, scheduling widget, or online payment.
- The site does not intentionally collect or transmit personal information through its own interface.
- Calling Costa's Roofing is handled through the visitor's telephone provider and the business's normal phone operations.
- Following the Facebook link subjects the visitor to Facebook's own privacy practices.
- Visitors may call `(973) 517-2952` with questions about this website notice.

Do not add cookie, retention, deletion, security, regulatory, or data-controller promises that cannot be verified from the static implementation.

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

For the production build on Lighthouse mobile simulation using slow 4G and 4× CPU slowdown, target Largest Contentful Paint at or below `2.5s`, Cumulative Layout Shift at or below `0.1`, and Total Blocking Time at or below `200ms`. The initial page must not wait for the WebGL chunk to render the hero content or phone CTA. Mobile hero derivatives must remain at or below `220KB`, desktop hero derivatives at or below `350KB`, and no below-the-fold project image may preload.

## 15. Testing and Acceptance Criteria

### 15.1 Automated checks

- TypeScript and production build complete without errors.
- Every approved route renders.
- Every internal navigation target resolves.
- Every phone CTA uses exactly `tel:+19735172952`.
- Content guards scan rendered text, metadata, JSON-LD, and route content records case-insensitively. They reject bracketed placeholders and the following canonical unsupported phrases: `best`, `number one`, `#1`, `top-rated`, `lowest price`, `free estimate`, `free inspection`, `free roof`, `free replacement`, `same-day`, `24/7`, `emergency`, `emergency tarping`, `guaranteed response`, `lifetime roof`, `lifetime warranty`, `insurance will pay`, `no out-of-pocket`, `cover your deductible`, `licensed`, `insured`, `bonded`, `certified`, `financing available`, and `commercial roofing`. Whole-word matching is required for single words; punctuation and capitalization do not bypass a match. Source documentation and the unrendered original review corpus are outside the scan.
- No email, form, fake confirmation, street address, emergency claim, legal name, license number, warranty, financing, or insurance claim appears in the rendered site.
- Metadata uses the centralized facts and omits fake public origins.

### 15.2 Browser and responsive checks

- Verify the settled page at `360`, `390`, `768`, `1024`, `1440`, and `1920` CSS-pixel viewport widths.
- Verify header, menu, call control, each route, and direct/deep-route loading.
- Verify keyboard navigation, focus order, reduced motion, and 200% zoom.
- Scroll far enough to settle lazy media before judging images or overflow.
- Check console, hydration, network, missing-asset, and horizontal-overflow errors.
- Verify WebGL pause/fallback behavior and that the phone CTA remains usable while animations run.
- Verify the non-WebGL experience preserves the same hierarchy and conversion path.
- Exercise the no-WebGL path by overriding `HTMLCanvasElement.prototype.getContext` to return `null` before the client bundle initializes, then confirm the fallback remains visible and the page produces no uncaught error.

### 15.3 Acceptance standard

The delivered interface must match the approved Cinematic Proof direction, use only approved facts and media, keep the phone conversion path obvious, and remain fast and usable when cinematic enhancement is unavailable.

## 16. Explicit Exclusions

The first release excludes deployment, domain purchase, email delivery, forms, CRM, scheduling, SMS, uploads, financing, insurance workflows, emergency dispatch, call tracking, analytics providers, chat, maps, city landing pages, commercial-roof claims, maintenance programs, manufacturer claims, warranties, promotions, licenses, certifications, and generated documentary imagery.

These exclusions are deliberate boundaries, not unfinished placeholders.
