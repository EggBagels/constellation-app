// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: { host: "::", port: 8080 },
  plugins: [react()],
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
});

