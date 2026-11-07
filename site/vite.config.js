import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// The dashboard reads ../src/data/*.json and ../scripts/audit.mjs at build time, so every number is generated, never typed.
// It is served next to the Next.js product, at /GDGUNFCSOLUTIONCHALLANGE2026/dashboard/ (see .github/workflows/pages.yml).
export default defineConfig({
  base: '/GDGUNFCSOLUTIONCHALLANGE2026/dashboard/',
  plugins: [react()],
  server: { fs: { allow: ['..'] } },
});
