/**
 * Add whatsapp-float.js before </body> on all site HTML pages.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const tagRoot = '<script src="js/whatsapp-float.js"></script>';
const tagNested = '<script src="../js/whatsapp-float.js"></script>';

function walk(dir, depth) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "scripts" || name === "includes") continue;
    const fp = path.join(dir, name);
    if (fs.statSync(fp).isDirectory()) {
      walk(fp, depth + 1);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    let html = fs.readFileSync(fp, "utf8");
    if (html.includes("whatsapp-float.js")) continue;
    const tag = depth > 0 ? tagNested : tagRoot;
    if (html.includes("</body>")) {
      html = html.replace("</body>", tag + "\n</body>");
      fs.writeFileSync(fp, html);
      console.log("Patched:", path.relative(root, fp));
    }
  }
}

walk(root, 0);
console.log("Done.");
