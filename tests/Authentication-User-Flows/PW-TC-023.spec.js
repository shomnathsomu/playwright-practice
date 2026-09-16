// Practice Test Case #23 — Verify Login Fails for a Locked-Out User

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

test('Verify locked-out user cannot login', async ({ page }) => {
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

  // Verify login controls
  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
  await expect(loginButton).toBeEnabled();

  // Enter locked-out user's credentials
  await username.fill('locked_out_user');
  await password.fill('secret_sauce');

  // Verify entered values
  await expect(username).toHaveValue('locked_out_user');
  await expect(password).toHaveValue('secret_sauce');

  // Submit login
  await loginButton.click();

  // Verify locked-account error
  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    'locked out'
  );

  // Verify authentication failed
  await expect(page).not.toHaveURL(/inventory\.html/);

  // Verify login form remains available
  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
});

