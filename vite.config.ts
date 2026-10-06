import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: path.resolve(rootDir, 'src/prerender.tsx'),
      additionalPrerenderRoutes: ['/services', '/work', '/about', '/process', '/pricing', '/faq', '/contact', '/404'],
    }),
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) return 'react-vendor';
          if (id.includes('node_modules/framer-motion')) return 'motion-vendor';
          if (id.includes('node_modules/react-helmet-async')) return 'seo-vendor';
        },
      },
    },
  },
});
