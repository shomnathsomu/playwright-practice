// Practice Test Case #5 — Click a Button and Verify the Result

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
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

test('Add product to cart and verify cart count', async ({ page }) => {

  // 1. Navigate to SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // 2. Login
  await page.getByRole('textbox', { name: 'Username' })
    .fill('standard_user');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' })
    .click();

  // 3. Add Sauce Labs Backpack to cart
  await page.getByRole('button', {
    name: 'Add to cart'
  }).first().click();

  // 4. Verify cart badge
  const cartBadge = page.locator('.shopping_cart_badge');

  await expect(cartBadge).toHaveText('1');
});