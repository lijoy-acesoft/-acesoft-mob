const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pagePath = path.join(
  root,
  "mobile-app-development-canada",
  "mobile-app-development-london-ontario.html"
);
const headerPath = path.join(root, "includes", "seo-header-regional.html");

let html = fs.readFileSync(pagePath, "utf8");
const header =
  "<!-- Main Header-->\n" + fs.readFileSync(headerPath, "utf8").trim() + "\n";

html = html.replace(/\s*<div id="header-root"><\/div>/, "\n    " + header);

html = html.replace(
  /<script src="\.\.\/js\/seo-header-init\.js"><\/script>\s*<script>[\s\S]*?fetch\("\.\.\/includes\/seo-header-regional\.html"\)[\s\S]*?<\/script>/,
  `<script src="../js/seo-header-init.js"></script>
  <script>
    if (window.initSeoHeader) window.initSeoHeader();
    if (window.initNavDropdown) window.initNavDropdown();
  </script>`
);

if (!html.includes("flaticon.css")) {
  html = html.replace(
    /<link href="\.\.\/css\/header-top\.css"/,
    '<link href="../css/flaticon.css" rel="stylesheet" />\n  <link href="../css/header-top.css"'
  );
}

fs.writeFileSync(pagePath, html);
console.log("Embedded full header in London page.");
