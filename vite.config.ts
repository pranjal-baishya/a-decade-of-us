import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves the site under /a-decade-of-us/ (project Pages).
// We only switch the base when building inside the GH Actions workflow
// (it sets GITHUB_PAGES=true). Local dev and Vercel deploys stay at '/'.
const isGhPages = process.env.GITHUB_PAGES === 'true'
const base = isGhPages ? '/a-decade-of-us/' : '/'

export default defineConfig({
  base,
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'audio/**', 'memories/**', 'assets/**', 'backgrounds/**'],
      manifest: {
        name: 'A Decade of Us',
        short_name: 'A Decade of Us',
        description: 'And somehow, we\'re still just getting started.',
        theme_color: '#0a0b14',
        background_color: '#0a0806',
        display: 'standalone',
        orientation: 'portrait',
        // Relative paths so they respect Vite's base config
        start_url: '.',
        scope: base,
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Photos served from /public/assets/ and /public/memories/ —
            // matched whether or not the GH Pages base prefix is present.
            urlPattern: /\/(assets|memories|backgrounds)\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'photos-cache',
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) {
            return 'react-vendor'
          }
          if (id.includes('framer-motion') || id.includes('gsap')) {
            return 'animation-vendor'
          }
        },
      },
    },
    target: 'es2020',
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
