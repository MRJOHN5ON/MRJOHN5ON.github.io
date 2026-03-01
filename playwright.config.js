// @ts-check
/**
 * Playwright configuration for MRJOHN5ON.github.io portfolio site.
 * Default baseURL is the live site (https://mrjohn5on.github.io).
 * To test locally, run a static server (e.g. npx serve . -p 8080) and set BASE_URL=http://localhost:8080.
 */

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/playwright',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://mrjohn5on.github.io',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  timeout: 30000,
  expect: { timeout: 10000 },
});
