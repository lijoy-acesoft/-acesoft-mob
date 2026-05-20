const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const from =
  '</head>\n  <script>document.documentElement.classList.add("is-preloading");</script>\n';
const to =
  '  <script>document.documentElement.classList.add("is-preloading");</script>\n</head>\n';

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walk(p, out);
    } else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

let n = 0;
for (const f of walk(ROOT)) {
  let html = fs.readFileSync(f, "utf8");
  if (html.includes(from)) {
    fs.writeFileSync(f, html.split(from).join(to));
    n++;
  }
}
console.log("Moved preloader script into <head> on", n, "files.");
