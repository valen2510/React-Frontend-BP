import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      features: "/src/features",
      components: "/src/components",
      assets: "/src/assets",
      routes: "/src/routes",
      services: "/src/services",
      utils: "/src/utils",
    },
  },
});
