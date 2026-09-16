// Practice Test Case #16 — Verify Successful Login

import { test, expect } from '@playwright/test';

test.use({
    viewport: {
        height: 1080,
        width: 1920
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

test('Verify successful user authentication', async ({ page }) => {
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
  await expect(username).toBeEnabled();

  await expect(password).toBeVisible();
  await expect(password).toBeEnabled();

  await expect(loginButton).toBeVisible();
  await expect(loginButton).toBeEnabled();

  // Enter credentials
  await username.fill('standard_user');
  await password.fill('secret_sauce');

  // Submit
  await loginButton.click();

  // Verify authentication
  await expect(page).toHaveURL(/inventory\.html/);

  // Verify authenticated page
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  // Verify authenticated functionality
  await expect(
    page.getByRole('button', { name: /Add to cart/i }).first()
  ).toBeVisible();
});