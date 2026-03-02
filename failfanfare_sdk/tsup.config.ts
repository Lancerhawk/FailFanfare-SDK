import { defineConfig } from "tsup";

export default defineConfig([
  // ─── Main entry: ESM + CJS + IIFE ─────────────────────────────────────────
  {
    entry: { index: "src/index.ts" },
    format: ["esm", "cjs", "iife"],
    globalName: "FailFanfare",
    outDir: "dist",
    dts: true,
    sourcemap: true,
    clean: true,
    target: "es2017",
    loader: { ".mp3": "base64" },
    outExtension({ format }) {
      if (format === "cjs") return { js: ".cjs" };
      if (format === "iife") return { js: ".global.js" };
      return { js: ".js" };
    },
    esbuildOptions(options, context) {
      if (context.format === "iife") {
        options.minify = true;
      }
    },
  },

  // ─── Framework adapters: ESM + CJS only (no IIFE globals) ─────────────────
  // Adapters import from "../index" at runtime. We bundle them independently
  // (each includes the core) which is acceptable for a dev-only SDK.
  // Since this is dev-only, the bundle size trade-off is fine.
  {
    entry: {
      "adapters/react": "src/adapters/react.ts",
      "adapters/vue": "src/adapters/vue.ts",
      "adapters/angular": "src/adapters/angular.ts",
    },
    format: ["esm", "cjs"],
    outDir: "dist",
    dts: true,
    sourcemap: true,
    target: "es2017",
    loader: { ".mp3": "base64" },
    outExtension({ format }) {
      return { js: format === "cjs" ? ".cjs" : ".js" };
    },
    // Keep framework peer deps external — do NOT bundle React/Vue/Angular
    external: ["react", "vue", "@angular/core"],
  },
]);
