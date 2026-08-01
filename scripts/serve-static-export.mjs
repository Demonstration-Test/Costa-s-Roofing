import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(process.env.STATIC_ROOT ?? "out");
const basePath = (process.env.STATIC_BASE_PATH ?? "").replace(/\/$/, "");
const port = Number(process.env.STATIC_PORT ?? "4176");

const contentTypes = new Map([
  [".avif", "image/avif"],
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
]);

function exportPath(requestPath) {
  if (basePath && requestPath !== basePath && !requestPath.startsWith(`${basePath}/`)) {
    return undefined;
  }

  const relativeUrl = basePath ? requestPath.slice(basePath.length) || "/" : requestPath;
  const decoded = decodeURIComponent(relativeUrl);
  const relativeFile = decoded.endsWith("/")
    ? `${decoded.slice(1)}index.html`
    : decoded.slice(1);
  const filePath = path.resolve(root, relativeFile);

  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    return undefined;
  }

  return filePath;
}

const server = createServer(async (request, response) => {
  try {
    const requestPath = new URL(request.url ?? "/", `http://${request.headers.host}`).pathname;
    let filePath = exportPath(requestPath);

    if (filePath && existsSync(filePath) && (await stat(filePath)).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    if (!filePath || !existsSync(filePath) || !(await stat(filePath)).isFile()) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "cache-control": "no-store",
      "content-type": contentTypes.get(path.extname(filePath)) ?? "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Static server error");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}${basePath}/`);
});
