/**
 * Shared Playwright helpers for MRJOHN5ON.github.io tests.
 *
 * Assumptions:
 * - baseURL in config points to the site (e.g. http://localhost:8080 or production).
 * - getByRole/getByText are preferred; data-testid and placeholder used where needed.
 */

/**
 * Fill the homepage contact form (name, email, message).
 * Does not submit.
 * @param {import('@playwright/test').Page} page
 * @param {{ name: string, email: string, message: string }} data
 */
async function fillContactForm(page, { name, email, message }) {
  await page.getByPlaceholder('Name').fill(name);
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('message').fill(message);
}

/**
 * Submit the contact form by clicking the Send button.
 * @param {import('@playwright/test').Page} page
 */
async function submitContactForm(page) {
  await page.getByRole('button', { name: /Send/i }).click();
}

/**
 * Click a nav link on the homepage by visible text (e.g. Home, About, Projects, Contact).
 * Uses data-testid when available for stability.
 * @param {import('@playwright/test').Page} page
 * @param {'Home'|'About'|'Projects'|'Contact'} linkText
 */
async function clickHomepageNav(page, linkText) {
  const testIds = { Home: 'Nav-menu-home', About: 'Nav-menu-about', Projects: 'Nav-menu-projects', Contact: 'Nav-menu-contact' };
  const testId = testIds[linkText];
  if (testId) {
    await page.getByTestId(testId).click();
  } else {
    await page.getByRole('link', { name: linkText }).first().click();
  }
}

/**
 * Click a footer nav link on the homepage (Home, About, Projects, Contact).
 * @param {import('@playwright/test').Page} page
 * @param {string} linkText
 */
async function clickFooterNav(page, linkText) {
  await page.getByRole('contentinfo').getByRole('link', { name: linkText }).click();
}

/**
 * Open the mobile menu on the homepage (hamburger icon).
 * Uses class selector because the trigger is an <i> with no accessible name.
 * @param {import('@playwright/test').Page} page
 */
async function openMobileMenu(page) {
  await page.locator('.nav-menu-btn').click();
}

/**
 * Navigate to a project page by path (e.g. 'project1.html', 'socialqa.html').
 * @param {import('@playwright/test').Page} page
 * @param {string} path
 */
async function goToPage(page, path) {
  await page.goto(path);
}

/**
 * Viewport sizes used for responsive tests (mobile, tablet, desktop).
 */
const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
};

module.exports = {
  fillContactForm,
  submitContactForm,
  clickHomepageNav,
  clickFooterNav,
  openMobileMenu,
  goToPage,
  VIEWPORTS,
};
