// Assumptions: project2.html is the Android Emulation Testing Report page. No accordion in HTML; project2.js accordion is unused on this page.

const { test, expect } = require('@playwright/test');

test.describe('Project2 (Android Emulation) - Page load and content', () => {
  test('page loads with correct title and main heading', async ({ page }) => {
    await page.goto('/project2.html');
    // Page has no <title> in HTML; assert main heading only
    await expect(page.getByRole('heading', { name: /ANDROID EMULATION TESTING REPORT FOR URBAN LUNCH APP/i, level: 1 })).toBeVisible();
  });

  test('Product Overview and video iframe are present', async ({ page }) => {
    await page.goto('/project2.html');
    await expect(page.getByRole('heading', { name: /PRODUCT OVERVIEW/i })).toBeVisible();
    await expect(page.locator('iframe[title="YouTube video player"]')).toBeVisible();
  });

  test('Key Features and Testing Process sections are visible', async ({ page }) => {
    await page.goto('/project2.html');
    await expect(page.getByRole('heading', { name: /Key Features/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /TESTING PROCESS/i })).toBeVisible();
  });

  test('E2E User Journey Test Flow section exists', async ({ page }) => {
    await page.goto('/project2.html');
    await expect(page.getByText(/E2E USER JOURNEY TEST FLOW/i)).toBeVisible();
  });

  test('Test Case Summary table has PASSED/FAILED statuses', async ({ page }) => {
    await page.goto('/project2.html');
    const table = page.locator('.test-case-summary');
    await table.scrollIntoViewIfNeeded();
    await expect(table).toBeVisible();
    await expect(table.getByText('PASSED').first()).toBeVisible();
  });

  test('Analysis of Failed Test Cases section is present', async ({ page }) => {
    await page.goto('/project2.html');
    await expect(page.getByRole('heading', { name: /ANALYSIS OF FAILED TEST CASES/i })).toBeVisible();
  });

  test('Conclusion section is visible', async ({ page }) => {
    await page.goto('/project2.html');
    await expect(page.getByRole('heading', { name: /CONCLUSION/i })).toBeVisible();
  });

  test('footer links to Home, About, Projects, Contact', async ({ page }) => {
    await page.goto('/project2.html');
    const footer = page.locator('.modern-footer');
    await expect(footer.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Projects' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Contact' })).toBeVisible();
  });
});

test.describe('Project2 - Responsive', () => {
  test('page renders at 375px and 1280px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/project2.html');
    await expect(page.getByRole('heading', { name: /PRODUCT OVERVIEW/i })).toBeVisible();
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByRole('heading', { name: /CONCLUSION/i })).toBeVisible();
  });
});
