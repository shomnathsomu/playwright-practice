// Practice Test Case #37 — Verify cart item count — Assertions

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

test('TC37 - Verify cart item count', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByRole('textbox', { name: 'Username' })
    .fill('standard_user');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' })
    .click();

  await expect(page).toHaveURL(/inventory\.html/);

  // Products to add
  const productsToAdd = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt'
  ];

  // Add products
  for (const productName of productsToAdd) {
    const productCard = page.locator('.inventory_item').filter({
      hasText: productName
    });

    await expect(productCard).toBeVisible();

    await productCard.getByRole('button', {
      name: 'Add to cart'
    }).click();
  }

  // Expected number of cart items
  const expectedCartCount = productsToAdd.length;

  // Verify cart badge
  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText(String(expectedCartCount));

  // Open cart
  await page.locator('a.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart\.html/);

  // Verify actual cart item count
  const cartItems = page.locator('.cart_item');

  await expect(cartItems).toHaveCount(expectedCartCount);
});