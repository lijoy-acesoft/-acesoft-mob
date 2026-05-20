/**
 * SEO audit fixes: remove meta keywords, sync og:url with canonical.
 * Run: node scripts/apply-seo-audit.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function walkHtml(dir, list = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walkHtml(full, list);
    } else if (name.endsWith(".html")) {
      list.push(full);
    }
  }
  return list;
}

function stripKeywords(html) {
  return html.replace(/<meta\s+name="keywords"[\s\S]*?>\s*/gi, "");
}

function syncOgUrl(html) {
  const canon = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (!canon) return html;
  const url = canon[1];
  if (html.includes('property="og:url"')) {
    return html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${url}">`
    );
  }
  return html;
}

const files = walkHtml(ROOT);
let changed = 0;
for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  const next = syncOgUrl(stripKeywords(html));
  if (next !== html) {
    fs.writeFileSync(file, next, "utf8");
    changed++;
    console.log("updated:", path.relative(ROOT, file));
  }
}
console.log(`Done. ${changed} file(s) updated.`);
