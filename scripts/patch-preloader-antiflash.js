/**
 * Add preloader anti-flash (is-preloading) to pages with #preloader.
 * Run: node scripts/patch-preloader-antiflash.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const EARLY_SCRIPT =
  '  <script>document.documentElement.classList.add("is-preloading");</script>\n';

const INLINE_PRELOADER_CSS = `    html.is-preloading {
      overflow: hidden;
    }
    html.is-preloading body.service-shell .page-wrapper {
      visibility: hidden;
    }
    html.is-preloading body.contact-page-shell .page-wrapper {
      visibility: hidden;
    }
    #preloader {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 999999;
      pointer-events: auto;
    }
`;

const HUB_MARKER = "    /* ─── PRELOADER (unchanged) ─── */";
const HUB_INJECT_AFTER = HUB_MARKER + "\n" + INLINE_PRELOADER_CSS;

const CONTACT_MARKER = "    /* Reference-style preloader */";
const CONTACT_INJECT_AFTER =
  CONTACT_MARKER + "\n" + INLINE_PRELOADER_CSS.replace(
    "body.service-shell",
    "body.contact-page-shell"
  ).replace(
    /html\.is-preloading body\.contact-page-shell \.page-wrapper \{\n      visibility: hidden;\n    \}\n    html\.is-preloading body\.contact-page-shell \.page-wrapper \{\n      visibility: hidden;\n    \}\n/,
    "html.is-preloading body.contact-page-shell .page-wrapper {\n      visibility: hidden;\n    }\n"
  );

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walk(p, out);
    } else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function patchFinishHandler(html) {
  if (html.includes('classList.remove("is-preloading")')) return html;
  return html.replace(
    /(var container = document\.getElementById\("container-preloader"\);\s*\n\s*if \(!preloader \|\| !container\) return;\s*\n)(\s*container\.classList\.add\("loaded"\);)/g,
    '$1      document.documentElement.classList.remove("is-preloading");\n$2'
  );
}

function patchFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  if (!html.includes('id="preloader"')) return false;
  if (html.includes("patch-preloader-antiflash")) return false;

  let changed = false;

  if (!html.includes('classList.add("is-preloading")')) {
    if (html.includes("<body")) {
      html = html.replace(/<body([^>]*)>/, EARLY_SCRIPT + "<body$1>");
      changed = true;
    } else if (html.includes("<style>")) {
      html = html.replace(/<style>/, EARLY_SCRIPT + "<style>");
      changed = true;
    } else if (html.includes("<head>")) {
      html = html.replace("<head>", "<head>\n" + EARLY_SCRIPT.trim());
      changed = true;
    }
  }

  if (html.includes(HUB_MARKER) && !html.includes("html.is-preloading")) {
    html = html.replace(HUB_MARKER, HUB_INJECT_AFTER);
    changed = true;
  } else if (html.includes(CONTACT_MARKER) && !html.includes("html.is-preloading")) {
    const contactCss = `    html.is-preloading {
      overflow: hidden;
    }
    html.is-preloading body.contact-page-shell .page-wrapper {
      visibility: hidden;
    }
    #preloader {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 999999;
      pointer-events: auto;
    }
`;
    html = html.replace(CONTACT_MARKER, CONTACT_MARKER + "\n" + contactCss);
    changed = true;
  }

  const afterFinish = patchFinishHandler(html);
  if (afterFinish !== html) {
    html = afterFinish;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html);
    return true;
  }
  return false;
}

const files = walk(ROOT);
let n = 0;
for (const f of files) {
  if (f.includes("index.html") && f.replace(/\\/g, "/").endsWith("/index.html") && !f.includes("mobile-app-development")) {
    /* skip root index — has its own preloader */
  }
  if (patchFile(f)) {
    console.log("patched:", path.relative(ROOT, f));
    n++;
  }
}
console.log("Done. Patched", n, "files.");
