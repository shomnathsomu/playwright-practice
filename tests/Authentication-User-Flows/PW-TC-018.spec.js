// Practice Test Case #18 — Verify Login Fails with Invalid Password

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

test('Verify login fails with invalid password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Enter valid username
  await page.getByRole('textbox', {
    name: 'Username'
  }).fill('standard_user');

  // Enter invalid password
  await page.getByRole('textbox', {
    name: 'Password'
  }).fill('wrong_password');

  // Click Login
  await page.getByRole('button', {
    name: 'Login'
  }).click();

  // Verify error message
  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();

  // Verify user was NOT logged in
  await expect(page).not.toHaveURL(/inventory\.html/);
});