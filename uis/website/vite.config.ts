import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { seo } from './vite-plugins/seo.ts'

// https://vite.dev/config/
// Web multipágina: la landing (index.html) y el formulario de solicitud (application.html).
export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        application: resolve(import.meta.dirname, 'application.html'),
      },
    },
  },
})
