import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Reusable sub-schemas -------------------------------------------------------
const faqItem = z.object({ q: z.string(), a: z.string() });
const processStep = z.object({ title: z.string(), description: z.string() });
const galleryItem = z.object({ src: z.string(), alt: z.string(), label: z.string().optional() });
const beforeAfter = z.object({
  before: z.string(),
  after: z.string(),
  beforeAlt: z.string(),
  afterAlt: z.string(),
  caption: z.string().optional(),
});

// SERVICE PAGES — flat SEO landing pages (e.g. /kitchen-cabinet-painting-tampa)
// The markdown body is the 800–1200 word article; everything else is frontmatter.
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),              // H1 — must contain exact-match primary keyword
    shortName: z.string(),          // nav / card label, e.g. "Cabinet Painting"
    pageTitle: z.string(),          // <title>
    description: z.string(),        // meta description
    breadcrumb: z.string(),
    heroSubtitle: z.string(),
    heroImage: z.string(),          // /public path
    order: z.number().default(99),
    cardDescription: z.string(),    // homepage service-grid blurb
    cardImage: z.string().optional(),
    priceAnchor: z.string().optional(),   // "Starting at $X per linear foot"
    keywords: z.array(z.string()).default([]),
    process: z.array(processStep).default([]),
    faqItems: z.array(faqItem).default([]),
    gallery: z.array(galleryItem).default([]),
    beforeAfter: z.array(beforeAfter).default([]),
    related: z.array(z.string()).default([]),  // slugs of 2–3 related services
    draft: z.boolean().default(false),
  }),
});

// SERVICE AREA PAGES — /service-areas/<slug>
const areas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/areas' }),
  schema: z.object({
    title: z.string(),              // H1 — "Kitchen Cabinets in <Neighborhood>, Tampa"
    neighborhood: z.string(),       // display name, e.g. "Westchase"
    pageTitle: z.string(),
    description: z.string(),
    heroImage: z.string(),
    order: z.number().default(99),
    intro: z.string(),              // short lede under the H1
    zips: z.array(z.string()).default([]),
    landmarks: z.array(z.string()).default([]),
    medianHome: z.string().optional(),
    typicalKitchens: z.string().optional(),
    projects: z.array(processStep).default([]),   // {title, description}
    gallery: z.array(galleryItem).default([]),
    faqItems: z.array(faqItem).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { services, areas };
