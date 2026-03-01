// Assumptions: project4.html is the Bug Jam Experience page. script4.js adds smooth scroll for anchor links.
// External links (YouTube, Netlify, LinkedIn, Google Sheets) are not followed; we assert presence and attributes.

const { test, expect } = require('@playwright/test');

// --- Constants: single source of truth for URLs, selectors, viewports ---
const PAGE_PATH = '/project4.html';
const YOUTUBE_VIDEO_ID = 'z2b-5Ltrn7M';
const GOOGLE_SHEETS_EMBED_ID = '1jeu6KwbMZz-VEAK7aUesCdSq305SYgqw1qtmnDRH6QI';
const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
};

async function gotoProject4(page) {
  await page.goto(PAGE_PATH);
  await page.waitForLoadState('domcontentloaded');
}

/** Scroll element into view before visibility assertions (avoids flakiness for below-fold content). */
async function ensureVisible(page, locator) {
  await locator.scrollIntoViewIfNeeded();
  await expect(locator).toBeVisible();
}

// ==================== Document & meta ====================
test.describe('Project4 - Document & meta', () => {
  test('page has correct document title', async ({ page }) => {
    await gotoProject4(page);
    await expect(page).toHaveTitle(/Bug Jam Experience/i);
  });

  test('page has one main h1 (semantic structure)', async ({ page }) => {
    await gotoProject4(page);
    const h1s = page.getByRole('heading', { level: 1 });
    await expect(h1s).toHaveCount(1);
    await expect(h1s).toHaveText(/Bug Jam Experience/i);
  });

  test('viewport meta is present for responsive behavior', async ({ page }) => {
    await gotoProject4(page);
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });
});

// ==================== Header ====================
test.describe('Project4 - Header', () => {
  test('header displays main title', async ({ page }) => {
    await gotoProject4(page);
    await ensureVisible(page, page.getByRole('heading', { name: /Bug Jam Experience/i, level: 1 }));
  });

  test('header is within landmark', async ({ page }) => {
    await gotoProject4(page);
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('header').getByRole('heading', { name: /Bug Jam Experience/i })).toBeVisible();
  });
});

// ==================== Intro section ====================
test.describe('Project4 - Intro section', () => {
  test('intro shows date August 2024', async ({ page }) => {
    await gotoProject4(page);
    await ensureVisible(page, page.getByText('August 2024'));
  });

  test('intro describes Bug Jam competition and first place', async ({ page }) => {
    await gotoProject4(page);
    await ensureVisible(page, page.getByText(/Bug Jam.*competition/i));
    await ensureVisible(page, page.getByText(/first place/i));
  });

  test('intro mentions TripleTen bootcamp', async ({ page }) => {
    await gotoProject4(page);
    await ensureVisible(page, page.getByText(/TripleTen/i));
  });

  test('intro has "Check Out the Website We Tested" subheading', async ({ page }) => {
    await gotoProject4(page);
    await ensureVisible(page, page.getByRole('heading', { name: /Check Out the Website We Tested/i, level: 2 }));
  });
});

// ==================== Video embed ====================
test.describe('Project4 - Video embed', () => {
  test('YouTube iframe is present and visible', async ({ page }) => {
    await gotoProject4(page);
    const iframe = page.locator('iframe[title="YouTube video player"]');
    await ensureVisible(page, iframe);
  });

  test('YouTube iframe has correct embed URL and video ID', async ({ page }) => {
    await gotoProject4(page);
    const iframe = page.locator('iframe[title="YouTube video player"]');
    await expect(iframe).toHaveAttribute('src', new RegExp(`youtube\\.com/embed/${YOUTUBE_VIDEO_ID}`));
  });

  test('YouTube iframe has non-zero dimensions (playable area)', async ({ page }) => {
    await gotoProject4(page);
    const iframe = page.locator('iframe[title="YouTube video player"]');
    await iframe.waitFor({ state: 'attached' });
    const box = await iframe.boundingBox();
    expect(box).not.toBeNull();
    expect(box.width).toBeGreaterThan(0);
    expect(box.height).toBeGreaterThan(0);
  });

  test('YouTube iframe has allow attributes for playback', async ({ page }) => {
    await gotoProject4(page);
    const iframe = page.locator('iframe[title="YouTube video player"]');
    const allow = await iframe.getAttribute('allow');
    expect(allow).toMatch(/accelerometer|encrypted-media|autoplay/i);
  });

  test('YouTube iframe has allowfullscreen', async ({ page }) => {
    await gotoProject4(page);
    const iframe = page.locator('iframe[title="YouTube video player"]');
    await expect(iframe).toHaveAttribute('allowfullscreen', '');
  });
});

// ==================== Links (coverage & robustness) ====================
test.describe('Project4 - Links', () => {
  test('Summer Adventure link is visible, has correct href and opens in new tab', async ({ page }) => {
    await gotoProject4(page);
    const link = page.getByRole('link', { name: /Summer Adventure/i });
    await ensureVisible(page, link);
    await expect(link).toHaveAttribute('href', /summeradventure\.netlify\.app/);
    await expect(link).toHaveAttribute('target', '_blank');
  });

  const teammateLinks = [
    { name: 'Jasmine Dardy', href: /linkedin\.com\/in\/jasmine-dardy/ },
    { name: 'Noah Arbaugh', href: /linkedin\.com\/in\/noah-arbaugh/ },
  ];
  for (const { name, href } of teammateLinks) {
    test(`${name} teammate link points to LinkedIn`, async ({ page }) => {
      await gotoProject4(page);
      const link = page.getByRole('link', { name: new RegExp(name, 'i') });
      await ensureVisible(page, link);
      await expect(link).toHaveAttribute('href', href);
    });
  }

  test('OPEN PDF HERE link has PDF href and opens in new tab', async ({ page }) => {
    await gotoProject4(page);
    const link = page.getByRole('link', { name: /OPEN PDF HERE/i });
    await ensureVisible(page, link);
    await expect(link).toHaveAttribute('href', /\.pdf$/i);
    await expect(link).toHaveAttribute('target', '_blank');
  });

  const footerNavLinks = [
    { name: /Home Page/i, href: 'index.html', testName: 'Home Page link points to index' },
    { name: /Project Bank/i, href: /#projects|mrjohn5on\.github\.io.*projects/, testName: 'Project Bank link points to projects' },
  ];
  for (const { name, href, testName } of footerNavLinks) {
    test(`footer ${testName}`, async ({ page }) => {
      await gotoProject4(page);
      const link = page.getByRole('link', { name });
      await ensureVisible(page, link);
      await expect(link).toHaveAttribute('href', href);
    });
  }

  test('footer contact email link has mailto href', async ({ page }) => {
    await gotoProject4(page);
    const link = page.getByRole('link', { name: /ryleyjohnsonemail@gmail\.com/i });
    await ensureVisible(page, link);
    await expect(link).toHaveAttribute('href', /^mailto:/);
  });
});

// ==================== Sections (full content coverage) ====================
test.describe('Project4 - Sections content', () => {
  test('Meet the Team section has heading and teammate names', async ({ page }) => {
    await gotoProject4(page);
    const section = page.locator('section.team');
    await ensureVisible(page, section.getByRole('heading', { name: /Meet the Team/i }));
    await ensureVisible(page, section.getByText(/Jasmine Dardy/));
    await ensureVisible(page, section.getByText(/Noah Arbaugh/));
    await ensureVisible(page, section.getByText(/STLC/));
  });

  test('Tools & Techniques section mentions Chrome DevTools', async ({ page }) => {
    await gotoProject4(page);
    const section = page.locator('section.tools');
    await ensureVisible(page, section.getByRole('heading', { name: /Tools & Techniques/i }));
    await ensureVisible(page, section.getByText(/Chrome DevTools/i));
  });

  test('Bug Tracking with Jira section has heading and screenshot', async ({ page }) => {
    await gotoProject4(page);
    const section = page.locator('section.jira');
    await ensureVisible(page, section.getByRole('heading', { name: /Bug Tracking with Jira/i }));
    await ensureVisible(page, section.getByText(/Jira bug tracking template/i));
    const img = section.getByRole('img', { name: /Jira Bug Tracking Template Screenshot/i });
    await ensureVisible(page, img);
    await expect(img).toHaveAttribute('src', /jira-screenshot\.png/);
  });

  test('Test Case Sheet section has heading and Google Sheets iframe', async ({ page }) => {
    await gotoProject4(page);
    const section = page.locator('section.sheet');
    await ensureVisible(page, section.getByRole('heading', { name: /Test Case Sheet/i }));
    const iframe = section.locator('iframe[src*="docs.google.com"]');
    await ensureVisible(page, iframe);
    await expect(iframe).toHaveAttribute('src', new RegExp(GOOGLE_SHEETS_EMBED_ID.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });

  test('Judges section has call-to-action and PDF link', async ({ page }) => {
    await gotoProject4(page);
    const section = page.locator('section.judges');
    await ensureVisible(page, section.getByText(/Full Judges Review.*Scorecard/i));
    await ensureVisible(page, section.getByRole('link', { name: /OPEN PDF HERE/i }));
  });

  test('Reflection section has heading and key takeaways', async ({ page }) => {
    await gotoProject4(page);
    const section = page.locator('section.reflection');
    await ensureVisible(page, section.getByRole('heading', { name: /Reflection/i }));
    await ensureVisible(page, section.getByText(/DevTools|thorough testing/i));
    await ensureVisible(page, section.getByText(/intense but incredibly rewarding/i));
  });
});

// ==================== Footer ====================
test.describe('Project4 - Footer', () => {
  test('footer has copyright and contact', async ({ page }) => {
    await gotoProject4(page);
    const footer = page.locator('footer');
    await ensureVisible(page, footer.getByText(/© 2024 Ryley Johnson/i));
    await ensureVisible(page, footer.getByText(/Contact me:/i));
  });

  test('footer contains all expected links', async ({ page }) => {
    await gotoProject4(page);
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: /Home Page/i })).toHaveCount(1);
    await expect(footer.getByRole('link', { name: /Project Bank/i })).toHaveCount(1);
    await expect(footer.getByRole('link', { name: /ryleyjohnsonemail/i })).toHaveCount(1);
  });
});

// ==================== Images ====================
test.describe('Project4 - Images', () => {
  test('Jira screenshot image has alt text', async ({ page }) => {
    await gotoProject4(page);
    const img = page.getByRole('img', { name: /Jira Bug Tracking Template Screenshot/i });
    await ensureVisible(page, img);
    await expect(img).toHaveAttribute('alt', /Jira.*Screenshot/i);
  });
});

// ==================== Responsive ====================
test.describe('Project4 - Responsive', () => {
  for (const [label, size] of Object.entries(VIEWPORTS)) {
    test(`key content visible at ${label} (${size.width}px)`, async ({ page }) => {
      await page.setViewportSize(size);
      await gotoProject4(page);
      await ensureVisible(page, page.getByRole('heading', { name: /Bug Jam Experience/i }));
      await ensureVisible(page, page.locator('iframe[title="YouTube video player"]'));
      await ensureVisible(page, page.getByRole('heading', { name: /Reflection/i }));
    });
  }

  test('no horizontal overflow at mobile viewport', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await gotoProject4(page);
    const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(noOverflow).toBe(true);
  });
});

// ==================== Edge & robustness ====================
test.describe('Project4 - Edge & robustness', () => {
  test('page loads without critical errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await gotoProject4(page);
    await page.waitForLoadState('networkidle').catch(() => {});
    expect(errors.filter((m) => m.includes('Cannot read') || m.includes('undefined')).length).toBe(0);
  });

  test('all sections are present in DOM', async ({ page }) => {
    await gotoProject4(page);
    const sections = page.locator('body > section');
    await expect(sections).toHaveCount(7);
  });

  test('smooth-scroll script is loaded', async ({ page }) => {
    await gotoProject4(page);
    const script = page.locator('script[src*="script4.js"]');
    await expect(script).toHaveCount(1);
  });
});
