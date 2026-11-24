import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Strict Content-Security-Policy, injected into production builds only
// (the dev server needs inline scripts for hot reload).
// Everything is served from this origin: no CDNs, no analytics, no third-party requests.
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = (): Plugin => ({
  name: 'inject-security-meta',
  apply: 'build',
  transformIndexHtml: () => [
    { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: csp }, injectTo: 'head-prepend' },
    { tag: 'meta', attrs: { name: 'referrer', content: 'strict-origin-when-cross-origin' }, injectTo: 'head-prepend' },
  ],
})

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), securityHeaders()],
  // Never inline assets as data: URIs, so the CSP above can stay strict
  build: { sourcemap: false, assetsInlineLimit: 0 },
})
