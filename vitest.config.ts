import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      exclude: ['src/main.tsx', '*.config.*', 'src/vite-env.d.ts'],
    },
  },
})