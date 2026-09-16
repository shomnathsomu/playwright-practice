// Practice Test Case #26 — Verify Session Persists After Page Refresh

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

test('Verify authenticated session persists after refresh', async ({ page }) => {
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

  const productsHeading = page.getByText('Products', {
    exact: true
  });

  // -------------------------
  // Login
  // -------------------------

  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
  await expect(loginButton).toBeEnabled();

  await username.fill('standard_user');
  await password.fill('secret_sauce');

  await loginButton.click();

  // -------------------------
  // Verify authenticated state
  // -------------------------

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(productsHeading).toBeVisible();

  // -------------------------
  // Refresh page
  // -------------------------

  await page.reload();

  // -------------------------
  // Verify session persistence
  // -------------------------

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(productsHeading).toBeVisible();

  // Verify user is still authenticated
  await expect(
    page.getByRole('button', { name: 'Open Menu' })
  ).toBeVisible();
});