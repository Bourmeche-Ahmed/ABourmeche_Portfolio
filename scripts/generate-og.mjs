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
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@500;700&family=Saira+Condensed:wght@700;800&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 1200px;
            height: 630px;
            background-color: #2E3244;
            color: #FFFFFF;
            font-family: 'IBM Plex Sans', sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 72px 80px;
            position: relative;
            overflow: hidden;
          }
          /* Background grid */
          .grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(to right, rgba(81, 96, 121, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(81, 96, 121, 0.15) 1px, transparent 1px);
            background-size: 40px 40px;
            pointer-events: none;
          }
          .border-frame {
            position: absolute;
            inset: 24px;
            border: 1px solid rgba(81, 96, 121, 0.4);
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
            background: #2E3244;
            border: 2px solid #516079;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 32px;
            font-weight: 900;
            color: #F1895C;
          }
          .status {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 13px;
            color: #F1895C;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            background: rgba(241, 137, 92, 0.12);
            border: 1px solid rgba(241, 137, 92, 0.35);
            padding: 6px 14px;
            border-radius: 4px;
          }
          .main-content {
            z-index: 10;
          }
          h1 {
            font-family: 'Saira Condensed', sans-serif;
            font-size: 82px;
            font-weight: 800;
            line-height: 0.95;
            letter-spacing: -0.01em;
            color: #FFFFFF;
            text-transform: uppercase;
            margin-bottom: 12px;
          }
          .title {
            font-size: 26px;
            font-weight: 600;
            color: #F1895C;
            margin-bottom: 16px;
          }
          .desc {
            font-size: 18px;
            color: #C5C6C6;
            max-width: 820px;
            line-height: 1.5;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 14px;
            color: #C5C6C6;
            border-top: 1px solid rgba(81, 96, 121, 0.4);
            padding-top: 24px;
            z-index: 10;
          }
          .accent-dot {
            color: #F1895C;
          }
        </style>
      </head>
      <body>
        <div class="grid"></div>
        <div class="border-frame"></div>
        <div class="header">
          <div class="monogram">AB</div>
          <div class="status">● Available Feb 2027 · PFE Internship</div>
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
  await page.waitForTimeout(300); // Allow fonts to load

  const dest = path.join(publicDir, "opengraph.jpg");
  await page.screenshot({ path: dest, type: "jpeg", quality: 90 });
  console.log("✓ Generated updated opengraph.jpg (1200x630) in new palette");

  await browser.close();
}

main().catch((err) => {
  console.error("Error generating opengraph image:", err);
  process.exit(1);
});
