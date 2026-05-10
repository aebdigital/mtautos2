// One-shot script to recompress oversized public/ images.
// Run: node scripts/compress-images.mjs
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

const targets = [
  { file: "pzp.jpg",                                  width: 1600, format: "jpeg",  quality: 78 },
  { file: "leasing.jpg",                              width: 1400, format: "jpeg",  quality: 75 },
  { file: "dovoz.jpg",                                width: 1400, format: "jpeg",  quality: 75 },
  { file: "hero section.jpg",                         width: 1920, format: "jpeg",  quality: 78 },
  { file: "predaj.jpeg",                              width: 1400, format: "jpeg",  quality: 75 },
  { file: "og-image.jpg",                             width: 1200, format: "jpeg",  quality: 80 },
  { file: "logo.jpg",                                 width: 800,  format: "jpeg",  quality: 80 },
  { file: "header baner.jpg",                         width: 1200, format: "jpeg",  quality: 80 },
  { file: "kontakt bg.jpg",                           width: 1600, format: "jpeg",  quality: 75 },
  { file: "kooperativa copy.jpg",                     width: 600,  format: "jpeg",  quality: 80 },
  { file: "CSOB_logo.jpg",                            width: 400,  format: "jpeg",  quality: 82 },
  { file: "favicon.png",                              width: 256,  format: "png" },
  { file: "logo-removebg-preview (1).png",            width: 800,  format: "png" },
  { file: "generali.png",                             width: 600,  format: "png" },
  { file: "komunalna-poistovna-removebg-preview.png", width: 400,  format: "png" },
  { file: "wustenrot.png",                            width: 400,  format: "png" },
];

async function processFile({ file, width, format, quality }) {
  const fullPath = path.join(PUBLIC_DIR, file);
  const before = (await fs.stat(fullPath)).size;
  let pipe = sharp(fullPath, { failOn: "none" }).rotate().resize({
    width,
    withoutEnlargement: true,
  });
  if (format === "jpeg") {
    pipe = pipe.jpeg({ quality, mozjpeg: true, progressive: true });
  } else if (format === "png") {
    pipe = pipe.png({ compressionLevel: 9, palette: true });
  } else if (format === "webp") {
    pipe = pipe.webp({ quality });
  }
  const buffer = await pipe.toBuffer();
  if (buffer.length < before) {
    await fs.writeFile(fullPath, buffer);
    console.log(`✓ ${file}: ${(before / 1024).toFixed(0)} KB → ${(buffer.length / 1024).toFixed(0)} KB`);
  } else {
    console.log(`- ${file}: skipped (already smaller at ${(before / 1024).toFixed(0)} KB)`);
  }
}

let totalBefore = 0;
let totalAfter = 0;
for (const t of targets) {
  try {
    const fullPath = path.join(PUBLIC_DIR, t.file);
    const before = (await fs.stat(fullPath)).size;
    totalBefore += before;
    await processFile(t);
    const after = (await fs.stat(fullPath)).size;
    totalAfter += after;
  } catch (err) {
    console.error(`✗ ${t.file}: ${err.message}`);
  }
}
console.log(
  `\nTotal: ${(totalBefore / 1024).toFixed(0)} KB → ${(totalAfter / 1024).toFixed(0)} KB ` +
    `(saved ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`,
);
