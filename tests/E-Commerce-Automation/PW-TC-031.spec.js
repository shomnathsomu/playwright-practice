// Practice Test Case #31 — Verify Product Details

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

test('Verify selected product information matches product details', async ({ page }) => {
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

  // Locate product card
  const productCard = page.locator('.inventory_item').filter({
    hasText: 'Sauce Labs Backpack'
  });

  const productName = productCard.getByText(
    'Sauce Labs Backpack',
    { exact: true }
  );

  const productPrice = productCard.locator('.inventory_item_price');

  const productDescription = productCard.locator('.inventory_item_desc').first();

  // Capture inventory information
  const name = await productName.textContent();
  const price = await productPrice.textContent();
  const description = await productDescription.textContent();

  // Open product details
  await productName.click();

  // Validate details page
  await expect(page.getByText(name, { exact: true })).toBeVisible();
  await expect(page.getByText(price, { exact: true })).toBeVisible();
  await expect(page.getByRole('button', {name: 'Add to cart'})).toBeVisible();
  await expect(page.getByText(description, { exact: true })).toBeVisible();
});