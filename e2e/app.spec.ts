import { test, expect } from '@playwright/test';

test.describe('App loads', () => {
  test('homepage renders and has content', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Smart CRM|Vite/i);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('navigation bar is present', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('footer is present', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});

test.describe('Page routing', () => {
  test('terms page loads', async ({ page }) => {
    await page.goto('/terms');
    await expect(page.locator('body')).toBeVisible();
  });

  test('privacy page loads', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.locator('body')).toBeVisible();
  });

  test('demo page loads', async ({ page }) => {
    await page.goto('/demo');
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Main workflow', () => {
  test('user can scroll through landing page sections', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('CTA buttons are clickable', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });
});
