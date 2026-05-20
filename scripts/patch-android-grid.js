const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "android-app-development.html");
let h = fs.readFileSync(p, "utf8");
const start = h.indexOf("<!-- ANDROID SEO SUB-PAGES -->");
const end = h.indexOf("<!-- CTA -->", start);
if (start < 0 || end < 0) throw new Error("markers not found");
const insert = '<motion id="android-seo-grid-mount" class="reveal"></div>\n\n        ';
h = h.slice(0, start) + insert + h.slice(end);
h = h.replace('<motion id="android-seo-grid-mount"', '<div id="android-seo-grid-mount"');
const scriptMarker = "fetch(\"footer.html\")";
const gridScript = `fetch("includes/android-seo-services-grid.html")
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var mount = document.getElementById("android-seo-grid-mount");
          if (mount) mount.innerHTML = html;
        })
        .catch(function () {});
      `;
if (!h.includes("android-seo-services-grid.html")) {
  h = h.replace(scriptMarker, gridScript + scriptMarker);
}
fs.writeFileSync(p, h);
console.log("Patched android-app-development.html");
