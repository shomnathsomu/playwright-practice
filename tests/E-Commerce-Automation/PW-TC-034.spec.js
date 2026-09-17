// Practice Test Case #34 — Remove a Product from Cart

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

test('Verify product can be removed from shopping cart', async ({ page }) => {
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

  // Products to add
  const products = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt'
  ];

  // Add products
  for (const productName of products) {
    const productCard = page.locator('.inventory_item').filter({
      hasText: productName
    });

    await productCard.getByRole('button', {
      name: 'Add to cart'
    }).click();
  }

  // Verify initial cart count
  const cartBadge = page.locator('.shopping_cart_badge');

  await expect(cartBadge).toHaveText('3');

  // Open cart
  await page.locator('a.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart\.html/);

  // Verify all three products are present
  for (const productName of products) {
    await expect(
      page.getByText(productName, {
        exact: true
      })
    ).toBeVisible();
  }

  // Remove Sauce Labs Bike Light
  const bikeLightItem = page.locator('.cart_item').filter({
    hasText: 'Sauce Labs Bike Light'
  });

  await bikeLightItem.getByRole('button', {
    name: 'Remove'
  }).click();

  // Verify removed product is no longer visible
  await expect(
    page.getByText('Sauce Labs Bike Light', {
      exact: true
    })
  ).not.toBeVisible();

  // Verify remaining products
  await expect(
    page.getByText('Sauce Labs Backpack', {
      exact: true
    })
  ).toBeVisible();

  await expect(
    page.getByText('Sauce Labs Bolt T-Shirt', {
      exact: true
    })
  ).toBeVisible();

  // Verify exactly two products remain
  await expect(
    page.locator('.cart_item')
  ).toHaveCount(2);

  // Verify cart badge is updated
  await expect(cartBadge).toHaveText('2');
});