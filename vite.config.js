import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mtk-ui-dom-test/",
  plugins: [vue()],
  build: {
    outDir: "build",
  },
});
