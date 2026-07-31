import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/tresnak/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
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
})