const fs = require("fs");
const path = require("path");

const files = [
  "android-app-development.html",
  "ios-app-development.html",
  "mobile-app-development-canada.html",
  "mobile-app-development-usa.html",
  "page-contact.html",
];

const root = path.join(__dirname, "..");

for (const file of files) {
  const fp = path.join(root, file);
  let html = fs.readFileSync(fp, "utf8");
  let next = html.replace(
    /\s*\.header-top[\s\S]*?\.header-top \.top-right \.useful-links li a:hover \{[\s\S]*?\}\s*/g,
    "\n"
  );
  next = next.replace(
    /\s*\.header-top \.inner-container \{[\s\S]*?\}\s*\.header-top \.top-left \{ overflow: hidden; \}\s*/g,
    "\n"
  );
  next = next.replace(
    /\s*\.header-top \.top-left \.list-style-one li:nth-child\(2\),[\s\S]*?display: none;\s*\}\s*/g,
    "\n"
  );
  if (next !== html) {
    fs.writeFileSync(fp, next);
    console.log("Stripped inline header-top CSS:", file);
  }
}
