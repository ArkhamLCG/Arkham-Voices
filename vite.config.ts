import favicons from "@peterek/vite-plugin-favicons";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub project page: https://<owner>.github.io/<repo>/
const repoName = process.env.GITHUB_REPOSITORY?.split("/").at(-1);
const base = process.env.GITHUB_ACTIONS === "true" && repoName ? `/${repoName}/` : "/";

export default defineConfig({
  base,
  plugins: [react(), favicons("src/assets/favicon.svg")],
  resolve: {
    alias: {
      "@app": "/src/slices/app",
      "@pages": "/src/slices/pages",
      "@widgets": "/src/slices/widgets",
      "@features": "/src/slices/features",
      "@entities": "/src/slices/entities",
      "@shared": "/src/slices/shared",
    },
  },
});
