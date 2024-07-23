import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Ou o IP específico que você deseja usar
    port: '5173',       // Porta que o Vite usará
    strictPort: true  // Garantir que a porta será usada, se disponível
  }
})
