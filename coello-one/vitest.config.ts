import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["app/**/*.test.tsx"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
      "@components": path.resolve(__dirname, "app/components"),
      "@public": path.resolve(__dirname, "public"),
      "@utils": path.resolve(__dirname, "utils"),
    },
  },
});
