import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',      // Cho phép truy cập từ ngoài container
    port: 5173,           // Vẫn giữ nguyên vì đã map ra ngoài bằng Docker
  }
})
