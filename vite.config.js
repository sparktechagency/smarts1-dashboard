import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3001,
  },
  preview: {
    host: "0.0.0.0",
    port: 3001,
    strictPort: true, // optional: fail instead of falling back if 3001 is taken
  },
});
