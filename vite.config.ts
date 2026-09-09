import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Allow the local dev/preview servers to be embedded behind proxy hosts
  // (has no effect on the statically deployed production build).
  server: { allowedHosts: true },
  preview: { allowedHosts: true },
})
