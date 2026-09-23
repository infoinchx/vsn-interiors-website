// Build an additional double-click preview, without changing the hosted build.
import { readFile, open, rename } from "node:fs/promises";
import { build } from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const dist = path.join(root, "dist");
const index = await readFile(path.join(dist, "index.html"), "utf8");
// Use this build's HTML references so stale files never enter the preview.
const entry = index.match(/<script\b[^>]*\bsrc="([^"]+\.js)"[^>]*>/)?.[1];
if (!entry)
  throw new Error("Run vite build before creating the offline preview.");
const result = await build({
  entryPoints: [path.join(dist, entry)],
  bundle: true,
  write: false,
  format: "iife",
  platform: "browser",
  target: "es2020",
  minify: true,
});
const script = result.outputFiles[0].text
  .replaceAll("images/", "public/images/")
  .replaceAll("</script", "<\\/script");
const css = (
  await Promise.all(
    [...index.matchAll(/<link\b[^>]*\bhref="([^"]+\.css)"[^>]*>/g)].map(
      (match) => readFile(path.join(dist, match[1]), "utf8"),
    ),
  )
).join("\n");
const preview = path.join(root, "OPEN-PREVIEW.html");
const pending = preview + ".pending";
const file = await open(pending, "w");
try {
  await file.writeFile(
    `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="theme-color" content="#171a17"><title>VSN Interiors | Vizianagaram</title><link rel="icon" href="public/images/brand/vsn-official.webp"><style>${css}</style></head><body><div id="app"></div><script>${script}</script></body></html>`,
  );
  await file.sync();
} finally {
  await file.close();
}
await rename(pending, preview);
console.log("Created OPEN-PREVIEW.html. Keep it beside the public folder.");
