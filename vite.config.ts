import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
  },
  base: mode === "production" ? "/GamerChallengeFront/" : "./",
  server: {
    port: 3000,
  },
}))
