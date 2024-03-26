import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.BASE_URL": JSON.stringify(env.BASE_URL),
      "process.env.SHINHAN_BASE_URL": JSON.stringify(env.SHINHAN_BASE_URL),
      "process.env.SHINHAN_APP_KEY": JSON.stringify(env.SHINHAN_APP_KEY),
    },
    plugins: [react()],
    server: {
      proxy: {
        "/openapi": env.SHINHAN_BASE_URL,
      },
    },
  };
});
