const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "footer.html");
let h = fs.readFileSync(p, "utf8");
if (h.includes("iOS Services")) {
  console.log("Footer already has iOS Services");
  process.exit(0);
}
const d = "div";
const block = [
  `        <${d} class="footer-column col-xl-3 col-lg-4 col-md-4">`,
  `          <${d} class="footer-widget links-widget">`,
  `            <h6 class="widget-title">iOS Services</h6>`,
  `            <ul class="user-links">`,
  `              <li><a href="/ios-app-development/swift-ios-app-development.html">Swift iOS</a></li>`,
  `              <li><a href="/ios-app-development/custom-ios-app-development.html">Custom iOS Apps</a></li>`,
  `              <li><a href="/ios-app-development/hire-ios-developers.html">Hire iOS Developers</a></li>`,
  `              <li><a href="/ios-app-development/enterprise-ios-app-development.html">Enterprise iOS</a></li>`,
  `              <li><a href="/ios-app-development/ios-app-development-toronto.html">iOS Toronto</a></li>`,
  `              <li><a href="/ios-app-development/ios-app-development-canada.html">iOS Canada</a></li>`,
  `              <li><a href="/ios-app-development/startup-ios-app-development.html">Startup iOS</a></li>`,
  `            </ul>`,
  `          </${d}>`,
  `        </${d}>`,
  "",
].join("\n");
const marker = '        <motion class="footer-column col-xl-3 col-lg-4 col-md-4 col-sm-8">'.replace(
  /<motion/g,
  "<div"
);
if (!h.includes(marker)) {
  console.error("Marker not found");
  process.exit(1);
}
h = h.replace(marker, block + marker);
fs.writeFileSync(p, h);
console.log("Added iOS Services to footer");
