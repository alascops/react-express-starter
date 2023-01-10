import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
     react()
  ],
  resolve: {
    alias: [
        { find: "@sourceroot", replacement: resolve(__dirname, "src") },
        { find: "@apis", replacement: resolve(__dirname, "src/features/apis") },
        { find: "@components", replacement: resolve(__dirname, "src/components") },
        { find: "@config", replacement: resolve(__dirname, "src/config") },
        { find: "@pages", replacement: resolve(__dirname, "src/pages") },
        { find: "@stores", replacement: resolve(__dirname, "src/features/stores") }
    ]
  }
})

