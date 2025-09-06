import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const URL = 'http://localhost:3001'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
