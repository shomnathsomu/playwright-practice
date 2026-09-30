// Practice Test Case #89 — Mock API Response

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

test('TC89 - Mock API response', async ({ page }) => {

  // Mock API response
  await page.route('**/api/products', async route => {

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        products: [
          {
            id: 101,
            name: 'Playwright Laptop',
            price: 999
          },
          {
            id: 102,
            name: 'Automation Mouse',
            price: 49
          }
        ]
      })
    });
  });

  // Example application page
  await page.goto('https://automationexercise.com/products');

  // The route above is now available for
  // any request matching **/api/products.
});