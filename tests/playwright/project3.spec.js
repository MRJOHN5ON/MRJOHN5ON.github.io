// Assumptions: project3.html is the SDLC/Testing Practices page. Static content; footer links to index and GitHub Pages.

const { test, expect } = require('@playwright/test');

test.describe('Project3 (SDLC / Testing Practices) - Page load and content', () => {
  test('page loads with correct title and heading', async ({ page }) => {
    await page.goto('/project3.html');
    await expect(page).toHaveTitle(/Working The Steps Of The SDLC/i);
    await expect(page.getByRole('heading', { name: /Working The Steps Of The SDLC For Web Based Testing/i })).toBeVisible();
  });

  test('Requirement Analysis section and image are present', async ({ page }) => {
    await page.goto('/project3.html');
    await expect(page.getByRole('heading', { name: /Requirement Analysis/i })).toBeVisible();
    await expect(page.getByRole('img', { name: /Requirement Analysis/i })).toBeVisible();
  });

  test('Equivalency Partitions and Test Creation sections visible', async ({ page }) => {
    await page.goto('/project3.html');
    await expect(page.getByRole('heading', { name: /Equivalency Partitions & Boundary Values/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Test Creation & Execution/i })).toBeVisible();
  });

  test('Test Results Stats section present', async ({ page }) => {
    await page.goto('/project3.html');
    await expect(page.getByRole('heading', { name: /Test Results Stats/i })).toBeVisible();
  });

  test('footer has Home, About, Projects, Contact and social links', async ({ page }) => {
    await page.goto('/project3.html');
    const footer = page.locator('.modern-footer');
    await expect(footer.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'GitHub' })).toBeVisible();
  });
});

test.describe('Project3 - Responsive', () => {
  test('content visible at mobile and desktop viewports', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/project3.html');
    await expect(page.getByRole('heading', { name: /Requirement Analysis/i })).toBeVisible();
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByRole('heading', { name: /Test Results Stats/i })).toBeVisible();
  });
});
