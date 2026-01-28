import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  test: {
    include: ['./**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    alias: {
      "@ecm": path.resolve(__dirname, 'packages/ecm/src'),
    }
  },
})
