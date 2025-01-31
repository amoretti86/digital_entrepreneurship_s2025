import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],  // Explicitly resolve .jsx files
  }
})
