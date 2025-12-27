import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["packages/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["packages/*/src/**/*.ts"],
      exclude: [
        "packages/*/src/**/*.test.ts",
        "packages/*/src/**/*.spec.ts",
        "packages/*/src/test-utils/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@claude-cnthub/shared": resolve(__dirname, "./packages/shared/src"),
      "@claude-cnthub/api": resolve(__dirname, "./packages/api/src"),
    },
  },
});
