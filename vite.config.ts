import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
