const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const regionsRoot = `								<li class="dropdown">
									<a href="mobile-app-development-canada.html">Regions</a>
									<ul>
										<li><a href="mobile-app-development-canada.html">Mobile App Development Canada</a></li>
										<li><a href="mobile-app-development-usa.html">Mobile App Development USA</a></li>
									</ul>
								</li>`;

const regionsCanadaCurrent = `								<li class="dropdown">
									<a href="mobile-app-development-canada.html" class="acesoft-nav-current-link">Regions</a>
									<ul>
										<li><a href="mobile-app-development-canada.html">Mobile App Development Canada</a></li>
										<li><a href="mobile-app-development-usa.html">Mobile App Development USA</a></li>
									</ul>
								</li>`;

const regionsUsaCurrent = `								<li class="dropdown">
									<a href="mobile-app-development-usa.html" class="acesoft-nav-current-link">Regions</a>
									<ul>
										<li><a href="mobile-app-development-canada.html">Mobile App Development Canada</a></li>
										<li><a href="mobile-app-development-usa.html">Mobile App Development USA</a></li>
									</ul>
								</li>`;

const marker = /<li><a href="(?:\.\.\/)?ios-app-development\.html"[^>]*>iOS<\/a><\/li>\s*\n\s*<li><a href="(?:\.\.\/)?page-contact\.html"/;

function patchFile(rel, regionsBlock) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    console.warn("Skip missing", rel);
    return;
  }
  let h = fs.readFileSync(file, "utf8");
  if (h.includes("Mobile App Development Canada</a>")) {
    console.log("Already patched", rel);
    return;
  }
  const block = regionsBlock || regionsRoot;
  const newH = h.replace(
    marker,
    (m) => m.replace(/<li><a href="(?:\.\.\/)?page-contact\.html"/, block + "\n								<li><a href=\"page-contact.html\"")
  );
  if (newH === h) {
    console.warn("No match", rel);
    return;
  }
  fs.writeFileSync(file, newH);
  console.log("Patched", rel);
}

const rootFiles = [
  "index.html",
  "android-app-development.html",
  "ios-app-development.html",
  "page-contact.html",
];
rootFiles.forEach((f) => patchFile(f, regionsRoot));
patchFile("mobile-app-development-canada.html", regionsCanadaCurrent);
patchFile("mobile-app-development-usa.html", regionsUsaCurrent);

// Partial headers
["includes/seo-header-mobile.html", "includes/seo-header-ios.html"].forEach((f) => {
  const file = path.join(root, f);
  let h = fs.readFileSync(file, "utf8");
  if (h.includes("Mobile App Development Canada")) return;
  h = h.replace(
    /<li><a href="\.\.\/ios-app-development\.html">iOS<\/a><\/li>\s*\n\s*<li><a href="\.\.\/page-contact\.html">/,
    `<li><a href="../ios-app-development.html">iOS</a></li>
            <li class="dropdown">
              <a href="../mobile-app-development-canada.html">Regions</a>
              <ul>
                <li><a href="../mobile-app-development-canada.html">Mobile App Development Canada</a></li>
                <li><a href="../mobile-app-development-usa.html">Mobile App Development USA</a></li>
              </ul>
            </li>
            <li><a href="../page-contact.html">`
  );
  fs.writeFileSync(file, h);
  console.log("Patched", f);
});
