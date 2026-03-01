// Assumptions: supernova.html is the Supernova Internship Test Report. Content-heavy; we assert key sections and links.

const { test, expect } = require('@playwright/test');

test.describe('Supernova - Page load and content', () => {
  test('page loads with correct title and header', async ({ page }) => {
    await page.goto('/supernova.html');
    await expect(page).toHaveTitle(/Supernova Internship Test Report/i);
    await expect(page.getByRole('heading', { name: /Supernova Internship Test Report/i })).toBeVisible();
  });

  test('Introduction section is visible', async ({ page }) => {
    await page.goto('/supernova.html');
    await expect(page.getByRole('heading', { name: /Introduction/i })).toBeVisible();
    await expect(page.getByText(/3-month internship/)).toBeVisible();
  });

  test('Tester Information section present', async ({ page }) => {
    await page.goto('/supernova.html');
    await expect(page.getByRole('heading', { name: /Tester Information/i })).toBeAttached();
    await expect(page.getByText(/Ryley Johnson/).first()).toBeAttached();
  });

  test('Video Demonstration section has iframe', async ({ page }) => {
    await page.goto('/supernova.html');
    await expect(page.getByRole('heading', { name: /Video Demonstration/i })).toBeVisible();
    await expect(page.locator('iframe[title="YouTube video player"]')).toBeVisible();
  });

  test('Focus Areas and Test Results Summary table visible', async ({ page }) => {
    await page.goto('/supernova.html');
    await expect(page.getByRole('heading', { name: /Focus Areas/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Test Results Summary/i })).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
  });

  test('Detailed Test Analysis and Recommendations sections present', async ({ page }) => {
    await page.goto('/supernova.html');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#detailed-test-analysis h2')).toHaveText(/Detailed Test Analysis/);
    await expect(page.locator('#recommendations h2')).toHaveText(/Recommendations/);
  });

  test('Final Conclusion and footer links', async ({ page }) => {
    await page.goto('/supernova.html');
    await expect(page.getByRole('heading', { name: /Final Conclusion/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Home Page/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Project Bank/i })).toBeVisible();
  });
});

test.describe('Supernova - Responsive', () => {
  test('key sections visible at 375px and 1280px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/supernova.html');
    await expect(page.getByRole('heading', { name: /Introduction/i })).toBeVisible();
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByRole('heading', { name: /Final Conclusion/i })).toBeVisible();
  });
});
