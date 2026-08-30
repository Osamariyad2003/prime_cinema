import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Vite's default port (5173) is used deliberately — the backend's CORS allowlist only
  // permits http://localhost:5173, http://localhost:3000, and the production GitHub Pages
  // origin. Overriding this port (it was previously pinned to 9000) breaks every API call
  // in local dev with a silent "Failed to fetch" (CORS-blocked, no error detail in the
  // browser console — verified by comparing curl responses with/without a matching Origin
  // header).
  base: '/prime_cinema/', // Always use this base
})
