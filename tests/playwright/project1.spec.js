// Assumptions: project1.html is the API Testing with Postman page. External links (GitHub, Google Sheets, etc.) are not followed; we assert they exist and have correct href.

const { test, expect } = require('@playwright/test');

test.describe('Project1 (API Testing with Postman) - Page load and content', () => {
  test('page loads with correct title and header', async ({ page }) => {
    await page.goto('/project1.html');
    await expect(page).toHaveTitle(/API Testing with Postman/i);
    await expect(page.getByRole('heading', { name: /API Testing with Postman/i, level: 1 })).toBeVisible();
  });

  test('Project Overview section and test counts are visible', async ({ page }) => {
    await page.goto('/project1.html');
    await expect(page.getByRole('heading', { name: /Project Overview/i })).toBeVisible();
    await expect(page.getByText(/Total Tests Conducted: 57/)).toBeVisible();
  });

  test('Requirement 1 and Requirement 2 sections are present', async ({ page }) => {
    await page.goto('/project1.html');
    await expect(page.getByRole('heading', { name: /Requirement 1: Kit Product Management/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Requirement 2: Fast Delivery Calculations/i })).toBeVisible();
  });

  test('View on GitHub link is present and points to repo', async ({ page }) => {
    await page.goto('/project1.html');
    const link = page.getByRole('link', { name: /View on GitHub/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /github\.com.*postmanAPI_testing/);
  });

  test('View Complete Test Cases button exists and links to Google Sheets', async ({ page }) => {
    await page.goto('/project1.html');
    const btn = page.getByRole('link', { name: /View Complete Test Cases/i });
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', /docs\.google\.com/);
  });

  test('Conclusion section is visible', async ({ page }) => {
    await page.goto('/project1.html');
    await expect(page.getByRole('heading', { name: /Conclusion/i })).toBeVisible();
  });

  test('footer has Home and Projects links', async ({ page }) => {
    await page.goto('/project1.html');
    const footer = page.locator('.modern-footer');
    await expect(footer.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(footer.getByRole('link', { name: /Projects/i })).toBeVisible();
  });
});

test.describe('Project1 - Responsive', () => {
  test('page renders at mobile width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/project1.html');
    await expect(page.getByRole('heading', { name: /API Testing with Postman/i, level: 1 })).toBeVisible();
  });

  test('page renders at desktop width', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/project1.html');
    await expect(page.getByRole('heading', { name: /Project Overview/i })).toBeVisible();
  });
});
