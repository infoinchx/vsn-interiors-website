import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  base: "./",
  plugins: [vue()],
  esbuild: { legalComments: "none" },
  build: { rollupOptions: { output: { manualChunks: { three: ["three"] } } } },
});
