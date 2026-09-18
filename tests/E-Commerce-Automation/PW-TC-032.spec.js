// Practice Test Case #32 — Verify product names — Text assertions

import { test, expect } from '@playwright/test';

test.use({
    viewport: {
        height: 1080,
        width: 1920
    },

    // Wait 1 second after each Playwright operation    
    launchOptions:{
        slowMo: 1000
    }
});

// Increase timeout because slowMo makes the test take longer
test.beforeEach(async () => {
    test.setTimeout(120_000);
});


test('TC32 - Verify product names', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory\.html/);

  // Expected product names
  const expectedProducts = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)'
  ];

  // Product-name locator
  const productNames = page.locator('.inventory_item_name');

  // Verify product count
  await expect(productNames).toHaveCount(expectedProducts.length);

  // Verify each product name
  for (let i = 0; i < expectedProducts.length; i++) {
    await expect(productNames.nth(i))
      .toHaveText(expectedProducts[i]);
  }
});