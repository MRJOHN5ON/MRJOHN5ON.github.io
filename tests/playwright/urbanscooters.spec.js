// Assumptions: urbanscooters.html has a mobile menu toggle, in-page nav links, and multiple sections. Menu toggle adds .show to .nav-menu.

const { test, expect } = require('@playwright/test');

test.describe('Urban Scooters - Page load and content', () => {
  test('page loads with correct title and hero', async ({ page }) => {
    await page.goto('/urbanscooters.html');
    await expect(page).toHaveTitle(/Urban Scooter: Comprehensive Testing Project/i);
    await expect(page.getByRole('heading', { name: /Urban Scooter: Comprehensive Testing Project/i })).toBeVisible();
  });

  test('header nav has Overview, Testing Scope, and other links', async ({ page }) => {
    await page.goto('/urbanscooters.html');
    await expect(page.getByRole('link', { name: /Overview/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Testing Scope/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Web Testing/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /API Testing/i })).toBeVisible();
  });

  test('Menu toggle button is visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/urbanscooters.html');
    await expect(page.getByRole('button', { name: /Menu/i })).toBeVisible();
  });

  test('clicking Menu toggle opens nav menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/urbanscooters.html');
    const navMenu = page.locator('.nav-menu');
    await page.getByRole('button', { name: /Menu/i }).click();
    await expect(navMenu).toHaveClass(/show/);
  });

  test('Project Overview section with three components', async ({ page }) => {
    await page.goto('/urbanscooters.html');
    const overview = page.locator('#overview');
    await overview.scrollIntoViewIfNeeded();
    await expect(overview.getByRole('heading', { name: /Project Overview/i })).toBeVisible();
    await expect(overview.getByText(/Web Application/).first()).toBeVisible();
    await expect(overview.getByText(/Mobile Application/)).toBeVisible();
    await expect(overview.getByText(/Backend API/)).toBeVisible();
  });

  test('Web Application Testing and Form Testing section', async ({ page }) => {
    await page.goto('/urbanscooters.html');
    await expect(page.getByRole('heading', { name: /Web Application Testing/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Input Form Testing/i })).toBeVisible();
  });

  test('View Figma Layout Specs link exists', async ({ page }) => {
    await page.goto('/urbanscooters.html');
    const link = page.getByRole('link', { name: /View Figma Layout Specs/i }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /figma\.com/);
  });

  test('API Testing section and endpoints described', async ({ page }) => {
    await page.goto('/urbanscooters.html');
    const apiSection = page.locator('#api-testing');
    await apiSection.scrollIntoViewIfNeeded();
    await expect(apiSection.locator('h2')).toHaveText(/API Testing/);
    await expect(apiSection.locator('h4').filter({ hasText: /POST.*api.*courier/ }).first()).toBeVisible();
  });

  test('footer has Home Page and Project Bank links', async ({ page }) => {
    await page.goto('/urbanscooters.html');
    await expect(page.getByRole('link', { name: /Home Page/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Project Bank/i })).toBeVisible();
  });
});

test.describe('Urban Scooters - Navigation', () => {
  test('in-page link scrolls to Overview section', async ({ page }) => {
    await page.goto('/urbanscooters.html');
    await page.getByRole('link', { name: /Overview/i }).click();
    await expect(page.locator('#overview')).toBeInViewport();
  });

  test('in-page link scrolls to API Testing section', async ({ page }) => {
    await page.goto('/urbanscooters.html');
    await page.getByRole('link', { name: /API Testing/i }).click();
    await expect(page.locator('#api-testing')).toBeInViewport();
  });
});

test.describe('Urban Scooters - Responsive', () => {
  test('page renders at mobile, tablet, desktop', async ({ page }) => {
    for (const [label, size] of [
      ['mobile', { width: 375, height: 667 }],
      ['tablet', { width: 768, height: 1024 }],
      ['desktop', { width: 1280, height: 720 }],
    ]) {
      await page.setViewportSize(size);
      await page.goto('/urbanscooters.html');
      await expect(page.getByRole('heading', { name: /Urban Scooter: Comprehensive Testing Project/i })).toBeVisible();
    }
  });
});
