// Practice Test Case #42 - Verify highest-priced product — Data handling

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


test('TC42 - Verify highest-priced product', async ({ page }) => {
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

  console.log('Product data:', productData);

  // Find the highest-priced product
  const highestPricedProduct = productData.reduce(
    (highest, current) =>
      current.price > highest.price ? current : highest
  );

  console.log(
    'Highest-priced product:',
    highestPricedProduct
  );

  // Verify highest price
  expect(highestPricedProduct.price).toBe(49.99);

  // Verify product name
  expect(highestPricedProduct.name).toBe('Sauce Labs Fleece Jacket');

  // Locate the highest-priced product in the UI
  const productCard = products.filter({
    hasText: highestPricedProduct.name
  });

  // Verify product is visible
  await expect(productCard).toBeVisible();

  // Verify displayed price
  await expect(
    productCard.locator('.inventory_item_price')
  ).toHaveText('$49.99');
});