/**
 * Defer bootstrap, style.css, responsive, component CSS on main hub pages.
 * Run: node scripts/patch-main-styles-async.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const HUBS = [
  "android-app-development.html",
  "ios-app-development.html",
  "mobile-app-development-canada.html",
  "mobile-app-development-usa.html",
  "page-contact.html",
];

function toAsync(href) {
  return `<link rel="stylesheet" href="${href}" media="print" data-async onload="this.media='all'">`;
}

function patchFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  let html = original;
  let changed = false;
  const alreadyAsync = html.includes('bootstrap.min.css" media="print"');

  const pairs = [
    [/\<link href="css\/bootstrap\.min\.css" rel="stylesheet"\s*\/?\>/gi, toAsync("css/bootstrap.min.css")],
    [/\<link href="css\/style\.css" rel="stylesheet"\s*\/?\>/gi, toAsync("css/style.css")],
    [/\<link href="css\/responsive\.css" rel="stylesheet"\s*\/?\>/gi, toAsync("css/responsive.css")],
    [/\<link href="css\/footer-component\.css" rel="stylesheet"\s*\/?\>/gi, toAsync("css/footer-component.css")],
    [/\<link href="css\/header-top\.css" rel="stylesheet"\s*\/?\>/gi, toAsync("css/header-top.css")],
    [/\<link href="css\/acesoft-services-component\.css" rel="stylesheet"\s*\/?\>/gi, toAsync("css/acesoft-services-component.css")],
    [
      /<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]+" rel="stylesheet"\s*\/?>/gi,
      '<link rel="preload" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Syne:wght@600;700;800&display=swap" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">',
    ],
  ];

  if (!alreadyAsync) {
  for (const [re, repl] of pairs) {
    const next = html.replace(re, repl);
    if (next !== html) {
      html = next;
      changed = true;
    }
  }
  }

  // Remove duplicate blocking flaticon + duplicate font preconnect blocks
  html = html.replace(/\s*<link href="css\/flaticon\.css" rel="stylesheet"\s*\/?>\s*/gi, "");
  html = html.replace(
    /\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*<link rel="preload" href="https:\/\/fonts\.googleapis\.com\/css2[^>]+>\s*(?=<!-- Responsive)/i,
    "\n"
  );

  const gridAsync = toAsync("css/android-seo-services-grid.css");
  const gridNext = html.replace(
    /<link href="css\/android-seo-services-grid\.css" rel="stylesheet"\s*\/?>/gi,
    gridAsync
  );
  if (gridNext !== html) {
    html = gridNext;
    changed = true;
  }

  if (changed && !html.includes("js/async-css.js")) {
    html = html.replace(/<\/head>/i, '<script src="js/async-css.js" defer></script>\n</head>');
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, "utf8");
    changed = true;
  }
  return changed;
}

let n = 0;
for (const name of HUBS) {
  const fp = path.join(ROOT, name);
  if (!fs.existsSync(fp)) continue;
  if (patchFile(fp)) {
    console.log("Patched", name);
    n++;
  }
}
console.log("Done.", n, "hub page(s).");
