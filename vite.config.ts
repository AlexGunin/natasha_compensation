import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log("ENV", env);

  return {
    plugins: [react()],
    base: "/natasha_compensation/",
    define: {
      "process.env": env,
    },
  };
});
