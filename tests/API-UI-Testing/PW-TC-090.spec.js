// Practice Test Case #90 — Simulate API Failure and Verify UI Behavior

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
  },

  ignoreHTTPSErrors: true,

  launchOptions: {
    slowMo: 1000
  }
});

test.beforeEach(async () => {
  test.setTimeout(120_000);
});


test('TC90 - Diagnose API request', async ({ page }) => {

  let intercepted = false;

  await page.route(
    '**/api/searchProduct',
    async route => {

      intercepted = true;

      console.log('INTERCEPTED REQUEST');
      console.log('Method:', route.request().method());
      console.log('URL:', route.request().url());
      console.log('Body:', route.request().postData());

      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          responseCode: 500,
          message: 'Internal Server Error'
        })
      });
    }
  );

  await page.goto(
    'https://automationexercise.com/products'
  );

  await page
    .getByPlaceholder('Search Product')
    .fill('top');

  await page.locator('#submit_search').click();

  console.log(
    'Was /api/searchProduct intercepted?',
    intercepted
  );

  console.log(
    'Final URL:',
    page.url()
  );
});