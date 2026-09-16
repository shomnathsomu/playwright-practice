// Practice Test Case #17 — Verify Login with Invalid Username

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

test('Verify login fails with invalid username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Enter invalid username
  await page.getByRole('textbox', { name: 'Username' })
    .fill('invalid_user');

  // Enter valid password
  await page.getByRole('textbox', { name: 'Password' })
    .fill('secret_sauce');

  // Click Login
  await page.getByRole('button', { name: 'Login' })
    .click();

  // Verify error message
  // const errorMessage = page.locator('[data-test="error"]');
  const errorMessage = page.locator('[data-test="error-button"]');

  await expect(errorMessage).toBeVisible();

  // Verify user was not logged in
  await expect(page).not.toHaveURL(/inventory\.html/);
});