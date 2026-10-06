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
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          seo: ['react-helmet-async'],
        },
      },
    },
  },
});
