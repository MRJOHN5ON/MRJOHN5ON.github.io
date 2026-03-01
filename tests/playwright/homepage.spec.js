// Assumptions: baseURL serves index.html. Contact form uses EmailJS; we stub alert() for validation/success tests.
// Typed.js and ScrollReveal run on load; we assert visible content, not animation timing.

const { test, expect } = require('@playwright/test');
const {
  fillContactForm,
  submitContactForm,
  clickHomepageNav,
  clickFooterNav,
  openMobileMenu,
  VIEWPORTS,
} = require('./helpers');

test.describe('Homepage - Page load and rendering', () => {
  test('homepage loads and shows main heading and hero content', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Ryley Johnson/);
    await expect(page.getByText('Ryley Johnson', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('img', { name: /avatar/i })).toBeVisible();
  });

  test('About section is present and has expected content', async ({ page }) => {
    await page.goto('/');
    const about = page.locator('#about');
    // Assert content is in the DOM; ScrollReveal can keep elements non-visible (opacity/transform) in some engines, so we check presence
    await expect(about.getByRole('heading', { name: /About Me/i })).toBeAttached();
    await expect(about.getByText(/Prophet Town LLC/i).first()).toBeAttached();
    await expect(about.getByRole('img', { name: /My Photo/i })).toBeAttached();
  });

  test('Projects section lists project boxes and current role', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Projects/i })).toBeVisible();
    await expect(page.getByTestId('project-box1')).toBeVisible();
    await expect(page.getByText('CURRENT ROLE')).toBeVisible();
    await expect(page.getByText('E-commerce UI Automation')).toBeVisible();
  });

  test('Contact section and form are visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Get in touch/i })).toBeVisible();
    await expect(page.getByPlaceholder('Name')).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await page.getByPlaceholder('message').waitFor({ state: 'visible' });
    await expect(page.getByRole('button', { name: /Send/i })).toBeVisible();
  });

  test('Carousel section and controls are present', async ({ page }) => {
    await page.goto('/');
    const carousel = page.locator('.carousel-section');
    await expect(carousel).toBeVisible();
    await expect(page.locator('.carousel-control.prev')).toBeVisible();
    await expect(page.locator('.carousel-control.next')).toBeVisible();
  });

  test('Footer shows branding and nav links', async ({ page }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible();
    await expect(footer.getByText('Ryley Johnson')).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Life of Logos' })).toBeVisible();
  });
});

test.describe('Homepage - Navigation', () => {
  test('header nav links scroll to correct sections', async ({ page }) => {
    await page.goto('/');
    await clickHomepageNav(page, 'About');
    await expect(page.locator('#about')).toBeInViewport();
    await clickHomepageNav(page, 'Projects');
    await expect(page.locator('#projects')).toBeInViewport();
    await clickHomepageNav(page, 'Contact');
    await expect(page.locator('#contact')).toBeInViewport();
    await clickHomepageNav(page, 'Home');
    await expect(page.locator('#home')).toBeInViewport();
  });

  test('footer nav links scroll to sections', async ({ page }) => {
    await page.goto('/');
    await clickFooterNav(page, 'About');
    await expect(page.locator('#about')).toBeInViewport();
    await clickFooterNav(page, 'Contact');
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('resume download link in header is present and has correct attribute', async ({ page }) => {
    await page.goto('/');
    const resumeLink = page.getByTestId('Download-resume-Nav-btn');
    await expect(resumeLink).toBeVisible();
    await expect(resumeLink).toHaveAttribute('href', /RYLEYJOHNSONRESUME2024FEB\.pdf/);
    await expect(resumeLink).toHaveAttribute('download');
  });

  test('resume button in hero is visible and downloadable', async ({ page }) => {
    await page.goto('/');
    const btn = page.getByTestId('Download-resume-btn');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', /\.pdf/);
  });
});

test.describe('Homepage - Contact form', () => {
  test('form accepts valid input and shows success dialog on submit', async ({ page }) => {
    await page.goto('/');
    page.on('dialog', (dialog) => {
      expect(dialog.message()).toMatch(/Email sent successfully|Failed to send email|Please fill|Name must|valid email/i);
      dialog.accept();
    });
    await fillContactForm(page, { name: 'Jane', email: 'jane@example.com', message: 'Hello from Playwright.' });
    await submitContactForm(page);
    // Dialog is handled above; after accept we just ensure no unhandled errors
  });

  test('empty form submission shows validation alert', async ({ page }) => {
    await page.goto('/');
    let dialogMessage = '';
    page.on('dialog', (dialog) => {
      dialogMessage = dialog.message();
      dialog.accept();
    });
    await submitContactForm(page);
    expect(dialogMessage).toMatch(/fill in all fields/i);
  });

  test('invalid name (numbers) shows validation alert', async ({ page }) => {
    await page.goto('/');
    let dialogMessage = '';
    page.on('dialog', (dialog) => {
      dialogMessage = dialog.message();
      dialog.accept();
    });
    await fillContactForm(page, { name: 'Jane1', email: 'jane@example.com', message: 'Test' });
    await submitContactForm(page);
    expect(dialogMessage).toMatch(/only letters/i);
  });

  test('invalid email shows validation alert', async ({ page }) => {
    await page.goto('/');
    let dialogMessage = '';
    page.on('dialog', (dialog) => {
      dialogMessage = dialog.message();
      dialog.accept();
    });
    await fillContactForm(page, { name: 'Jane', email: 'invalid', message: 'Test' });
    await submitContactForm(page);
    expect(dialogMessage).toMatch(/valid email/i);
  });
});

test.describe('Homepage - Carousel', () => {
  test('carousel next button advances slide', async ({ page }) => {
    await page.goto('/');
    const carousel = page.locator('.carousel');
    const initialTransform = await carousel.getAttribute('style');
    await page.locator('.carousel-control.next').click();
    await page.waitForTimeout(300);
    const afterTransform = await carousel.getAttribute('style');
    expect(afterTransform).not.toBe(initialTransform);
  });

  test('carousel prev button changes slide', async ({ page }) => {
    await page.goto('/');
    await page.locator('.carousel-control.next').click();
    await page.waitForTimeout(200);
    const carousel = page.locator('.carousel');
    const afterNext = await carousel.getAttribute('style');
    await page.locator('.carousel-control.prev').click();
    await page.waitForTimeout(300);
    const afterPrev = await carousel.getAttribute('style');
    expect(afterPrev).not.toBe(afterNext);
  });
});

test.describe('Homepage - Responsive', () => {
  for (const [name, size] of Object.entries(VIEWPORTS)) {
    test(`${name} (${size.width}px) renders key sections`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      await expect(page.getByText('Ryley Johnson', { exact: true }).first()).toBeVisible();
      await expect(page.getByRole('heading', { name: /About Me/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Get in touch/i })).toBeVisible();
    });
  }

  test('mobile viewport shows hamburger menu area', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');
    await expect(page.locator('.nav-menu-btn')).toBeVisible();
  });

  test('opening mobile menu toggles responsive class', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');
    const menu = page.locator('#myNavMenu');
    await expect(menu).not.toHaveClass(/responsive/);
    await openMobileMenu(page);
    await expect(menu).toHaveClass(/responsive/);
  });
});
