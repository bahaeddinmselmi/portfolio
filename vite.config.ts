import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // Replace 'portfolio' with your repository name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
