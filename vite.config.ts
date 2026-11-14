import { defineConfig } from 'vitest/config';

// Relativer Basis-Pfad, damit der Build auf jedem statischen Hoster läuft.
export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1200,
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
