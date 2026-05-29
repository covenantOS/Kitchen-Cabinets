# Tampa Kitchen Cabinets

Marketing site for **Tampa Kitchen Cabinets**, a division of **Westchase Painting Company LLC**.
Sister brand of [westchasepainting.com](https://westchasepainting.com) — same design system, team, and
stack; cabinet/kitchen brand and keyword focus.

- **Live:** https://kitchencabinetsoftampa.com
- **Stack:** Astro 5 · Tailwind 3 · Cloudflare Pages + Pages Functions · Sveltia CMS
- **Design system:** identical color tokens (navy `#1a2b4a` / gold `#c9a227`), Inter typography, and
  component library as Westchase Painting.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # serve the built site via wrangler
```

## Structure

```
src/
  data/            site.json, home.json, reviews.json, gallery.json   (CMS-editable JSON)
  content/
    services/      5 service landing pages (markdown + frontmatter)
    areas/         7 service-area pages
  components/      design-system components (Logo, Header, Footer, ContactForm, BeforeAfterSlider, ...)
  layouts/         BaseLayout, ServicePageLayout, AreaPageLayout
  pages/           routes (flat service routes, /service-areas/*, and singletons)
  lib/site.ts      typed accessor over src/data/site.json (single source of truth)
functions/api/     Cloudflare Pages Functions (contact, exit-intent, places-autocomplete)
public/            optimized images (WebP/AVIF), favicon, og-image, robots.txt, _headers, _redirects
public/admin/      Sveltia CMS (config.yml + index.html)
```

## Content & settings

All business info lives in `src/data/site.json` (phone, email, address, ratings, tagline, attribution,
analytics IDs). Page/area content lives in `src/content/`. Everything is editable through Sveltia CMS at
`/admin`.

See **DELIVERABLES.md** for the placeholder checklist, deploy steps, CMS OAuth setup, and Lighthouse notes.
