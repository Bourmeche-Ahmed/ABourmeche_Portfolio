import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectsDir = path.resolve(__dirname, "../public/projects");

async function optimize() {
  console.log("Optimizing images in:", projectsDir);

  const rlDir = path.join(projectsDir, "rl-navigation");
  if (fs.existsSync(rlDir)) {
    for (const file of ["rl1.png", "rl2.png"]) {
      const srcPath = path.join(rlDir, file);
      if (fs.existsSync(srcPath)) {
        const baseName = path.parse(file).name;
        const webp1600 = path.join(rlDir, `${baseName}-1600.webp`);
        const webp800 = path.join(rlDir, `${baseName}-800.webp`);
        const webpDefault = path.join(rlDir, `${baseName}.webp`);

        // Generate 1600px WebP (<250KB)
        await sharp(srcPath)
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 78, effort: 6 })
          .toFile(webp1600);

        // Generate 800px WebP
        await sharp(srcPath)
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 78, effort: 6 })
          .toFile(webp800);

        // Copy/link to default webp
        fs.copyFileSync(webp1600, webpDefault);

        const stat1600 = fs.statSync(webp1600);
        console.log(`✓ Generated ${file} -> ${baseName}.webp (${Math.round(stat1600.size / 1024)} KB)`);
      }
    }
  }
  console.log("Optimization complete.");
}

optimize().catch(console.error);
