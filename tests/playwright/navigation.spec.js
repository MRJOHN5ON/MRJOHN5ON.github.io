// Assumptions: Tests cross-page routing from index to project pages and back. Links may be relative (e.g. project1.html) or absolute (GitHub). We only follow same-origin navigation.

const { test, expect } = require('@playwright/test');

test.describe('Navigation - Homepage to project pages', () => {
  const homepageToProjectCases = [
    { testName: 'E-commerce UI Automation -> socialqa.html', linkName: /E-commerce UI Automation/i, expectedUrl: /socialqa\.html/, role: 'img', visibleName: /Social QA Logo/i },
    { testName: 'API TESTING WITH POSTMAN -> project1.html', linkName: /API TESTING WITH POSTMAN/i, expectedUrl: /project1\.html/, role: 'heading', visibleName: /API Testing with Postman/i, level: 1 },
    { testName: 'Mobile App Testing -> project2.html', linkName: /Mobile App Testing/i, expectedUrl: /project2\.html/, role: 'heading', visibleName: /ANDROID EMULATION/i, level: 1 },
    { testName: 'Testing Practices and Analysis -> project3.html', linkName: /Testing Practices and Analysis/i, expectedUrl: /project3\.html/, role: 'heading', visibleName: /Working The Steps Of The SDLC/i, level: 1 },
    { testName: 'Internship with Supernova -> supernova.html', linkName: /Internship with Supernova/i, expectedUrl: /supernova\.html/, role: 'heading', visibleName: /Supernova Internship Test Report/i, level: 1 },
    { testName: 'Collaboration with TripleTen -> project4.html', linkName: /Collaboration with TripleTen/i, expectedUrl: /project4\.html/, role: 'heading', visibleName: /Bug Jam Experience/i, level: 1 },
    { testName: 'Cross-Platform Manual Testing -> urbanscooters.html', linkName: /Cross-Platform Manual Testing/i, expectedUrl: /urbanscooters\.html/, role: 'heading', visibleName: /Urban Scooter: Comprehensive Testing Project/i, level: 1 },
  ];

  for (const { testName, linkName, expectedUrl, role, visibleName, level } of homepageToProjectCases) {
    test(`clicking ${testName}`, async ({ page }) => {
      await page.goto('/');
      await page.getByRole('link', { name: linkName }).click();
      await expect(page).toHaveURL(expectedUrl);
      const locatorOptions = { name: visibleName };
      if (level) locatorOptions.level = level;
      await expect(page.getByRole(role, locatorOptions)).toBeVisible();
    });
  }
});

test.describe('Navigation - Project pages back to home', () => {
  const backToHomeCases = [
    { path: '/project1.html', linkName: 'Home', useFirst: true },
    { path: '/project2.html', linkName: 'Home' },
    { path: '/socialqa.html', linkName: /Home Page/i },
    { path: '/urbanscooters.html', linkName: /Home Page/i },
  ];

  for (const { path, linkName, useFirst } of backToHomeCases) {
    const pageName = path.replace(/^\/(.+)\.html$/, '$1');
    test(`${pageName} Home link returns to index`, async ({ page }) => {
      await page.goto(path);
      const link = page.getByRole('link', { name: linkName });
      await (useFirst ? link.first() : link).click();
      await expect(page).toHaveURL(/index\.html|\/$/);
    });
  }
});

test.describe('Navigation - External links presence', () => {
  test('homepage project boxes for external GitHub links have correct href', async ({ page }) => {
    await page.goto('/');
    const playwrightRepo = page.getByRole('link', { name: /Automated Web UI Testing/i });
    await expect(playwrightRepo).toHaveAttribute('href', /github\.com.*learning_playwright/);
    const webdriver = page.getByRole('link', { name: /E2E Testing for a Ride-Booking App/i });
    await expect(webdriver).toHaveAttribute('href', /github\.com.*E2E-webdriverIO/);
  });
});
