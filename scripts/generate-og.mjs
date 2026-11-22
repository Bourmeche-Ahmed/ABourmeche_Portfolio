import fs from "fs";
import path from "path";
import pkg from "../artifacts/portfolio/node_modules/@playwright/test/index.js";
const { chromium } = pkg;

const publicDir = path.resolve("artifacts/portfolio/public");

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 1200px;
            height: 630px;
            background-color: #0B1A21;
            color: #E6F2F2;
            font-family: 'Inter', system-ui, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 72px 80px;
            position: relative;
            overflow: hidden;
          }
          /* Background circuit grid */
          .grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(to right, rgba(45, 212, 191, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(45, 212, 191, 0.08) 1px, transparent 1px);
            background-size: 32px 32px;
            pointer-events: none;
          }
          .border-frame {
            position: absolute;
            inset: 24px;
            border: 1px solid rgba(45, 212, 191, 0.2);
            pointer-events: none;
          }
          .header {
            display: flex;
            align-items: center;
            gap: 20px;
            z-index: 10;
          }
          .monogram {
            width: 68px;
            height: 68px;
            background: #12262F;
            border: 1.5px solid rgba(45, 212, 191, 0.4);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Inter', sans-serif;
            font-size: 30px;
            font-weight: 800;
            color: #2DD4BF;
            position: relative;
          }
          .monogram-dot {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #F5A524;
          }
          .status {
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            color: #2DD4BF;
            letter-spacing: 0.05em;
            background: rgba(45, 212, 191, 0.12);
            border: 1px solid rgba(45, 212, 191, 0.35);
            padding: 6px 14px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .status-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #F5A524;
          }
          .main-content {
            z-index: 10;
          }
          h1 {
            font-family: 'Inter', sans-serif;
            font-size: 68px;
            font-weight: 800;
            line-height: 1.05;
            letter-spacing: -0.02em;
            color: #E6F2F2;
            margin-bottom: 12px;
          }
          .title {
            font-size: 24px;
            font-weight: 600;
            color: #2DD4BF;
            margin-bottom: 16px;
          }
          .desc {
            font-size: 17px;
            color: #8FA9B3;
            max-width: 860px;
            line-height: 1.6;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            color: #8FA9B3;
            border-top: 1px solid rgba(45, 212, 191, 0.15);
            padding-top: 24px;
            z-index: 10;
          }
          .accent-dot {
            color: #2DD4BF;
          }
        </style>
      </head>
      <body>
        <div class="grid"></div>
        <div class="border-frame"></div>
        <div class="header">
          <div class="monogram">
            AB
            <div class="monogram-dot"></div>
          </div>
          <div class="status">
            <span class="status-dot"></span>
            <span>Available Feb 2027 · PFE Internship</span>
          </div>
        </div>
        <div class="main-content">
          <h1>Ahmed Bourmeche</h1>
          <div class="title">Embedded Systems & Industrial IoT Engineer</div>
          <div class="desc">
            Specializing in bare-metal firmware (ESP-IDF, STM32), multi-protocol industrial edge gateways (Modbus RTU, RS-485, BACnet, OCPP), closed-loop control, and real-time dashboards.
          </div>
        </div>
        <div class="footer">
          <span>INSAT <span class="accent-dot">/</span> University of Carthage</span>
          <span>bourmeche-ahmed.github.io/ABourmeche_Portfolio</span>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(400);

  const dest = path.join(publicDir, "opengraph.jpg");
  await page.screenshot({ path: dest, type: "jpeg", quality: 90 });
  console.log("✓ Generated updated opengraph.jpg (1200x630) in Circuit Teal palette");

  await browser.close();
}

main().catch((err) => {
  console.error("Error generating opengraph image:", err);
  process.exit(1);
});
