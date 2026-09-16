// Practice Test Case #20 — Verify Login with Empty Username

import {test, expect} from '@playwright/test';

test.use({
    viewport: {
        height: 1080,
        width: 1920
    },
    // Wait 1 second after each Playwright operation
    launchOptions: {
        slowMo: 1000
    }
});

// Increase timeout because slowMo makes the test take longer
test.beforeEach(async () => {
    test.setTimeout(120_000);
});

test('Verify login fails when username is empty', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Leave username empty

  // Enter valid password
  await page.getByRole('textbox', {
    name: 'Password'
  }).fill('secret_sauce');

  // Click Login
  await page.getByRole('button', {
    name: 'Login'
  }).click();

  // Locate validation error
  const errorMessage = page.locator('[data-test="error"]');

  // Verify error is displayed
  await expect(errorMessage).toBeVisible();

  // Verify correct validation message
  await expect(errorMessage).toContainText('Username is required');

  // Verify user was not logged in
  await expect(page).not.toHaveURL(/inventory\.html/);
});