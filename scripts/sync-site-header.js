/**
 * Sync site header from index.html to all root pages and SEO header includes.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");

const headerMatch = indexHtml.match(
  /<!-- Main Header-->[\s\S]*?<header class="main-header[\s\S]*?<\/header>\s*<!--End Main Header -->/
);
if (!headerMatch) {
  console.error("Could not extract header from index.html");
  process.exit(1);
}

let rootHeader = headerMatch[0];

const NAV = [
  { href: "index.html", label: "Home", key: "home" },
  { href: "android-app-development.html", label: "Android App Development", key: "android" },
  { href: "ios-app-development.html", label: "iOS App Development", key: "ios" },
  { href: "page-contact.html", label: "Get in Touch", key: "contact" },
];

function stripCurrent(html) {
  return html.replace(/\s*class="acesoft-nav-current-link"/g, "");
}

function setCurrent(html, key) {
  let out = stripCurrent(html);
  if (!key) return out;
  const item = NAV.find((n) => n.key === key);
  if (!item) return out;
  const re = new RegExp(
    `(<a href="[^"]*${item.href.replace(/\./g, "\\.")}"[^>]*)>`,
    ""
  );
  return out.replace(/(<ul class="navigation">[\s\S]*?<\/ul>)/, (nav) =>
    nav.replace(re, '$1 class="acesoft-nav-current-link">')
  );
}

function toNestedPaths(html) {
  return html
    .replace(/href="(?!mailto:|tel:|#|\.\.\/)([^"]+)"/g, 'href="../$1"')
    .replace(/src="images\//g, 'src="../images/')
    .replace(/action="blog-showcase\.html"/g, 'action="../blog-showcase.html"');
}

function normalizeNavLabels(html) {
  let out = html;
  out = out.replace(
    /<li><a href="[^"]*android-app-development\.html"[^>]*>Android<\/a><\/li>/g,
    '<li><a href="android-app-development.html">Android App Development</a></li>'
  );
  out = out.replace(
    /<li><a href="[^"]*ios-app-development\.html"[^>]*>iOS<\/a><\/li>/g,
    '<li><a href="ios-app-development.html">iOS App Development</a></li>'
  );
  return out;
}

const rootPages = [
  { file: "index.html", current: "home" },
  { file: "android-app-development.html", current: "android" },
  { file: "ios-app-development.html", current: "ios" },
  { file: "mobile-app-development-canada.html", current: null },
  { file: "mobile-app-development-usa.html", current: null },
  { file: "page-contact.html", current: "contact" },
];

const headerRe =
  /<!-- Main Header-->[\s\S]*?<header class="main-header[\s\S]*?<\/header>\s*<!--End Main Header -->/;

const headerReAlt = /<header class="main-header header-style-one">[\s\S]*?<\/header>/;

const countriesSnippet = fs.readFileSync(
  path.join(root, "includes", "header-top-countries.html"),
  "utf8"
).trim();

const countriesRe = /<li class="header-top-phones">[\s\S]*?<\/li>/;

for (const { file, current } of rootPages) {
  const fp = path.join(root, file);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, "utf8");
  const hasCommentHeader = headerRe.test(html);
  const hasAltHeader = headerReAlt.test(html);
  if (!hasCommentHeader && !hasAltHeader) {
    console.warn("No header block:", file);
    continue;
  }
  let header = setCurrent(normalizeNavLabels(rootHeader), current);
  header = header.replace(countriesRe, countriesSnippet);
  const headerOnly = header.replace(/^<!-- Main Header-->\s*/, "");
  if (hasCommentHeader) {
    html = html.replace(headerRe, header);
  } else {
    html = html.replace(headerReAlt, headerOnly);
  }
  if (!html.includes("header-top.css")) {
    html = html.replace(
      /(<link href="css\/footer-component\.css" rel="stylesheet"[^>]*>)/,
      "$1\n<link href=\"css/header-top.css\" rel=\"stylesheet\" />"
    );
  }
  fs.writeFileSync(fp, html);
  console.log("Synced root:", file);
}

function buildNestedHeader(currentKey) {
  let h = setCurrent(normalizeNavLabels(rootHeader), currentKey);
  h = h.replace(countriesRe, countriesSnippet);
  h = toNestedPaths(h);
  return h.replace(/^[\s\S]*?<header/, "<header").replace(
    /<!-- Main Header-->\s*/,
    ""
  );
}

fs.writeFileSync(
  path.join(root, "includes", "seo-header-mobile.html"),
  buildNestedHeader("android").trim() + "\n"
);
console.log("Wrote includes/seo-header-mobile.html");

fs.writeFileSync(
  path.join(root, "includes", "seo-header-ios.html"),
  buildNestedHeader("ios").trim() + "\n"
);
console.log("Wrote includes/seo-header-ios.html");

fs.writeFileSync(
  path.join(root, "includes", "seo-header-regional.html"),
  buildNestedHeader(null).trim() + "\n"
);
console.log("Wrote includes/seo-header-regional.html");

function addHeaderCssToFile(fp) {
  let html = fs.readFileSync(fp, "utf8");
  if (html.includes("header-top.css")) return;
  if (html.includes('href="../css/seo-landing-shell.css"')) {
    html = html.replace(
      /(<link href="\.\.\/css\/seo-landing-shell\.css" rel="stylesheet" \/>)/,
      "$1\n  <link href=\"../css/header-top.css\" rel=\"stylesheet\" />"
    );
    fs.writeFileSync(fp, html);
    console.log("Added header-top.css:", path.relative(root, fp));
  }
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) {
      if (name === "node_modules" || name === "scripts" || name === "includes") continue;
      walk(fp);
    } else if (name.endsWith(".html") && fp.includes(path.sep)) {
      const rel = path.relative(root, fp);
      if (
        rel.startsWith("android-app-development") ||
        rel.startsWith("ios-app-development") ||
        rel.startsWith("mobile-app-development-")
      ) {
        addHeaderCssToFile(fp);
      }
    }
  }
}

walk(root);
console.log("Done.");
