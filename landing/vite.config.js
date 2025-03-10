import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr' 

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: false
    }
  },
});
