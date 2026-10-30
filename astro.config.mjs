import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Statische site (fase 0). Hosting later op Cloudflare Workers static assets (B-030); niets live zonder akkoord.
export default defineConfig({
  site: 'https://tinkpop.com',
  integrations: [react()],
  // De privé-proefversie (tools/artifact-preview) mag geen map met '_' gebruiken.
  build: { assets: process.env.PUBLIC_ARTIFACT === '1' ? 'assets' : '_astro' },
  vite: { worker: { format: 'es' }, optimizeDeps: { exclude: ['manifold-3d'] } },
});
