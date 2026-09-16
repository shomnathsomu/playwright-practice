// Practice Test Case #22 — Verify Login with Both Username and Password Empty

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

test('Verify required validation when username and password are empty', async ({ page }) => {
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

  await expect(username).toBeEmpty();
  await expect(password).toBeEmpty();

  // Verify Login button is available
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toBeEnabled();

  // Submit empty form
  await loginButton.click();

  // Verify validation message
  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'Username is required'
  );

  // Verify login was unsuccessful
  await expect(page).not.toHaveURL(/inventory\.html/);

  // Verify login form remains available
  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
});

