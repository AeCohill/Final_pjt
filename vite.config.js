import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: "/Final_pjt/",
  resolve: {
    alias: {
      '@components': '/src/components',
      '@': path.resolve(__dirname, 'src')
    }
  }
});