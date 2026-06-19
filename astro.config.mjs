// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs, the sitemap, and absolute OG image URLs.
  // Launch URL (Vercel). When a custom domain is connected, change it here AND
  // in src/consts.ts (SITE.url), then re-run `npm run og`.
  site: 'https://raremark-studios.vercel.app',
  integrations: [mdx(), sitemap()],
  vite: {
    // Cast to any: @tailwindcss/vite is typed against its own nested Vite copy,
    // which trips `astro check`'s dual-Vite type comparison. Harmless at runtime.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
  // Static output (default). Deploys to Vercel / Cloudflare Pages with no adapter.
  output: 'static',
  build: {
    // Emit /privacy/index.html instead of /privacy.html so URLs work
    // identically on Vercel and Cloudflare Pages.
    format: 'directory',
  },
});
