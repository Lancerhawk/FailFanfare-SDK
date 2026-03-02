/// <reference types="node" />
import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";

export default defineConfig([
  // ── 1. Browser main entry: ESM + CJS + IIFE ─────────────────────────────
  {
    entry: { index: "src/browser/index.ts" },
    format: ["esm", "cjs", "iife"],
    globalName: "FailFanfare",
    outDir: "dist",
    dts: true,
    sourcemap: true,
    clean: true,
    target: "es2017",
    platform: "browser",
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

  // ── 2. Framework adapters: ESM + CJS only ────────────────────────────────
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
    platform: "browser",
    loader: { ".mp3": "base64" },
    outExtension({ format }) {
      return { js: format === "cjs" ? ".cjs" : ".js" };
    },
    external: ["react", "vue", "@angular/core"],
  },

  // ── 3. CLI entry: CJS only, Node platform ────────────────────────────────
  {
    entry: { "cli/index": "src/cli/index.ts" },
    format: ["cjs"],
    outDir: "dist",
    dts: false,
    sourcemap: false,
    target: "node18",
    platform: "node",
    outExtension() {
      return { js: ".cjs" };
    },
    banner: {
      js: "#!/usr/bin/env node",
    },
    onSuccess: async () => {
      const root = process.cwd();
      const srcSounds = join(root, "src/sounds");
      const distSounds = join(root, "dist/sounds");
      mkdirSync(distSounds, { recursive: true });
      const files = readdirSync(srcSounds).filter((f: string) =>
        f.endsWith(".mp3")
      );
      for (const file of files) {
        copyFileSync(join(srcSounds, file), join(distSounds, file));
      }
      console.log(
        `[failfanfare] Copied ${files.length} sounds to dist/sounds/`
      );
    },
  },
]);
