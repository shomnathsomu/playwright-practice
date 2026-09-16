// Practice Test Case #21 — Verify Login with Empty Password

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

test('Verify required validation when password is empty', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const username = page.getByRole('textbox', {
    name: 'Username'
  });

  const password = page.getByRole('textbox', {
    name: 'Password'
  });

  const loginButton = page.getByRole('button', {
    name: 'Login'
  });

  const errorMessage = page.locator('[data-test="error"]');

  // Verify initial state
  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
  await expect(loginButton).toBeEnabled();

  // Verify password is initially empty
  await expect(password).toBeEmpty();

  // Enter valid username only
  await username.fill('standard_user');

  // Submit login
  await loginButton.click();

  // Verify password validation
  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'Password is required'
  );

  // Verify login was unsuccessful
  await expect(page).not.toHaveURL(/inventory\.html/);

  // Verify password field remains available
  await expect(password).toBeVisible();
  await expect(password).toBeEnabled();
});