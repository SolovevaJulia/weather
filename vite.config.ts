import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/weather/',
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
