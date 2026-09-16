// Practice Test Case #29 — Authentication Persistence Across Navigation

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

test('Verify authentication persists across page navigation', async ({ page }) => {
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

  // Login
  await username.fill('standard_user');
  await password.fill('secret_sauce');
  await loginButton.click();

  // Verify successful login
  await expect(page).toHaveURL(/inventory\.html/);

  await expect(
    page.getByText('Products', {
      exact: true
    })
  ).toBeVisible();

  // Navigate to Cart
  await page.getByRole('button', { name: 'Cart, empty' }).click();

  await expect(page).toHaveURL(/cart\.html/);

  // Verify authenticated user can access Cart
  await expect(
    page.getByText('Your Cart', {
      exact: true
    })
  ).toBeVisible();

  // Navigate back to Products
  await page.goBack();

  await expect(page).toHaveURL(/inventory\.html/);

  // Verify authentication is still active
  await expect(
    page.getByText('Products', {
      exact: true
    })
  ).toBeVisible();

  await expect(
    page.getByRole('button', {
      name: 'Open Menu'
    })
  ).toBeVisible();
});