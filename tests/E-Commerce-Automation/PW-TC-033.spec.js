// Practice Test Case #33 — Add Multiple Products to Cart

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

test('Verify multiple products can be added to cart', async ({ page }) => {
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

  // Products to add
  const products = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt'
  ];

  // Add each product
  for (const productName of products) {
    const productCard = page.locator('.inventory_item').filter({
      hasText: productName
    });

    await expect(productCard).toBeVisible();

    await productCard.getByRole('button', {
      name: 'Add to cart'
    }).click();
  }

  // Verify cart badge
  const cartBadge = page.locator('.shopping_cart_badge');

  await expect(cartBadge).toHaveText('3');

  // Open cart
  await page.locator('a.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart\.html/);

  // Verify selected products are present
  for (const productName of products) {
    await expect(
      page.getByText(productName, {
        exact: true
      })
    ).toBeVisible();
  }

  // Verify exactly 3 cart items
  await expect(
    page.locator('.cart_item')
  ).toHaveCount(3);
});
