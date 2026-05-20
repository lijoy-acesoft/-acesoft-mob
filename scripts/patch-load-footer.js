/**
 * Replace inline footer fetch with load-footer.js + footer-embed.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const inlineFetchRe =
  /<script>\s*\(function\s*\(\)\s*\{[\s\S]*?fetch\(["'](?:\.\.\/)?footer\.html["']\)[\s\S]*?\}\)\(\);\s*<\/script>/g;

const replacement =
  '<script src="JS_BASEfooter-embed.js"></script>\n<script src="JS_BASEload-footer.js"></script>';

function patchFile(fp, depth) {
  const jsBase = depth > 0 ? "../".repeat(depth) + "js/" : "js/";
  let html = fs.readFileSync(fp, "utf8");
  if (html.includes("load-footer.js")) return false;
  if (!inlineFetchRe.test(html)) return false;
  inlineFetchRe.lastIndex = 0;
  html = html.replace(
    inlineFetchRe,
    replacement.replace(/JS_BASE/g, jsBase)
  );
  fs.writeFileSync(fp, html);
  return true;
}

const rootPages = [
  "android-app-development.html",
  "ios-app-development.html",
  "mobile-app-development-canada.html",
  "mobile-app-development-usa.html",
  "page-contact.html",
];

rootPages.forEach((f) => {
  const fp = path.join(root, f);
  if (patchFile(fp, 0)) console.log("Patched:", f);
});

function walk(dir, depth) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "scripts" || name === "includes") continue;
    const fp = path.join(dir, name);
    if (fs.statSync(fp).isDirectory()) {
      walk(fp, depth + 1);
    } else if (name.endsWith(".html")) {
      if (patchFile(fp, depth + 1)) {
        console.log("Patched:", path.relative(root, fp));
      }
    }
  }
}

walk(root, 0);
console.log("Done.");
