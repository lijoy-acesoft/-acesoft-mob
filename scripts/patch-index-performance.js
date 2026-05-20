/**
 * Homepage: inline critical CSS, early LCP preload, zero blocking stylesheets.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");
const critPath = path.join(root, "css", "index-critical.css");

let html = fs.readFileSync(indexPath, "utf8");
const crit = fs.readFileSync(critPath, "utf8").trim();

if (!html.includes("/* index-critical */")) {
  html = html.replace("</style>", "/* index-critical */\n" + crit + "\n</style>");
}

const earlyHead = [
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="preload" href="images/main-slider/5.jpg" as="image" fetchpriority="high">',
].join("\n");

if (!html.includes('fetchpriority="high"') || html.indexOf("<style>") < html.indexOf("fetchpriority")) {
  html = html.replace("<style>", earlyHead + "\n<style>");
}

html = html.replace(/<link rel="stylesheet" href="css\/index-critical\.css">\s*/g, "");

html = html.replace(
  /<!-- Non-blocking styles[^]*?<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*<link rel="preload" href="images\/main-slider\/5\.jpg" as="image" fetchpriority="high">\s*/,
  "<!-- Non-blocking styles: full theme loads async (no render-blocking CSS) -->\n"
);

html = html.replace(
  /<link rel="stylesheet" href="css\/header-top\.css" media="print" data-async onload="this\.media='all'">\s*/g,
  ""
);

const fontPreload =
  '<link rel="preload" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Syne:wght@600;700;800&display=swap" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">';

html = html.replace(
  /<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2[^>]+media="print"[^>]+>\s*/,
  fontPreload + "\n"
);

fs.writeFileSync(indexPath, html);
console.log("index.html patched:", {
  inlinedCritical: html.includes("/* index-critical */"),
  externalCritical: html.includes("index-critical.css"),
  asyncBootstrap: html.includes('href="css/bootstrap.min.css" media="print"'),
});
