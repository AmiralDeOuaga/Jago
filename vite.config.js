import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'
import path from 'path'

function removeCrossorigin() {
  return {
    name: 'remove-crossorigin',
    transformIndexHtml(html) {
      return html
        .replace(/ crossorigin="[^"]*"/g, '')
        .replace(/ crossorigin/g, '');
    }
  };
}

export default defineConfig({
  base: './',
  build: {
    target: 'es2015',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      }
    }
  },
  plugins: [
    react(),
    removeCrossorigin(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      selfDestroying: false,
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Jago - Marketplace UEMOA',
        short_name: 'Jago',
        description: 'Achète et vends facilement dans toute la zone UEMOA',
        theme_color: '#0A2463',
        background_color: '#080C14',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'fr',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            // Cache les images Cloudinary
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-images',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
    {
      name: 'static-html-files',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = (req.url || '').split('?')[0].split('#')[0]
          if (url.endsWith('.html') && url !== '/index.html') {
            const candidate = path.resolve(process.cwd(), 'public' + url)
            if (fs.existsSync(candidate)) {
              const content = fs.readFileSync(candidate, 'utf-8')
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.end(content)
              return
            }
          }
          next()
        })
      },
    },
  ],
})
