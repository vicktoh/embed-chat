import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
// https://vitejs.dev/config/
export default ({ mode}) => {
  // @ts-ignore;
  process.env = {...process.env, ... loadEnv(mode, process.cwd())}
  return defineConfig({
    server: {
      port: 3006
    },
    plugins: [react(), cssInjectedByJsPlugin()],
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        input: {
          app: "./src/main.tsx",
        },
        output:{
          assetFileNames:"assets/chat-widget.js"
        }
      }
    }
  })
}
