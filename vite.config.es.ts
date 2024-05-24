import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { readdirSync } from "fs";
import { filter, map } from "lodash-es";
import { resolve } from "path";

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  )
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      outDir: 'dist/types'
    })
  ],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SpUi",
      fileName: "sp-ui",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["vue", "lodash-es", "axios", "uuid"],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }
          return chunkInfo.name as string;
        },
        manualChunks(id) {
          if(id.includes("node_modules")) {
            return "vendor"
          }
          if (id.includes("hooks")) {
            return "hooks";
          }
          if (id.includes("utils")) {
            return "utils";
          }
          for(const dirName of getDirectoriesSync('./src/components')) {
            if(id.includes(`/packages/components/${dirName}`)) {
              return dirName;
            }
          }
        }
      }
    }
  }
});
