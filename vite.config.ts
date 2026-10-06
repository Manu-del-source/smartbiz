import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';
import vitePrerender from 'vite-plugin-prerender';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
    vitePrerender({
      staticDir: path.join(process.cwd(), 'dist'),
      routes: ['/', '/services', '/work', '/about', '/process', '/pricing', '/faq', '/contact', '/404'],
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
