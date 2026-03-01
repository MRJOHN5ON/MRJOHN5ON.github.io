# Playwright Test Suite

These Playwright scripts were **generated with agentic AI as an experiment to review and audit** the [live site](https://mrjohn5on.github.io/). Assumptions and scope are noted at the top of each spec file.

## Run tests

1. **Install dependencies**
   ```bash
   npm install
   npx playwright install
   ```

2. **Run** (default `baseURL` is **https://mrjohn5on.github.io**)
   - To test against a local server instead: `BASE_URL=http://localhost:8080 npm test` (run `npx serve . -p 8080` in another terminal first).
   ```bash
   npm test
   ```
   - Suite runs in Chromium only (see playwright.config.js).
   - Headed: `npm run test:headed`
   - UI: `npm run test:ui`
   - Report: `npm run report`

## Structure

- **playwright.config.js** (project root) – Chromium only; `tests/playwright` as test dir.
- **helpers.js** – Shared actions: `fillContactForm`, `submitContactForm`, `clickHomepageNav`, `clickFooterNav`, `openMobileMenu`, `goToPage`, `VIEWPORTS`.
- **homepage.spec.js** – Load, nav, contact form (valid/invalid/empty), carousel, responsive.
- **project1.spec.js** – API Testing with Postman page.
- **project2.spec.js** – Android Emulation page.
- **project3.spec.js** – SDLC / Testing Practices page.
- **project4.spec.js** – Bug Jam Experience page.
- **supernova.spec.js** – Supernova Internship report.
- **urbanscooters.spec.js** – Urban Scooter project (menu toggle, in-page nav).
- **socialqa.spec.js** – Social QA Bootcamp page.
- **navigation.spec.js** – Cross-page routing from homepage to projects and back.

## Conventions

- JavaScript (not TypeScript).
- Prefer `getByRole()` and `getByText()`; `getByTestId()` used where present in HTML.
- Descriptive test names; comments for non-obvious behavior (e.g. dialog stubbing for contact form).
