import { join } from 'path'

import react from '@vitejs/plugin-react-swc'
import bundleAnalyzer from 'rollup-plugin-bundle-analyzer'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), bundleAnalyzer({ analyzerMode: 'static' })],
  resolve: {
    alias: {
      '@': join(__dirname, './src/'),
    },
  },
})
