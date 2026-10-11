import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    watch: {
      // Wait until a file has stopped changing before reloading. Without this,
      // the watcher can read a file mid-write and cache a truncated module —
      // which surfaces as "does not provide an export named 'default'" and a
      // blank page that only a server restart clears.
      awaitWriteFinish: {
        stabilityThreshold: 150,
        pollInterval: 20,
      },
    },
  },
})
