// Assumptions: socialqa.html is the Social QA Bootcamp project page. Button-container has icon links (GitHub, Full Bootcamp Portfolio).

const { test, expect } = require('@playwright/test');

test.describe('Social QA - Page load and content', () => {
  test('page loads with correct title and header', async ({ page }) => {
    await page.goto('/socialqa.html');
    await expect(page).toHaveTitle(/Social QA Project/i);
    const header = page.locator('header');
    await header.scrollIntoViewIfNeeded();
    await expect(page.getByRole('img', { name: /Social QA Logo/i })).toBeVisible();
    await expect(header.getByText(/Social QA Bootcamp/)).toBeVisible();
  });

  test('GitHub and Full Bootcamp Portfolio links are present', async ({ page }) => {
    await page.goto('/socialqa.html');
    // GitHub link is icon-only; locate by href
    const github = page.locator('header a[href*="Refactoring-using-a-page-object-model"]');
    await expect(github).toBeVisible();
    await expect(github).toHaveAttribute('href', /github\.com.*Refactoring-using-a-page-object-model/);
    await expect(page.getByText(/Full Bootcamp Portfolio/)).toBeVisible();
    // Portfolio link is icon with sibling text; href contains stevenqa
    const portfolio = page.locator('header a[href*="stevenqa.com"]');
    await expect(portfolio).toBeVisible();
  });

  test('Project Overview section is visible', async ({ page }) => {
    await page.goto('/socialqa.html');
    await expect(page.getByRole('heading', { name: /Project Overview/i })).toBeVisible();
    await expect(page.getByText(/Playwright framework/)).toBeVisible();
  });

  test('Tests section describes add cart and search tests', async ({ page }) => {
    await page.goto('/socialqa.html');
    await expect(page.getByRole('heading', { name: /Tests/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Adding to Cart/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Product Searches/i })).toBeVisible();
  });

  test('Tech Stack and Framework Features sections present', async ({ page }) => {
    await page.goto('/socialqa.html');
    await expect(page.getByRole('heading', { name: /Tech Stack/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Framework Features/i })).toBeVisible();
  });

  test('footer has Home Page and Project Bank links', async ({ page }) => {
    await page.goto('/socialqa.html');
    await expect(page.getByRole('link', { name: /Home Page/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Project Bank/i })).toBeVisible();
  });
});

test.describe('Social QA - Responsive', () => {
  test('page renders at mobile and desktop', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/socialqa.html');
    await expect(page.getByRole('heading', { name: /Project Overview/i })).toBeVisible();
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByRole('heading', { name: /Framework Features/i })).toBeVisible();
  });
});
