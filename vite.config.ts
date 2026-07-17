/// <reference types="vitest/config" />
import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path, { isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";
import type { Plugin } from "vite";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const root = import.meta.dirname;
const src = resolve(root, "src");

/** Recursively collect `.ts`/`.tsx` source files under a directory (skipping declarations). */
function collect(dir: string): string[] {
  return readdirSync(join(src, dir), {
    withFileTypes: true,
  }).flatMap((entry) => {
    const rel = join(dir, entry.name);
    if (entry.isDirectory()) return collect(rel);
    if (/\.tsx?$/.test(entry.name) && !entry.name.endsWith(".d.ts")) return [rel];
    return [];
  });
}

/**
 * One build entry per subpath declared in package.json "exports". Entry keys mirror the
 * source layout, so a file lands at `dist/<key>.{js,cjs}` with matching `.d.ts`:
 *  - the barrel (`.`) and the types-only entry (`./types`)
 *  - the compiled stylesheet (`./styles.css`, processed by @tailwindcss/vite)
 *  - every UI component, composite component, shared style, hook, and lib util
 */
const sourceEntries = Object.fromEntries(
  ["components/ui", "components/composite", "components/shared", "hooks", "lib"].flatMap((dir) =>
    collect(dir).map((file) => [file.replace(/\.tsx?$/, ""), resolve(src, file)] as const),
  ),
);
const entries = {
  index: resolve(src, "index.ts"),
  "types/index": resolve(src, "types/index.ts"),
  styles: resolve(src, "styles.ts"),
  ...sourceEntries,
};

/**
 * Copy the raw stylesheets so consumers can import them unprocessed
 * (`./styles/*.css`) and use them as a base for theming.
 */
function copyRawStyles(): Plugin {
  return {
    name: "copy-raw-styles",
    closeBundle() {
      cpSync(resolve(src, "styles"), resolve(root, "dist/styles"), {
        recursive: true,
      });
    },
  };
}

/**
 * The emitted `.d.ts` files use relative specifiers that don't resolve under Node's ESM
 * ("nodenext") algorithm: extensionless imports (`from './chart'`), source-style extensions
 * (`from './avatar.tsx'`), and directory imports (`from '../../types'`). The runtime JS is
 * already correct, so rewrite each declaration specifier to point at the real emitted file
 * (`./chart.js`, `../../types/index.js`, …) so type resolution matches and passes
 * `@arethetypeswrong/cli`.
 */
function fixDtsExtensions(): Plugin {
  // Resolve a relative specifier against the file's directory to the actual emitted output.
  const resolveSpec = (fileDir: string, spec: string): string | null => {
    const base = spec.replace(/\.(tsx?|jsx?|mjs|cjs)$/, "");
    const abs = resolve(fileDir, base);
    if (existsSync(`${abs}.d.ts`)) return `${base}.js`; // sibling module -> ./x.js
    if (existsSync(join(abs, "index.d.ts"))) return `${base}/index.js`; // directory -> ./x/index.js
    return null; // leave untouched (asset, external, or unknown)
  };

  const fix = (code: string, fileDir: string) =>
    code.replace(/(\bfrom\s*|\bimport\s*\(\s*)(['"])(\.\.?\/[^'"]+)\2/g, (m, pre, quote, spec) => {
      if (/\.(css|json)$/.test(spec)) return m; // never touch asset imports
      const rewritten = resolveSpec(fileDir, spec);
      return rewritten ? `${pre}${quote}${rewritten}${quote}` : m;
    });

  const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      return entry.name.endsWith(".d.ts") ? [full] : [];
    });

  return {
    name: "fix-dts-extensions",
    // Run after vite-plugin-dts has written the declarations.
    enforce: "post",
    closeBundle() {
      const distDir = resolve(root, "dist");
      for (const file of walk(distDir)) {
        const code = readFileSync(file, "utf8");
        const fixed = fix(code, path.dirname(file));
        if (fixed !== code) writeFileSync(file, fixed);
      }
    },
  };
}
export default defineConfig({
  resolve: {
    alias: {
      "@": src,
    },
  },
  plugins: [
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      entryRoot: "src",
      include: ["src"],
      outDirs: "dist",
      exclude: ["vite.config.ts", "**/*.stories.*"],
      staticImport: true,
    }),
    copyRawStyles(),
    fixDtsExtensions(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: true,
    lib: {
      entry: entries,
      // ESM-only: the package is `"type": "module"`, so we ship a single ES build.
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      // Bundle only our own source; leave every bare (node_modules) import external.
      external: (id) => !id.startsWith(".") && !id.startsWith("@/") && !isAbsolute(id),
      output: {
        assetFileNames: (asset) => (asset.names?.includes("styles.css") ? "styles.css" : "assets/[name][extname]"),
        chunkFileNames: "chunks/[name]-[hash].js",
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          // Browser-mode story tests flake under CI's constrained parallelism
          // (transient dynamic-import / iframe races). Run serially + retry there;
          // keep the fast parallel path locally.
          fileParallelism: !process.env.CI,
          retry: process.env.CI ? 2 : 0,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
