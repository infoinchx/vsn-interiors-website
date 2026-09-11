// Dependency-free local preview of the included production build.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { spawn } from "node:child_process";
const root = fileURLToPath(new URL("./dist/", import.meta.url));
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".json": "application/json",
};
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    let file = path.resolve(root, "." + pathname);
    if (!file.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    if (pathname.endsWith("/")) file = path.join(file, "index.html");
    const info = await stat(file);
    if (!info.isFile()) throw Error();
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("File not found. Run npm run build if you changed the source.");
  }
});
server.on("error", (error) => {
  console.error(
    error.code === "EADDRINUSE"
      ? "Port 4173 is already in use. Close the other preview, then try again."
      : error.message,
  );
  process.exit(1);
});
server.listen(4173, "127.0.0.1", () => {
  console.log(
    "Vsn Interiors is ready: http://localhost:4173\nKeep this window open. Press Ctrl+C to stop.",
  );
  if (process.platform === "win32")
    spawn("cmd", ["/c", "start", "", "http://localhost:4173"], {
      stdio: "ignore",
    });
});
