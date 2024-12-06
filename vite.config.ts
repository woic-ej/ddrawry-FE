import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), "");

  const isLocal = mode === "development";

  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        plugins: [
          visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
          }),
        ],
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
          },
        },
      },
    },
    resolve: {
      alias: [
        { find: "@components", replacement: path.resolve(__dirname, "src/components") },
        { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
        { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
        { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
        { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
        { find: "@store", replacement: path.resolve(__dirname, "src/store") },
        { find: "@api", replacement: path.resolve(__dirname, "src/api") },
        { find: "@constants", replacement: path.resolve(__dirname, "src/constants") },
      ],
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
      ...(isLocal && {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
          cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
        },
      }),
    },
  };
});
