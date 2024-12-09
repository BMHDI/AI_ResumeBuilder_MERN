import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://ai-resumebuilder-mern.onrender.com", // Backend server address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: remove '/api' prefix
      },
    },
  },
});
