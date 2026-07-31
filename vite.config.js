import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
  return {
    // Relative assets work both under /tresnak/ on the web and in Capacitor.
    // This also keeps Android bootable if a regular web build is copied.
    base: './',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      // Keep route styles in the entry stylesheet. This avoids a cached app shell
      // rendering a newly loaded view before (or without) its async CSS chunk,
      // which is especially visible in the Capacitor WebView.
      cssCodeSplit: false,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('apexcharts')) {
                return 'vendor-apexcharts'
              }
              if (id.includes('vue') || id.includes('vue-router')) {
                return 'vendor-vue'
              }
              if (id.includes('date-fns') || id.includes('lucide-vue-next')) {
                return 'vendor-utils'
              }
              return 'vendor'
            }
            if (id.includes('src/data/aditzak.json') || id.includes('src/data/esaldiak.json')) {
              return 'data-aditzak'
            }
            if (id.includes('src/data/hiztegia.json') || id.includes('src/data/lexiko.json')) {
              return 'data-hiztegia'
            }
          }
        }
      }
    }
  }
})
