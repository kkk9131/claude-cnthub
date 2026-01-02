import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  // Viewer UI は /viewer/ パスで配信されるため base を設定
  base: "/viewer/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@claude-cnthub/shared": path.resolve(__dirname, "../shared/src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3048",
        changeOrigin: true,
      },
      "/socket.io": {
        target: "http://localhost:3048",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  build: {
    // plugin/ui に出力 (R-10: Viewer UI 統合方式)
    outDir: "../../plugin/ui",
    emptyOutDir: true,
    sourcemap: true,
  },
});
