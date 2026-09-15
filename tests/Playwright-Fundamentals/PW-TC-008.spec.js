// Practice Test Case #8 — Verify Input Value

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

test('Verify username input value', async ({ page }) => {

  // 1. Navigate to SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // 2. Locate username field
  const usernameInput = page.getByRole('textbox', {
    name: 'Username'
  });

  // 3. Enter username
  await usernameInput.fill('standard_user');

  // 4. Verify the input value
  await expect(usernameInput)
    .toHaveValue('standard_user');
});