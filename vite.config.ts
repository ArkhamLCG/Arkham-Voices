import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// GitHub project page: https://<owner>.github.io/<repo>/
const repoName = process.env.GH_REPOSITORY?.split("/").at(-1);
const base = process.env.GH_ACTIONS === "true" && repoName ? `/${repoName}/` : "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    process.env.ANALYZE === "true"
      ? [
          visualizer({
            filename: "dist/stats.html",
            template: "treemap",
            gzipSize: true,
            brotliSize: true,
            sourcemap: true,
            open: false,
          }),
          visualizer({
            filename: "dist/stats.json",
            template: "raw-data",
            gzipSize: true,
            brotliSize: true,
            sourcemap: true,
            open: false,
          }),
        ]
      : undefined,
  ].filter(Boolean),
  build: {
    sourcemap: process.env.ANALYZE === "true",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/") ||
            id.includes("/node_modules/use-sync-external-store/")
          ) {
            return "react-vendor";
          }

          if (
            id.includes("/node_modules/@mui/") ||
            id.includes("/node_modules/@emotion/") ||
            id.includes("/node_modules/stylis/") ||
            id.includes("/node_modules/react-transition-group/")
          ) {
            return "mui-vendor";
          }

          if (id.includes("/node_modules/i18next/") || id.includes("/node_modules/react-i18next/")) {
            return "i18n-vendor";
          }

          if (id.includes("/node_modules/ramda/") || id.includes("/node_modules/wouter/")) {
            return "vendor";
          }
        },
      },
    },
  },
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
