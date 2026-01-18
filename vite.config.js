import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // サブディレクトリにデプロイする場合のベースパス
  base: '/app/',
})
