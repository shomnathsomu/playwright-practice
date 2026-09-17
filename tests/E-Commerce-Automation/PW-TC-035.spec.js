// Practice Test Case #35 — Cart Persistence During Navigation

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

test('Verify cart contents persist during navigation', async ({ page }) => {
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

  // Locate Sauce Labs Backpack
  const productCard = page.locator('.inventory_item').filter({
    hasText: 'Sauce Labs Backpack'
  });

  // Add Backpack to cart
  await productCard.getByRole('button', {
    name: 'Add to cart'
  }).click();

  // Verify cart badge
  const cartBadge = page.locator('.shopping_cart_badge');

  await expect(cartBadge).toHaveText('1');

  // Go to Cart
  await page.locator('a.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart\.html/);

  // Verify Backpack is in cart
  await expect(
    page.getByText('Sauce Labs Backpack', {
      exact: true
    })
  ).toBeVisible();

  // Navigate back to Inventory
  await page.locator('#continue-shopping').click();

  await expect(page).toHaveURL(/inventory\.html/);

  // Verify cart badge still shows 1
  await expect(cartBadge).toHaveText('1');

  // Go to Cart again
  await page.locator('a.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart\.html/);

  // Verify Backpack is still in cart
  await expect(
    page.getByText('Sauce Labs Backpack', {
      exact: true
    })
  ).toBeVisible();

  // Verify exactly one item exists
  await expect(
    page.locator('.cart_item')
  ).toHaveCount(1);
});