# Tampa Kitchen Cabinets — Build Deliverables & Handoff

Sister brand of **Westchase Painting Company** (a division of Westchase Painting Company LLC).
Built on the Westchase Painting Astro design system: **identical color tokens, typography (Inter),
component library, and Cloudflare/Sveltia stack** — different brand identity and keyword focus.

---

## 1. Tagline — 3 options (cabinet-specialist positioning, kitchen scope)

1. **Tampa's Kitchen Cabinet Specialists** ← *currently in use (set in `src/data/site.json` → `tagline`)*
2. **Custom Cabinets, Refacing & Full Kitchen Remodels in Tampa**
3. **From Cabinets to Complete Kitchens, Done Right in Tampa**

Swap the active tagline in one place: `src/data/site.json` (or Sveltia CMS → Site Settings).

---

## 2. Routes built (26 pages)

| Page | Route | Primary target |
|---|---|---|
| Homepage | `/` | Tampa Kitchen Cabinets |
| Cabinet Painting | `/kitchen-cabinet-painting-tampa` | cabinet painting tampa |
| Cabinet Refacing | `/kitchen-cabinet-refacing-tampa` | cabinet refacing tampa |
| Custom Cabinets | `/custom-kitchen-cabinets-tampa` | custom kitchen cabinets tampa |
| Cabinet Installation | `/kitchen-cabinet-installation-tampa` | cabinet installation tampa |
| Kitchen Remodeling | `/kitchen-remodeling-tampa` | kitchen remodeling tampa |
| About | `/about` | — |
| Process | `/process` | — |
| Gallery | `/gallery` | — |
| Reviews | `/reviews` | — |
| Financing | `/financing` | Acorn Finance |
| Contact | `/contact` | — |
| Service Areas (hub) | `/service-areas` | — |
| Westchase / Carrollwood / South Tampa / New Tampa / Citrus Park / Brandon / Riverview | `/service-areas/<slug>` | local |
| Warranty, Site Map, Privacy, Terms, Cookie, Thank You, 404 | supporting | — |

All service pages: 900-990 words, process steps, pricing anchor, gallery, FAQ (schema), sticky mobile CTA + inline desktop form, cross-links to 2-3 other services. Area pages: 500-575 words, neighborhood facts, projects, FAQ, inline form, LocalBusiness+serviceArea schema.

---

## 3. PLACEHOLDERS — please fill in / confirm

These are the only things standing between this build and a fully live site. Most are one-line edits in **`src/data/site.json`** (or Sveltia CMS → Site Settings).

| # | Item | Where | Notes |
|---|---|---|---|
| 1 | **Tracked phone number** | `site.json` → `phoneDisplay`, `phoneE164` | Currently the reserved placeholder **(813) 555-0199**. Replace with the separate tracked line. Used site-wide. |
| 2 | **Contact email** | `site.json` → `email` | Currently `info@kitchencabinetsoftampa.com`. Confirm the real inbox. |
| 3 | **Business address** | `site.json` → `address` | Defaults to the shared HQ (8770 Huntfield St). Confirm or set a Tampa-facing address. |
| 4 | **GBP review count / rating** | `site.json` → `rating.count` | Set to `0` so **no AggregateRating schema is published yet** (avoids fake-review markup). Set the real count once the new GBP has reviews; the schema then appears automatically. |
| 5 | **Completed-projects number** | `site.json` → `projectsCompleted` (`"500+"`) and `src/data/home.json` stats | Confirm the figure you want to advertise. |
| 6 | **Social profiles** | `site.json` → `social.facebook/instagram/googleProfile` | Empty = hidden. Add when the TKC profiles exist. |
| 7 | **GA4 / GTM IDs** | `site.json` → `ga4Id`, `gtmId` | Empty = no analytics injected (keeps pages fast). Add IDs to enable. |
| 8 | **Lead webhook** | Cloudflare env `GHL_WEBHOOK_CONTACT` | The TKC CRM/GoHighLevel webhook (separate from Westchase). Forms tag every lead `source=tampa-kitchen-cabinets`. |
| 9 | **Google Places key** | Cloudflare env `GOOGLE_MAPS_API_KEY` | Optional; enables address autocomplete on the form. |
| 10 | **Team photos** | `/about` | Currently styled initials avatars. Drop real headshots in `public/` and swap in `src/pages/about.astro`. |
| 11 | **True "before" (old kitchen) photos** | before/after sliders | The supplied Drive photos are an **installation/finished** set, not old→new. Sliders are labeled honestly as **"During install → Finished."** Add real old-kitchen befores via CMS to make them classic before/afters. |
| 12 | **Painting & refacing before/afters** | those 2 service pages | They use finished-kitchen galleries (no paint/reface before-afters in the photo set). Add when available. |
| 13 | **Reviews content** | `src/data/reviews.json` | Seeded with **real parent-company (Westchase) reviews**, clearly attributed "via Westchase Painting Company." Replace/supplement with TKC GBP reviews. |
| 14 | **Warranty terms** | `src/pages/warranty.astro` | Sensible cabinet defaults (2-yr workmanship). Confirm against your signed contract language. |
| 15 | **OG image** | `public/og-image.png` | Auto-generated from a kitchen photo + brand text. Replace with a designed version if desired. |
| 16 | **Logo** | `src/components/Logo.astro` + `public/logo.png` | Inter-based wordmark lockup matching Westchase's type treatment. Swap for a professionally designed lockup anytime. |

---

## 4. Deploy to Cloudflare Pages → kitchencabinetsoftampa.com

1. **Create a Pages project** connected to the `covenantOS/Kitchen-Cabinets` GitHub repo.
   - Framework preset: **Astro**. Build command: `npm run build`. Output dir: `dist`.
   - `wrangler.toml` already sets `pages_build_output_dir = "./dist"` and `nodejs_compat`.
2. **Environment variables** (Pages → Settings → Variables): `GHL_WEBHOOK_CONTACT`, `GOOGLE_MAPS_API_KEY`.
3. **Custom domain:** add `kitchencabinetsoftampa.com` (apex) as the Pages custom domain.
   - Add `www.kitchencabinetsoftampa.com` and create a **Redirect Rule: www → apex (301)** (matches the Westchase convention; host redirects aren't done in `_redirects`).
4. **HTTPS / HSTS:** HTTPS is enforced by Cloudflare; HSTS is set via `public/_headers` (`Strict-Transport-Security` is emitted on every response). Enable "Always Use HTTPS" in the dashboard as a belt-and-suspenders.
5. `robots.txt` + auto-generated `sitemap-index.xml` are in place and reference the production domain.

> The Cloudflare account connection, DNS, and domain attachment are account-level actions outside this repo. Everything in code is ready for them.

---

## 5. Sveltia CMS (own content backend, separate from Westchase)

- Admin UI: **`/admin`** (`public/admin/index.html` + `public/admin/config.yml`).
- Backend: **GitHub**, repo `covenantOS/Kitchen-Cabinets`, branch `main` — **its own content backend** (not shared with Westchase).
- Editable: all 5 service pages, all 7 area pages, Site Settings, Homepage, Reviews, and Gallery.
- **One-time OAuth setup:** deploy the `sveltia-cms-auth` Cloudflare Worker (or a GitHub OAuth App) and set `backend.base_url` in `public/admin/config.yml`. Then editors log in with GitHub at `/admin`.

---

## 6. Performance / Lighthouse

Engineered for **95+ / LCP < 2s / CLS ~0**, to be confirmed against the deployed URL (Lighthouse needs a live origin):
- Fully static HTML (Astro `output: static`), served from Cloudflare's CDN.
- LCP hero is a preloaded, correctly-sized WebP; all other images are lazy-loaded WebP with `width`/`height` set (no layout shift) and responsive `srcset` (`-sm` 640w + full 1280w).
- AVIF generated for the hero + key homepage shots.
- Minimal JS (small inline islands only); **no third-party scripts load by default** (analytics is gated on real IDs).
- Self-hosted Inter (no external font request). Immutable cache headers on `/optimized`, `/gallery`, `/services`, `/areas`, `/_astro`.

**To run the audit after deploy:** `npx lighthouse https://kitchencabinetsoftampa.com --view` (run on `/`, a service page, and an area page).

---

## 7. Images

All imagery came from the provided Google Drive folder (Noble Tampa LLC → Service Line Database → Tampa Kitchen Cabinets), converted from HEIC/JPG to optimized WebP/AVIF and placed under `public/`. They are served via Cloudflare's CDN from `/public`. **Optional R2 migration:** upload `public/gallery|services|areas|optimized` to an R2 bucket and point a custom domain at it, then prefix image paths — the current `/public` delivery already runs on Cloudflare's edge, so this is an optional optimization, not a launch blocker.

> **Photo gap to flag:** the provided set has no dedicated quartz-countertop close-ups and no classic old-kitchen "before" shots. The Countertops page and the before/after sliders reuse finished-kitchen photos that show countertops, labeled honestly. Add quartz close-ups and true before photos when available.

---

## 8. Changelog — positioning & offer overhaul

Content/positioning overhaul on the existing stack (no rebuild, no stack change). Touched:

**New flagship offer (the centerpiece):** built the $20,000 complete-kitchen promo into `src/data/site.json` (`offer`), a reusable **`PromoBlock.astro`** (price panel + "what's included" / "what adds to your price" transparency + financing tie-in), shown on the homepage and on the Cabinets, Remodeling, and Countertops pages. Always phrased "starting at $20,000," never a bare flat price. Added a priced **Offer** to schema.

**Positioning fixed to semi-custom + fast + quartz-forward:**
- **Kitchen Cabinets** page (`custom-kitchen-cabinets-tampa`, URL kept): rewritten around semi-custom reality (3-inch increments 9–36", wood or white interiors), one-week-start timeline, 3D design / pre-visit video / in-home samples, the $20,000 offer, with full custom/solid-wood positioned as the premium upgrade. Nav/card label is now **Kitchen Cabinets**.
- **Kitchen Remodeling**: replaced the inflated "$25,000 to $75,000+" with realistic ranges + the promo; fixed the timeline to the real fast sequence; led with quartz and the scope/upsell ladder.
- **Countertops** (NEW page `/kitchen-countertops-tampa`): quartz-forward, ~5-day timeline, from ~$7,500, added to nav/footer/schema/sidebars.
- **Refacing / Installation / Painting**: kept for SEO, de-featured. **Cabinet Painting moved to last** everywhere. Voice scrubbed.
- New **`QuartzEducation.astro`** block (quartz over granite) on the homepage, Countertops, and Remodeling pages.
- **`HowItWorks.astro`** rebuilt around the real differentiators: pre-visit video, in-home measure with samples, photorealistic 3D design in about a day, fast install, walkthrough + warranty.

**Navigation:** Services reordered to Kitchen Cabinets → Kitchen Remodeling → Countertops → Cabinet Refacing → Cabinet Installation → Cabinet Painting (header + footer + page sidebars + homepage cards, all driven by `order`).

**Homepage:** hero rewritten to lead with "A complete new kitchen, starting at $20,000" (brand kept in the eyebrow, title tag, logo, and schema); offer/speed stat bar; PromoBlock; QuartzEducation; reordered service cards. Before/after, gallery, reviews, and service-area grid kept.

**Lead form:** project types reordered (Kitchen Remodel and New Cabinets first, Countertops added, Cabinet Painting last); added a **homeowner** qualifier (step 2) and a **budget range** qualifier (step 3, required); intro now references the $20,000 offer. Multi-step UX and `source=tampa-kitchen-cabinets` tagging preserved.

**Voice:** removed every banned construction ("custom is not just a nicer door," "more than," "seamless," em dashes) from user-facing copy. Pricing throughout now reflects the real model.

**Note on the homepage H1:** per your direction it now leads with the offer rather than the brand name. The exact "Tampa Kitchen Cabinets" string stays in the hero eyebrow, the `<title>`, the logo, the footer, and schema, so brand SEO is intact. Say the word if you'd rather the H1 itself carry the brand.

**One more placeholder for this overhaul:** an **estimator name** for the pre-visit-video copy (currently generic "your estimator" / "Will or Leandro"). Provide the name to personalize it.

---

## 9. Changelog — Phase 2: premium positioning & messaging

Messaging/positioning refinement on the same structure (no new page architecture).

- **Price is no longer the headline.** Hero now leads with "Your kitchen, transformed." Price reveals after desire. `$20,000` became **`$19,995`** everywhere (the only `$20,000` left are the contact form's budget-range boundaries). `$19,995` appears exactly 3 times in the visible homepage (hero, the offer block, the comparison table); the rest is head metadata/schema only. Browser-tab titles and the contact-form intro no longer lead with price.
- **PromoBlock reframed** to value-first ("Everything you need. One clear price. Zero surprises."), with the overage explanation ("each additional cabinet about $1,000") and a `$250/month` financing tie-in.
- **Premium material positioning:** aspirational quartz-over-granite copy; cabinetry led by outcomes ("precision-fit", "curated collection"), with the 3-inch-increment detail moved into FAQ; 5-day install framed as a perfected process, not rushing.
- **Westchase reframed as experience, not a parent.** Trust bar, hero, reviews, schema, and body copy now say "25+ years of Tampa Bay home transformation experience." Review attributions are "Tampa Bay homeowner." "A division of / sister company" removed from all user-facing copy (the legal entity remains in the footer copyright and legal pages).
- **New sections/components:** `ThreeWays` (Big Box vs. Custom Shop vs. us + comparison table), `FAQSection` (7 Q&As + FAQPage schema), `SampleSelections` (8 real cabinet door/finish samples pulled in and optimized to WebP) on home + cabinets + gallery, a "No Surprises" guarantee band, and gallery captions.
- **Process page** rewritten to a kitchen-remodel sequence (consultation → 3D design → approval → prep → install → countertop template → walkthrough). **Financing page** gained the "$250/month" callout and a monthly-payment examples table ($250 / $270 / $315). **Service-areas** and **about** reframed; **about** stat is now "home transformation expertise," not "finish craftsmanship."
- **Lead form:** project types reordered (Painting last), budget ranges now start at $15,000–$20,000 (no sub-$15K), plus the homeowner qualifier. Footer CTA is "Get Your Free 3D Design Consultation," no price.
- **Voice:** em dashes and the banned word/phrase list removed from all user-facing copy.

**New Phase-2 placeholders:** the 8 cabinet **sample images** are stock/representative door renders (swap for your real finishes when ready); the **5-day / 3D-design / 2020 Design / pre-visit-video** claims should match your actual operations before launch; gallery captions cover style and color only (add real cost/timeline/neighborhood when you have it); financing monthly figures are illustrative (84-month term) and should be confirmed with Acorn.

---

## 10. Changelog — Phase 3: research-backed conversion + SEO

Reverses the Phase-2 "desire-first" hero in favor of a quantified, keyword-led approach (per your competitor/keyword research and the audit of the live site).

- **Hero rewritten.** H1 is now **"New Kitchen Cabinets + Quartz Countertops, Installed in 5 Days"** with a bold **"Complete kitchens from $19,995, or $250/month"** line and a "5 days, not 5 months" subhead. CTA is "See My Kitchen in 3D, Free Consultation." Killed "Your kitchen, transformed."
- **Homepage title tag:** "Kitchen Cabinets Tampa | 5-Day Install, Quartz From $19,995" (dropped "Premium Kitchen Transformations," which targeted no query).
- **Information architecture:** the comparison table and the "price quoted is the price paid" guarantee now sit **immediately under the hero** (audit called them the best converting elements, previously buried). Stat bar leads with 5 days / $19,995 / 3D / $250-mo.
- **Specificity pass:** "why us" cards rebuilt to plywood-vs-particle-board (dovetail, soft-close, 20-30 yr), "5 days not 5 months" (vs 6-12 week standard), "see it in 3D first" (61% regret a layout), and "the price quoted is the price paid." PromoBlock heading is now "17 cabinets, quartz countertops, and installation."
- **Banned-word scrub** sitewide: removed every "transformed / transformation(s) / premium (vague) / vision / curated / elevate / reimagine / bespoke" from copy (one authentic customer review keeps the word "premium").
- **`/pricing` page created** (was a 404), targeting "kitchen remodel cost tampa": published tiers (painting from $3,500, refacing $4k-$10k, complete kitchen from $19,995, backsplash ~$1,500, flooring ~$3,750, custom upgrade 2-3x), the $19,995 breakdown, a competitor anchor, and financing. Linked in nav, footer, and sitemap.
- **URL redirects added** so the research doc's suggested URLs resolve to the existing keyword-exact pages: `/kitchen-cabinets`, `/cabinet-refacing`, `/kitchen-remodeling`, `/countertops`, `/cabinet-painting`, `/cabinet-installation`, `/semi-custom-cabinets-tampa`, `/areas-served/*`, and `/services` (no duplicate `/services` page exists).
- **Real cabinet sample photos** (the 8 you provided) replace the prior renders in "Explore our selections."

**Still outstanding (need real data, not safe to fabricate):** a displayed **GC license number**; a **named warranty** with terms; a real **project/review count** and a **clickable, verified Google Business Profile** link (the "5.0" claim was removed from the trust bar rather than left unverified); and the P2 SEO content (blog posts like "Kitchen Remodel Cost Tampa," plus Clearwater / St. Petersburg / Hyde Park area pages). Send those and I will wire them in. The 5-day / 3D / 2020 Design / pre-visit-video claims are stated as fact, so confirm they match operations.
