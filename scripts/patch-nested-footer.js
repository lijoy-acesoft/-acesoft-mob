const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const re =
  /\s*fetch\(["']\.\.\/footer\.html["']\)[\s\S]*?\.catch\(function \(\) \{\}\);/g;
const rep =
  "\n  <script src=\"../js/footer-embed.js\"></script>\n  <script src=\"../js/load-footer.js\"></script>";

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "scripts" || name === "includes") continue;
    const fp = path.join(dir, name);
    if (fs.statSync(fp).isDirectory()) {
      walk(fp);
    } else if (name.endsWith(".html")) {
      let html = fs.readFileSync(fp, "utf8");
      if (html.includes("load-footer.js")) continue;
      if (re.test(html)) {
        re.lastIndex = 0;
        html = html.replace(re, rep);
        fs.writeFileSync(fp, html);
        console.log("Patched:", path.relative(root, fp));
      }
    }
  }
}

walk(root);
console.log("Done.");
