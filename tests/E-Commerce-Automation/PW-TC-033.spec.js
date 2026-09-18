// Practice Test Case #33 — Verify product prices — Data extraction

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


test('TC33 - Verify product prices', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory\.html/);

  // Expected product prices
  const expectedPrices = [
    '$29.99',
    '$9.99',
    '$15.99',
    '$49.99',
    '$7.99',
    '$15.99'
  ];

  // Locate all product prices
  const priceElements = page.locator('.inventory_item_price');

  // Verify number of prices
  await expect(priceElements).toHaveCount(expectedPrices.length);

  // Extract and verify each price
  for (let i = 0; i < expectedPrices.length; i++) {
    const actualPrice = await priceElements.nth(i).textContent();
    expect(actualPrice?.trim()).toBe(expectedPrices[i]);
  }
});