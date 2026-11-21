import fs from "fs";
import path from "path";
import pkg from "../artifacts/portfolio/node_modules/@playwright/test/index.js";
const { chromium } = pkg;

const publicDir = path.resolve("artifacts/portfolio/public");
const svgPath = path.join(publicDir, "favicon.svg");
const svgContent = fs.readFileSync(svgPath, "utf-8");

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

async function main() {
  console.log("Launching headless browser for favicon rasterization...");
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  for (const { name, size } of sizes) {
    await page.setViewportSize({ width: size, height: size });
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: ${size}px;
              height: ${size}px;
              overflow: hidden;
              background: transparent;
            }
            svg {
              width: 100%;
              height: 100%;
              display: block;
            }
          </style>
        </head>
        <body>
          ${svgContent}
        </body>
      </html>
    `;
    await page.setContent(html);
    const dest = path.join(publicDir, name);
    await page.screenshot({ path: dest, omitBackground: true });
    console.log(`✓ Generated ${name} (${size}x${size})`);
  }

  await browser.close();

  // Create favicon.ico containing 16x16, 32x32, 48x48 PNG frames
  const icoPngSizes = [16, 32, 48];
  const pngBuffers = icoPngSizes.map((s) => {
    const filename = s === 48 ? "favicon-48x48.png" : `favicon-${s}x${s}.png`;
    return {
      size: s,
      buffer: fs.readFileSync(path.join(publicDir, filename)),
    };
  });

  // Header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4); // Number of images

  let currentOffset = 6 + pngBuffers.length * 16;
  const dirEntries = [];

  for (const { size, buffer } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(currentOffset, 12); // Offset to image data
    dirEntries.push(entry);
    currentOffset += buffer.length;
  }

  const icoBuffer = Buffer.concat([
    header,
    ...dirEntries,
    ...pngBuffers.map((p) => p.buffer),
  ]);

  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
  console.log("✓ Generated favicon.ico (16/32/48)");

  // Clean up temporary 48x48 if desired, or keep it
  if (fs.existsSync(path.join(publicDir, "favicon-48x48.png"))) {
    fs.unlinkSync(path.join(publicDir, "favicon-48x48.png"));
  }

  console.log("All favicons successfully generated!");
}

main().catch((err) => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
