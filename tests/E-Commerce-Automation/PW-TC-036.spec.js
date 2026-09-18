// Practice Test Case #36 — Remove product from cart — State validation

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


test('TC36 - Remove product from cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByRole('textbox', { name: 'Username' })
    .fill('standard_user');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' })
    .click();

  await expect(page).toHaveURL(/inventory\.html/);

  // Product to add
  const productName = 'Sauce Labs Backpack';

  // Locate product card
  const productCard = page.locator('.inventory_item').filter({
    hasText: productName
  });

  // Add product
  await productCard.getByRole('button', {
    name: 'Add to cart'
  }).click();

  // Verify cart badge
  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText('1');

  // Open cart
  await page.locator('a.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart\.html/);

  // Verify product is in cart
  const cartItem = page.locator('.cart_item').filter({
    hasText: productName
  });

  await expect(cartItem).toBeVisible();

  // Remove product
  await cartItem.getByRole('button', {
    name: 'Remove'
  }).click();

  // Verify product is removed
  await expect(cartItem).toBeHidden();

  // Verify cart is empty
  await expect(
    page.locator('.cart_item')
  ).toHaveCount(0);

  // Verify cart badge is no longer visible
  await expect(
    page.locator('.shopping_cart_badge')
  ).toBeHidden();
});