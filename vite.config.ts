import { cpSync, readdirSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import dts from "vite-plugin-dts";

const root = import.meta.dirname;
const src = resolve(root, "src");

/** Recursively collect `.ts`/`.tsx` source files under a directory (skipping declarations). */
function collect(dir: string): string[] {
  return readdirSync(join(src, dir), { withFileTypes: true }).flatMap((entry) => {
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
      cpSync(resolve(src, "styles"), resolve(root, "dist/styles"), { recursive: true });
    },
  };
}

export default defineConfig({
  resolve: {
    alias: { "@": src },
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
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: true,
    lib: {
      entry: entries,
      formats: ["es", "cjs"],
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "js" : "cjs"}`,
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
});
