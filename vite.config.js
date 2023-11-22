import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { babel } from "@rollup/plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: ["@babel/preset-react"],
      extensions: [".jsx"],
      babelHelpers: "bundled",
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
