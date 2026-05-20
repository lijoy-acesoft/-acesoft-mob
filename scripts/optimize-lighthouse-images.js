/**
 * Hero + logo sizes matched to real CSS display dimensions (phone mockup ~182–272px).
 * Run: node scripts/optimize-lighthouse-images.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");

const HERO_SRC = [
  path.join(ROOT, "images/main-slider/5.jpg.bak"),
  path.join(ROOT, "images/main-slider/5.jpg"),
].find((p) => fs.existsSync(p));

const LOGO_SRC = [
  path.join(ROOT, "images/logo-2.png.bak"),
  path.join(ROOT, "images/logo-2.png"),
].find((p) => fs.existsSync(p));

async function writeHeroVariants() {
  if (!HERO_SRC) return;
  const heroWidths = [210, 272, 300, 544];
  for (const w of heroWidths) {
    const base = path.join(ROOT, `images/main-slider/5-${w}`);
    await sharp(HERO_SRC)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: w <= 300 ? 76 : 72 })
      .toFile(`${base}.webp`);
    await sharp(HERO_SRC)
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(`${base}.jpg`);
  }
  await sharp(HERO_SRC)
    .resize({ width: 300, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(ROOT, "images/main-slider/5.jpg"));
  for (const old of ["-286", "-572"]) {
    for (const ext of [".webp", ".jpg"]) {
      const p = path.join(ROOT, `images/main-slider/5${old}${ext}`);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
  }
  console.log("Hero variants:", heroWidths.join(", "));
}

async function writeLogo() {
  if (!LOGO_SRC) return;
  const outPng = path.join(ROOT, "images/logo-2.png");
  const outWebp = path.join(ROOT, "images/logo-2.webp");
  await sharp(LOGO_SRC)
    .resize(68, 59, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: true })
    .toFile(outPng);
  await sharp(LOGO_SRC)
    .resize(68, 59, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 72, effort: 6 })
    .toFile(outWebp);
  console.log("Logo resized to 68x59");
}

async function run() {
  await writeHeroVariants();
  await writeLogo();
  for (const p of [
    "images/main-slider/5-210.webp",
    "images/main-slider/5-272.webp",
    "images/main-slider/5-300.webp",
    "images/main-slider/5-544.webp",
    "images/logo-2.png",
    "images/logo-2.webp",
  ]) {
    const full = path.join(ROOT, p);
    if (!fs.existsSync(full)) continue;
    const m = await sharp(full).metadata();
    console.log(p, Math.round(fs.statSync(full).size / 1024) + " KB", `${m.width}x${m.height}`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
