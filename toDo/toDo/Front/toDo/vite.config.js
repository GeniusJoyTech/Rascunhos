import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.0.24',  // Isso permite que qualquer dispositivo na rede acesse seu servidor
    port: 5173,        // Defina a porta (se necessário)
  }
})
