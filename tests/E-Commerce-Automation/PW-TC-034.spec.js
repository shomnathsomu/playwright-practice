// Practice Test Case #34 — Add one product to cart — E2E flow

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

test('TC34 - Add one product to cart', async ({ page }) => {
  // Open application
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByRole('textbox', { name: 'Username' })
    .fill('standard_user');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' })
    .click();

  // Verify inventory page
  await expect(page).toHaveURL(/inventory\.html/);

  // Select product
  const productName = 'Sauce Labs Backpack';

  const productCard = page.locator('.inventory_item').filter({
    hasText: productName
  });

  // Verify product is visible
  await expect(productCard).toBeVisible();

  // Add product to cart
  await productCard.getByRole('button', {
    name: 'Add to cart'
  }).click();

  // Verify cart badge
  const cartBadge = page.locator('.shopping_cart_badge');

  await expect(cartBadge).toHaveText('1');

  // Open cart
  await page.locator('a.shopping_cart_link').click();

  // Verify cart page
  await expect(page).toHaveURL(/cart\.html/);

  // Verify product exists in cart
  await expect(
    page.getByText(productName, { exact: true })
  ).toBeVisible();

  // Verify price
  await expect(
    page.getByText('$29.99', { exact: true })
  ).toBeVisible();
});