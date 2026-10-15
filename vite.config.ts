import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative asset URLs work both locally and under the GitHub Pages repository path.
  base: './',
  plugins: [react()],
})
