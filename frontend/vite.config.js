import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: false
    }
  },
});
