/**
 * Remove @import chain from style.css (done manually) and inject deferred vendor CSS links.
 * Run: node scripts/patch-deferred-css.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DEFERRED_ROOT = fs.readFileSync(
  path.join(ROOT, "includes", "deferred-vendor-styles.html"),
  "utf8"
).trim();

const DEFERRED_NESTED = DEFERRED_ROOT.replace(/href="css\//g, 'href="../css/');

function walkHtml(dir, list = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walkHtml(full, list);
    } else if (name.endsWith(".html")) {
      list.push(full);
    }
  }
  return list;
}

function hasDeferred(html) {
  return html.includes('css/fontawesome.css" media="print"');
}

function injectAfterStyleLink(html, deferred) {
  const re = /(<link[^>]+href="(\.\.\/)*css\/style\.css"[^>]*>\s*)/i;
  if (!re.test(html)) return html;
  return html.replace(re, (m) => m + deferred + "\n");
}

let updated = 0;
for (const file of walkHtml(ROOT)) {
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes("css/style.css") || hasDeferred(html)) continue;
  const rel = path.relative(ROOT, file);
  const depth = rel.split(path.sep).length - 1;
  const deferred = depth > 0 ? DEFERRED_NESTED : DEFERRED_ROOT;
  const next = injectAfterStyleLink(html, deferred);
  if (next !== html) {
    fs.writeFileSync(file, next, "utf8");
    updated++;
    console.log("Patched:", rel);
  }
}

console.log("Done. Updated", updated, "file(s).");
