// Practice Test Case #41 — Verify lowest-priced product — Data handling

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

test('TC41 - Verify lowest-priced product', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByRole('textbox', { name: 'Username' })
    .fill('standard_user');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' })
    .click();

  await expect(page).toHaveURL(/inventory\.html/);

  // Get all product cards
  const products = page.locator('.inventory_item');

  // Extract product names and prices
  const productData = await products.evaluateAll(items =>
    items.map(item => {
      const name = item
        .querySelector('.inventory_item_name')
        ?.textContent
        ?.trim();

      const priceText = item
        .querySelector('.inventory_item_price')
        ?.textContent
        ?.trim();

      const price = Number(priceText?.replace('$', ''));

      return {
        name,
        price
      };
    })
  );

  console.log(productData);

  // Find the lowest-priced product
  const lowestPricedProduct = productData.reduce((lowest, current) =>
    current.price < lowest.price ? current : lowest
  );

  console.log('Lowest-priced product:', lowestPricedProduct);

  // Verify lowest price
  expect(lowestPricedProduct.price).toBe(7.99);

  // Verify product name
  expect(lowestPricedProduct.name)
    .toBe('Sauce Labs Onesie');

  // Verify the actual product card is displayed
  const productCard = products.filter({
    hasText: lowestPricedProduct.name
  });

  await expect(productCard).toBeVisible();

  // Verify price displayed in UI
  await expect(
    productCard.locator('.inventory_item_price')
  ).toHaveText('$7.99');
});