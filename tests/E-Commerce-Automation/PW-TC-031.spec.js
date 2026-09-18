// Practice Test Case #31 — Verify Product List

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

test('Verify product list', async ({ page }) => {
  // Open SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByRole('textbox', {
    name: 'Username'
  }).fill('standard_user');

  await page.getByRole('textbox', {
    name: 'Password'
  }).fill('secret_sauce');

  await page.getByRole('button', {
    name: 'Login'
  }).click();

  // Verify Inventory page
  await expect(page).toHaveURL(/inventory\.html/);

  // Locate all product cards
  const products = page.locator('.inventory_item');

  // Verify product list contains 6 products
  await expect(products).toHaveCount(6);

  const count = await products.count();

  // Verify every product card is visible
  for (let i = 0; i < count; i++) {
    await expect(products.nth(i)).toBeVisible();
  }
});