import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    eslint({
      include: ["src/**/*.js", "src/**/*.jsx"],
      emitWarning: true,
      emitError: true,
    }),
  ],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: true,
    },
  },
});
