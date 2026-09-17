// Practice Test Case #32 — Add a Specific Product to Cart

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

test('Verify specific product can be added to cart', async ({ page }) => {
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

  // Verify inventory page
  await expect(page).toHaveURL(/inventory\.html/);

  // Locate Sauce Labs Backpack product card
  const productCard = page.locator('.inventory_item').filter({
    hasText: 'Sauce Labs Backpack'
  });

  // Verify product is displayed
  await expect(productCard).toBeVisible();

  // Click Add to Cart for this specific product
  await productCard.getByRole('button', {
    name: 'Add to cart'
  }).click();

  // Verify cart badge
  const cartBadge = page.locator('.shopping_cart_badge');

  await expect(cartBadge).toHaveText('1');

  // Open cart
  await page.locator('#shopping_cart_container').click();

  // Verify cart page
  await expect(page).toHaveURL(/cart\.html/);

  // Verify correct product is in cart
  await expect(
    page.getByText('Sauce Labs Backpack', {
      exact: true
    })
  ).toBeVisible();
});