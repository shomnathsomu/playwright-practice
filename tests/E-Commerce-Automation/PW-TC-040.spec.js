// Practice Test Case #40 — Complete Checkout with Valid Customer Information

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

test('TC40 - Sort products by name', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByRole('textbox', { name: 'Username' })
    .fill('standard_user');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' })
    .click();

  await expect(page).toHaveURL(/inventory\.html/);

  // Sort products by Name (A to Z)
  const sortDropdown = page.getByRole('combobox', { name: 'Sort products' })

  await sortDropdown.selectOption('az');

  // Verify selected sorting option
  await expect(sortDropdown).toHaveValue('az');

  // Extract product names from UI
  const actualProductNames = await page
    .locator('.inventory_item_name')
    .allTextContents();

  // Create expected alphabetical order
  const expectedProductNames = [...actualProductNames]
    .sort((a, b) => a.localeCompare(b));

  // Verify products are sorted A to Z
  expect(actualProductNames).toEqual(expectedProductNames);
});