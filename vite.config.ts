import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: process.env.VITE_BASE_PATH || "/deploy_react_app_github_pages_vercel",
  base: process.env.VITE_BASE_PATH || "/",
});
