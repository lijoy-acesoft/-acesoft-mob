/**
 * Sync header-top countries block from includes/header-top-countries.html
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const snippet = fs.readFileSync(
  path.join(root, "includes", "header-top-countries.html"),
  "utf8"
).trim();

const targets = [
  "index.html",
  "android-app-development.html",
  "ios-app-development.html",
  "mobile-app-development-canada.html",
  "mobile-app-development-usa.html",
  "page-contact.html",
];

const re = /<li class="header-top-phones">[\s\S]*?<\/li>(?=\s*<\/ul>)/;

for (const file of targets) {
  const fp = path.join(root, file);
  if (!fs.existsSync(fp)) {
    console.warn("Skip missing:", file);
    continue;
  }
  let html = fs.readFileSync(fp, "utf8");
  if (!re.test(html)) {
    console.warn("No header-top-phones block in:", file);
    continue;
  }
  html = html.replace(re, snippet);
  fs.writeFileSync(fp, html);
  console.log("Patched:", file);
}

console.log("Done.");
