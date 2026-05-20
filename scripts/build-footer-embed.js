/**
 * Build js/footer-embed.js from footer.html for file:// and offline fallback.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "footer.html"), "utf8").trim();
const escaped = JSON.stringify(html);

const out = `/* Auto-generated from footer.html — run: node scripts/build-footer-embed.js */
window.ACESOFT_FOOTER_HTML = ${escaped};
`;

fs.writeFileSync(path.join(root, "js", "footer-embed.js"), out);
console.log("Wrote js/footer-embed.js");
