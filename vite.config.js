import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: "10.10.7.102",
  //   port: 5000,
  // },
});
