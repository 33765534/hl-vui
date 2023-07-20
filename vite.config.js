import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: "modules",
    //打包文件目录
    outDir: "lib",
    //压缩
    minify: true,
  },
});
