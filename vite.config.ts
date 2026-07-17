import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isPages = process.env.GITHUB_ACTIONS === 'true'
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''

export default defineConfig({
  base: isPages ? `/${repo}/` : '/',
  plugins: [react()],
})
