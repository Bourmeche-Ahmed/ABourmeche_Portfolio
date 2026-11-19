import fs from "fs";
import path from "path";
import zlib from "zlib";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist/public/assets");

const JS_BUDGET_KB = 1000; // 1 MB uncompressed
const CSS_BUDGET_KB = 100; // 100 KB uncompressed

function checkBundle() {
  console.log("━━━ Bundle Size Budget Check ━━━\n");
  if (!fs.existsSync(distDir)) {
    console.error("Error: dist/public/assets does not exist. Run 'pnpm build' first.");
    process.exit(1);
  }

  const files = fs.readdirSync(distDir);
  let passed = true;

  for (const file of files) {
    const fullPath = path.join(distDir, file);
    const stat = fs.statSync(fullPath);
    const content = fs.readFileSync(fullPath);
    const gzipped = zlib.gzipSync(content);

    const sizeKb = parseFloat((stat.size / 1024).toFixed(2));
    const gzipKb = parseFloat((gzipped.length / 1024).toFixed(2));

    if (file === "index.js") {
      const ok = sizeKb <= JS_BUDGET_KB;
      console.log(`${ok ? "✓" : "✗"} ${file}: ${sizeKb} KB (gzip: ${gzipKb} KB) [Budget: ${JS_BUDGET_KB} KB]`);
      if (!ok) passed = false;
    } else if (file === "index.css") {
      const ok = sizeKb <= CSS_BUDGET_KB;
      console.log(`${ok ? "✓" : "✗"} ${file}: ${sizeKb} KB (gzip: ${gzipKb} KB) [Budget: ${CSS_BUDGET_KB} KB]`);
      if (!ok) passed = false;
    } else {
      console.log(`  ${file}: ${sizeKb} KB (gzip: ${gzipKb} KB)`);
    }
  }

  console.log("\n" + (passed ? "✓ All bundle sizes within budget!" : "✗ Bundle size exceeded budget!"));
  if (!passed) process.exit(1);
}

checkBundle();
