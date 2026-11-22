import path from "path";
import pkg from "../artifacts/portfolio/node_modules/@playwright/test/index.js";
import { preview } from "../artifacts/portfolio/node_modules/vite/dist/node/index.js";

const { chromium } = pkg;

async function main() {
  console.log("Starting preview server for theme QA...");
  const server = await preview({
    root: path.resolve("artifacts/portfolio"),
    configFile: path.resolve("artifacts/portfolio/vite.config.ts"),
    preview: { port: 5174, host: "127.0.0.1" },
  });

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  // 1. Test Default URL (Dark Mode by default or system)
  console.log("Testing Default URL (Desktop 1280x800)...");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("http://127.0.0.1:5174/", { waitUntil: "networkidle" });

  // Explicitly test Dark Mode
  await page.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  });
  await page.waitForTimeout(200);

  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const darkBtnBg = await page.evaluate(() => {
    const el = document.querySelector(".btn-primary");
    return el ? getComputedStyle(el).backgroundColor : "";
  });
  const darkBtnColor = await page.evaluate(() => {
    const el = document.querySelector(".btn-primary");
    return el ? getComputedStyle(el).color : "";
  });
  const darkMeta = await page.evaluate(() => document.querySelector('meta[name="theme-color"]')?.getAttribute("content"));

  console.log(`[Dark Mode] body bg: ${darkBg}`);
  console.log(`[Dark Mode] btn-primary bg: ${darkBtnBg}`);
  console.log(`[Dark Mode] btn-primary color: ${darkBtnColor}`);
  console.log(`[Dark Mode] meta theme-color: ${darkMeta}`);

  // 2. Test Light Mode Toggle
  console.log("Testing Light Mode Switch via ThemeToggle button...");
  const themeToggle = page.locator('button[aria-label*="Switch to"], button[title*="Switch to"]').first();
  await themeToggle.click();
  await page.waitForTimeout(300);

  const lightThemeAttr = await page.getAttribute("html", "data-theme");
  const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const lightBtnBg = await page.evaluate(() => {
    const el = document.querySelector(".btn-primary");
    return el ? getComputedStyle(el).backgroundColor : "";
  });
  const lightBtnColor = await page.evaluate(() => {
    const el = document.querySelector(".btn-primary");
    return el ? getComputedStyle(el).color : "";
  });
  const lightMeta = await page.evaluate(() => document.querySelector('meta[name="theme-color"]')?.getAttribute("content"));

  console.log(`[Light Mode] data-theme: ${lightThemeAttr}`);
  console.log(`[Light Mode] body bg: ${lightBg}`);
  console.log(`[Light Mode] btn-primary bg: ${lightBtnBg}`);
  console.log(`[Light Mode] btn-primary color: ${lightBtnColor}`);
  console.log(`[Light Mode] meta theme-color: ${lightMeta}`);

  // 3. Test ?preset=ultraviolet&tier=static
  console.log("Testing ?preset=ultraviolet&tier=static resolution...");
  await page.goto("http://127.0.0.1:5174/?preset=ultraviolet&tier=static", { waitUntil: "networkidle" });
  const dataPreset = await page.getAttribute("html", "data-preset");
  const dataTier = await page.getAttribute("html", "data-tier");
  console.log(`- html data-preset: ${dataPreset}`);
  console.log(`- html data-tier: ${dataTier}`);

  // 4. Test Mobile Viewport
  console.log("Testing Mobile Viewport (iPhone 14: 390x844)...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:5174/", { waitUntil: "networkidle" });
  const navVisible = await page.locator("header").isVisible();
  console.log(`- Header visible on mobile: ${navVisible}`);

  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));

  if (errors.length > 0) {
    console.error("Errors encountered:", errors);
    process.exit(1);
  }

  console.log("✓ ALL QA CHECKS PASSED!");
}

main().catch((err) => {
  console.error("QA script failed:", err);
  process.exit(1);
});
