import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const pathResolve = (dir:string) => {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/poster/" : "./",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': pathResolve('src')
    }
  },
  // server: {
  //   port: 4000,
  //   proxy: {
  //     '/api': {
  //       target: 'http://127.0.0.1:3000'
  //     }
  //   }
  // },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables";`,
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1500
  }
})
