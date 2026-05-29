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
