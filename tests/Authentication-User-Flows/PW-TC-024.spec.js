// Practice Test Case #24 — Verify Successful Logout

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

test('Verify user can logout successfully', async ({ page }) => {
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

  // -------------------------
  // Login
  // -------------------------

  await username.fill('standard_user');
  await password.fill('secret_sauce');

  await loginButton.click();

  // Verify authenticated state
  await expect(page).toHaveURL(/inventory\.html/);

  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  // -------------------------
  // Logout
  // -------------------------

  await page.getByRole('button', {
    name: 'Open Menu'
  }).click();

  await expect(
    page.getByRole('button', { name: 'Logout' })
  ).toBeVisible();

  await page.getByRole('button', {
    name: 'Logout'
  }).click();

  // -------------------------
  // Verify logged-out state
  // -------------------------

  await expect(page).toHaveURL(
    'https://www.saucedemo.com/'
  );

  await expect(
    page.getByRole('button', { name: 'Login' })
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'Username' })
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'Password' })
  ).toBeVisible();
});