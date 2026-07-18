import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MySalonApp/',
  plugins: [react()],
  server: {
    middlewareMode: true,
  },
  preview: {
    middlewareMode: true,
  },
})
