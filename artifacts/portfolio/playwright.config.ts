import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/test/e2e",
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry",
    launchOptions: {
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--use-gl=swiftshader",
        "--enable-unsafe-swiftshader",
      ],
    },
  },
  webServer: {
    command: "node ./node_modules/vite/bin/vite.js preview --port 5173 --host 127.0.0.1",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  projects: [
    {
      name: "desktop-chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "laptop",
      use: {
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: "tablet-ipad",
      use: {
        viewport: { width: 768, height: 1024 },
        hasTouch: true,
      },
    },
    {
      name: "mobile-iphone14",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "mobile-small-android",
      use: {
        viewport: { width: 360, height: 740 },
        isMobile: true,
      },
    },
  ],
});
