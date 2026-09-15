// Practice Test Case #9 — Select an Option from a Dropdown

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
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

test('Select product sorting option from dropdown', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByRole('textbox', { name: 'Username' })
    .fill('standard_user');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' })
    .click();

  // Locate the sorting dropdown
  const sortDropdown = page.getByRole('combobox');

  // Select "Price (low to high)"
  await sortDropdown.selectOption('lohi');

  // Verify selected option
  await expect(sortDropdown).toHaveValue('lohi');
});