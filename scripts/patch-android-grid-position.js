const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "android-app-development.html");
let h = fs.readFileSync(p, "utf8");
const insert = '<div id="android-seo-grid-mount" class="reveal"></div>';
const marker = "        <!-- CAPABILITIES SECTION HEADER -->";
const capIdx = h.indexOf(marker);
const mountIdx = h.indexOf(insert);
if (capIdx === -1) {
  console.error("Marker not found");
  process.exit(1);
}
if (mountIdx !== -1 && mountIdx < capIdx) {
  console.log("Mount already before capabilities");
} else {
  if (mountIdx !== -1) {
    h = h.replace(insert, "");
  }
  h = h.replace(marker, insert + "\n\n        " + marker);
  fs.writeFileSync(p, h);
  console.log("Grid mount placed before capabilities");
}
