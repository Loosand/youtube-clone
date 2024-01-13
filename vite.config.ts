import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { join } from 'path'
import bundleAnalyzer from 'rollup-plugin-bundle-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), bundleAnalyzer({ analyzerMode: 'static' })],
  resolve: {
    alias: {
      '@': join(__dirname, './src/'),
    },
  },
})
