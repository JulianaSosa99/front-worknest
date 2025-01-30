import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // URL del backend (Gestor de Citas)
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Opcional: elimina el prefijo `/api` si no lo usas en tu backend
      },
    },
  },
});
