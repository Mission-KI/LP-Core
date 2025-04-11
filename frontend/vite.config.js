import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    eslint({
      include: ["src/**/*.js", "src/**/*.jsx"],
      emitWarning: true,
      emitError: true,
    }),
  ],
  server: {
    port: 3001,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: true,
    },
  },
});
