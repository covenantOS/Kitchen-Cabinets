import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://kitchencabinetsoftampa.com',
  output: 'static',
  adapter: cloudflare({ imageService: 'passthrough' }),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      // Keep noindex / utility pages out of the sitemap.
      filter: (page) => !/\/(thank-you|404|privacy-policy|terms|cookie-policy)\/?$/.test(page),
    }),
  ],
  // Cloudflare Pages doesn't support sharp at runtime; assets in /public are already optimized.
  image: { service: passthroughImageService() },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
