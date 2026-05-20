import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.argv[2] ?? process.env.PORT ?? 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml"
};

createServer(async (request, response) => {
  const pathname = request.url === "/" ? "/index.html" : request.url ?? "/index.html";
  const filePath = join(root, pathname.replace(/^\/+/, ""));
  try {
    const body = await readFile(filePath);
    response.writeHead(200, { "content-type": types[extname(filePath)] ?? "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, () => {
  console.log(`Preview running at http://localhost:${port}`);
});
