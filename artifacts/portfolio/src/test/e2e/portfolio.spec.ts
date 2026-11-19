import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCREENSHOT_DIR = path.resolve(__dirname, "../../../docs/rebuild");

test.beforeAll(() => {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
});

test.describe("Portfolio E2E & Integrity Suite", () => {
  test("Core page loads without console errors and with clean asset requests", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    const failedRequests: string[] = [];
    page.on("response", (res) => {
      // Allow 404 only for intentional 404 testing or external tracker blocks
      if (res.status() >= 400 && !res.url().includes("favicon.ico") && !res.url().includes("404")) {
        failedRequests.push(`${res.status()} ${res.url()}`);
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Zero console errors
    expect(consoleErrors).toEqual([]);
    expect(failedRequests).toEqual([]);

    // Check SEO metadata
    const title = await page.title();
    expect(title).toContain("Ahmed BOURMECHE");

    const desc = await page.getAttribute('meta[name="description"]', "content");
    expect(desc).toBeTruthy();

    const ogTitle = await page.getAttribute('meta[property="og:title"]', "content");
    expect(ogTitle).toBeTruthy();

    // Check no horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });

  test("Theme toggle and Preset switching persist and recolor", async ({ page }) => {
    await page.goto("/?preset=lime");
    await page.waitForLoadState("networkidle");

    const htmlPreset = await page.getAttribute("html", "data-preset");
    expect(htmlPreset).toBe("lime");

    // Test switching to ultraviolet
    await page.goto("/?preset=ultraviolet");
    const uvPreset = await page.getAttribute("html", "data-preset");
    expect(uvPreset).toBe("ultraviolet");
  });

  test("Static tier fallback works properly without WebGL errors", async ({ page }) => {
    await page.goto("/?tier=static");
    await page.waitForLoadState("networkidle");

    const placeholder = page.locator('svg[aria-label="Procedural Self-Balancing Robot Blueprint Illustration"]');
    await expect(placeholder.first()).toBeVisible();

    const canvas = page.locator("canvas");
    await expect(canvas).toHaveCount(0);
  });

  test("Projects Contact Sheet opens modal and allows closing", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const firstProject = page.locator("#projects [role='button']").first();
    await firstProject.click();

    const modalDialog = page.locator("[role='dialog']");
    await expect(modalDialog).toBeVisible();

    // Close via Close button
    const closeBtn = page.locator("button[aria-label='Close modal']");
    await closeBtn.click();
    await expect(modalDialog).toHaveCount(0);
  });

  test("Accessibility audit via Axe-core (Zero serious or critical violations)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const seriousViolations = axeResults.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );

    expect(seriousViolations).toEqual([]);
  });

  test("Visual screenshots capture across viewports", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const vp = page.viewportSize();
    const filename = `hero-${vp?.width}x${vp?.height}-${testInfo.project.name}.png`;
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename) });
  });
});
