// Practice Test Case #88 — Validate UI Data Against API Response

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
  },

  ignoreHTTPSErrors: true,

  launchOptions: {
    slowMo: 1000
  }
});

test.beforeEach(async () => {
  test.setTimeout(120_000);
});


test('TC88 - Validate UI data against API response', async ({request,page}) => {

  // 1. Get product data from API
  const apiResponse = await request.get(
    'https://automationexercise.com/api/productsList'
  );

  expect(apiResponse.status()).toBe(200);

  const apiBody = await apiResponse.json();

  expect(apiBody.responseCode).toBe(200);

  const apiProducts = apiBody.products;

  // 2. Open products page
  await page.goto('https://automationexercise.com/products');

  // 3. Verify Products page
  await expect(
    page.getByRole('heading', { name: 'All Products' })
  ).toBeVisible();

  // 4. Select one product from API
  const expectedProduct = apiProducts.find(
    product => product.name === 'Blue Top'
  );

  expect(expectedProduct).toBeDefined();

  // 5. Find the same product in UI
  const productCard = page
    .locator('.productinfo')
    .filter({ hasText: expectedProduct.name })
    .first();

  await expect(productCard).toBeVisible();

  // 6. Extract UI product name
  const uiProductName = await productCard
    .locator('p')
    .innerText();

  // 7. Extract UI price
  const uiPriceText = await productCard
    .locator('h2')
    .innerText();

  // 8. Convert UI price to number
  const uiPrice = Number(
    uiPriceText.replace(/[^\d]/g, '')
  );

  // 9. Convert API data price to number
  const apiProductPrice = Number(
    expectedProduct.price.replace(/[^\d]/g,'')
  )

  // 10. Compare UI and API data
  expect(uiProductName.trim()).toBe(expectedProduct.name);
  expect(uiPrice).toBe(apiProductPrice);
});