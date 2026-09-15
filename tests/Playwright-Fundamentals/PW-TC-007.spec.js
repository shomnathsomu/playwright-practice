// Practice Test Case #7 — Clear an Input Field

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

test('Clear username input field', async ({ page }) => {

  // 1. Navigate to SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // 2. Locate username field
  const usernameInput = page.getByRole('textbox', {
    name: 'Username'
  });

  // 3. Enter username
  await usernameInput.fill('standard_user');

  // 4. Verify username was entered
  await expect(usernameInput).toHaveValue('standard_user');

  // 5. Clear the username field
  await usernameInput.fill('');

  // 6. Verify the field is empty
  await expect(usernameInput).toHaveValue('');
});