import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 8000,
    proxy: {
      '/auth':"http://localhost:8001/",
      '/api':"http://localhost:8001/"
    }
  },
})
