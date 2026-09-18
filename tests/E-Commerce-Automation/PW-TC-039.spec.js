// Practice Test Case #39 — Sort products by price — Dropdown + validation

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

test('TC39 - Sort products by price', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByRole('textbox', { name: 'Username' })
    .fill('standard_user');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' })
    .click();

  await expect(page).toHaveURL(/inventory\.html/);

  // Sort products by price: Low to High
  const sortDropdown = page.getByRole('combobox', { name: 'Sort products' })

  await sortDropdown.selectOption('lohi');

  // Verify selected sorting option
  await expect(sortDropdown).toHaveValue('lohi');

  // Extract displayed prices
  const priceTexts = await page
    .locator('.inventory_item_price')
    .allTextContents();

  // Convert price strings into numbers
  const actualPrices = priceTexts.map(price =>
    Number(price.replace('$', ''))
  );

  // Create expected sorted prices
  const expectedPrices = [...actualPrices].sort((a, b) => a - b);

  // Verify prices are sorted low to high
  expect(actualPrices).toEqual(expectedPrices);
});