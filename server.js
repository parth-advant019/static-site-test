const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const DIST = path.join(__dirname, "dist");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };

http
  .createServer((req, res) => {
    let file = path.join(DIST, decodeURIComponent(req.url.split("?")[0]));
    if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = path.join(DIST, "index.html");
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "text/plain" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, "0.0.0.0", () => console.log("Listening on " + PORT));
