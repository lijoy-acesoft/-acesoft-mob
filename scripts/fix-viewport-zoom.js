/**
 * Allow pinch-zoom on all pages (Lighthouse accessibility).
 * Run: node scripts/fix-viewport-zoom.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BAD =
  /content="width=device-width,\s*initial-scale=1\.0,\s*maximum-scale=1\.0,\s*user-scalable=0"/g;
const GOOD = 'content="width=device-width, initial-scale=1"';

let n = 0;
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walk(full);
    } else if (name.endsWith(".html")) {
      let html = fs.readFileSync(full, "utf8");
      if (!BAD.test(html)) continue;
      html = html.replace(BAD, GOOD);
      fs.writeFileSync(full, html);
      n++;
      console.log(path.relative(ROOT, full));
    }
  }
}

walk(ROOT);
console.log("Updated", n, "file(s).");
