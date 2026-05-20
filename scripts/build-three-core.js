/**
 * Tree-shake Three.js to APIs used on the homepage.
 * Run: node scripts/build-three-core.js
 */
const esbuild = require("esbuild");
const path = require("path");

const outfile = path.join(__dirname, "..", "js", "three.core.min.js");

esbuild
  .build({
    entryPoints: [path.join(__dirname, "three-bundle-entry.js")],
    bundle: true,
    minify: true,
    format: "iife",
    globalName: "THREE",
    outfile,
    target: ["es2018"],
    legalComments: "none",
  })
  .then(function () {
    const fs = require("fs");
    const kb = Math.round(fs.statSync(outfile).size / 1024);
    console.log("Wrote", outfile, kb + " KB");
  })
  .catch(function (e) {
    console.error(e);
    process.exit(1);
  });
