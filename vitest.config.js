import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

// Separate Vitest config (kept apart from vite.config.js to avoid pulling the
// full Base44 build plugin, HMR/analytics notifiers, etc. into the unit-test
// run). Mirrors the same "@/*" -> "src/*" alias used by the app.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.js"],
    css: true,
  },
});
