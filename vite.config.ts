import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src", "index.ts"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["reduce-function-call", "postcss"],
      output: {
        interop: false,
      },
    },
  },
});
