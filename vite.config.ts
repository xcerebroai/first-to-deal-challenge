import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Single-file build: `npm run build` emits ONE self-contained dist/index.html
// (all CSS/JS + images inlined). Base-agnostic, so it works at any URL —
// GitHub Pages project site, custom domain, or pasted into a GHL custom-code
// block — with no base-path configuration.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    // Raise the inline limit so the hero/host images embed as data URIs.
    assetsInlineLimit: 4 * 1024 * 1024,
  },
})
