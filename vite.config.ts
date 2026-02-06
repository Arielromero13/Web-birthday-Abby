
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // CRÍTICO: Asegura rutas relativas para deployment en cualquier carpeta
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  }
});
