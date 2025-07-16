import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // 'any' to bypass a type conflict between Vite and Vitest.
  // This is a temporary workaround until the types are aligned in a future update.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [react() as any],
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
      config: path.resolve(__dirname, "config"),
    },
  },
});
