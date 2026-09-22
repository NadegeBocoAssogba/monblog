import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
   resolve: {
    // Active la lecture automatique de vos alias du tsconfig.json
    tsconfigPaths: true, 
  },
  test: {
    environment: 'jsdom', // Indispensable pour simuler le navigateur avec Next.js
  },
})