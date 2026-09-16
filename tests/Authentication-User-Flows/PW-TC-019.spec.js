// Practice Test Case #19 — Verify Login Fails with Invalid Username and Password

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

test('Verify login error with invalid username and password', async ({ page }) => {
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

  // Verify login controls
  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
  await expect(loginButton).toBeEnabled();

  // Enter invalid credentials
  await username.fill('invalid_user');
  await password.fill('wrong_password');

  // Submit
  await loginButton.click();

  // Verify authentication error
  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'Username and password do not match'
  );

  // Verify user remains unauthenticated
  await expect(page).not.toHaveURL(/inventory\.html/);

  // Verify login form remains available
  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
  await expect(loginButton).toBeEnabled();
});