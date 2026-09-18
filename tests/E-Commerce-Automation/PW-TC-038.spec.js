// Practice Test Case #38 — Verify product details — Navigation

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

test('TC38 - Verify product details', async ({ page }) => {
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

  // Verify product exists
  await expect(productCard).toBeVisible();

  // Click product name
  await productCard.getByText(productName, { exact: true }).click();

  // Verify navigation to product details
  await expect(page).toHaveURL(/inventory-item\.html\?id=4/);

  // Verify product name
  await expect(
    page.getByText(productName, { exact: true })
  ).toBeVisible();

  // Verify product price
  await expect(
    page.getByText('$29.99', { exact: true })
  ).toBeVisible();

  // Verify Add to cart button
  await expect(
    page.getByRole('button', { name: 'Add to cart' })
  ).toBeVisible();
});