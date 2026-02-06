
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base: './' asegura que las rutas de assets sean relativas al index.html
  base: './',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  }
});
