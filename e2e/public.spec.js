// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Home page', () => {
  test('loads without errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/');
    await expect(page).toHaveURL('/');
    expect(errors.filter((e) => !e.includes('Failed to fetch'))).toHaveLength(0);
  });

  test('has a navigation bar with site brand', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav, header');
    await expect(nav.first()).toBeVisible();
  });

  test('has links to missions and rockets', async ({ page }) => {
    await page.goto('/');
    const missionLink = page.locator('a[href="/missions"]');
    const rocketLink = page.locator('a[href="/rockets"]');
    await expect(missionLink.first()).toBeVisible();
    await expect(rocketLink.first()).toBeVisible();
  });
});

test.describe('Missions public page', () => {
  test('loads and shows the missions heading', async ({ page }) => {
    await page.goto('/missions');
    await expect(page.locator('h1, h2').filter({ hasText: /mission/i }).first()).toBeVisible({
      timeout: 10_000,
    });
  });

  test('URL is /missions', async ({ page }) => {
    await page.goto('/missions');
    await expect(page).toHaveURL('/missions');
  });
});

test.describe('Rockets public page', () => {
  test('loads and shows the rockets heading', async ({ page }) => {
    await page.goto('/rockets');
    await expect(page.locator('h1, h2').filter({ hasText: /razz|rocket/i }).first()).toBeVisible({
      timeout: 10_000,
    });
  });
});

test.describe('Agencies public page', () => {
  test('loads and shows the agencies heading', async ({ page }) => {
    await page.goto('/agencies');
    await expect(page.locator('h1, h2').filter({ hasText: /agenz|agenc/i }).first()).toBeVisible({
      timeout: 10_000,
    });
  });
});

test.describe('Navigation', () => {
  test('clicking missions link navigates to /missions', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href="/missions"]').first().click();
    await expect(page).toHaveURL('/missions');
  });

  test('login page is accessible from /login', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL('/login');
  });

  test('/admin redirects unauthenticated users away', async ({ page }) => {
    await page.goto('/admin');
    // Should redirect to login (not stay on /admin)
    await page.waitForURL((url) => !url.pathname.startsWith('/admin'), { timeout: 5_000 });
    expect(page.url()).not.toContain('/admin');
  });

  test('/dashboard redirects unauthenticated users away', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL((url) => !url.pathname.startsWith('/dashboard'), { timeout: 5_000 });
    expect(page.url()).not.toContain('/dashboard');
  });
});
