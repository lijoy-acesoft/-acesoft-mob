/**
 * Build trimmed CSS for index.html (Lighthouse "Reduce unused CSS").
 * Run: node scripts/build-home-css.js
 */
const fs = require("fs");
const path = require("path");
const { PurgeCSS } = require("purgecss");

const ROOT = path.join(__dirname, "..");
const CSS_DIR = path.join(ROOT, "css");

const FA_ICONS = [
  "envelope",
  "times",
  "search",
  "arrow-right",
  "phone",
  "map-marker-alt",
  "rocket",
  "building",
  "check-circle",
  "sparkles",
  "award",
  "user-check",
  "coins",
  "star",
  "angle-up",
];

const FLAT_ICONS = [
  "flaticon-phone-ringing",
  "flaticon-user-interface",
  "flaticon-front-end",
  "flaticon-design",
];

function buildFontAwesomeHome() {
  /* fontawesome-home.css is hand-maintained; skip auto overwrite if present */
  const target = path.join(CSS_DIR, "fontawesome-home.css");
  if (!fs.existsSync(target)) {
    fs.writeFileSync(target, "/* Run build after adding FA icons to index.html */\n");
  }
}

function buildFlaticonHome() {
  const src = fs.readFileSync(path.join(CSS_DIR, "flaticon.css"), "utf8");
  const headEnd = src.indexOf(".flaticon-discuss:before");
  const head = src.slice(0, headEnd);
  let icons = "";
  for (const cls of FLAT_ICONS) {
    const re = new RegExp(`\\.${cls}:before\\s*\\{[^}]+\\}`, "m");
    const m = src.match(re);
    if (m) icons += m[0] + "\n";
  }
  fs.writeFileSync(path.join(CSS_DIR, "flaticon-home.css"), head + icons);
}

function buildAnimateHome() {
  /* animate-home.css is hand-maintained */
}

async function purgeFile(inputName, outputName) {
  const filePath = path.join(CSS_DIR, inputName);
  if (!fs.existsSync(filePath)) return null;
  const result = await new PurgeCSS().purge({
    content: [
      path.join(ROOT, "index.html"),
      path.join(ROOT, "footer.html"),
      path.join(ROOT, "includes", "header-top-countries.html"),
      path.join(ROOT, "js", "load-footer.js"),
      path.join(ROOT, "js", "script.js"),
    ],
    css: [{ raw: fs.readFileSync(filePath, "utf8"), name: inputName }],
    safelist: {
      standard: [
        "show",
        "active",
        "open",
        "fade",
        "collapse",
        "collapsing",
        "modal-backdrop",
        "preloader",
        "characters",
        "animated",
        "fadeInLeft",
        "fadeInRight",
        "fadeInUp",
      ],
      greedy: [
        /^col-/,
        /^order-/,
        /^row/,
        /^container/,
        /^btn/,
        /^theme-/,
        /^fa-/,
        /^flaticon-/,
        /^wow/,
        /^mobile-/,
        /^sticky-/,
        /^navigation/,
        /^preloader/,
        /^acesoft-/,
        /^main-/,
        /^page-/,
        /^auto-/,
        /^overlay-/,
        /^scroll-/,
        /^floating-/,
        /^phone-/,
        /^hero-/,
        /^location-/,
        /^trust-/,
        /^e3-/,
        /^process-/,
        /^footer-/,
        /^header-top/,
        /^country-/,
        /^flag-/,
      ],
    },
    fontFace: true,
    keyframes: true,
    variables: true,
  });
  const css = result[0]?.css || "";
  fs.writeFileSync(path.join(CSS_DIR, outputName), css);
  return { input: inputName, output: outputName, kb: Math.round(css.length / 1024) };
}

async function main() {
  buildFontAwesomeHome();
  buildFlaticonHome();
  buildAnimateHome();

  const purged = [];
  for (const [inName, outName] of [
    ["bootstrap.min.css", "bootstrap.home.css"],
    ["style.css", "style.home.css"],
    ["responsive.css", "responsive.home.css"],
    ["footer-component.css", "footer-component.home.css"],
    ["acesoft-services-component.css", "acesoft-services-component.home.css"],
  ]) {
    const r = await purgeFile(inName, outName);
    if (r) purged.push(r);
  }

  for (const f of [
    "fontawesome-home.css",
    "flaticon-home.css",
    "animate-home.css",
    ...purged.map((p) => p.output),
  ]) {
    const p = path.join(CSS_DIR, f);
    if (fs.existsSync(p)) {
      console.log(f, Math.round(fs.statSync(p).size / 1024) + " KB");
    }
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
