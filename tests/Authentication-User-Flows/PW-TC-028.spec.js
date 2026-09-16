// Practice Test Case #28 — Multiple Login Attempts

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

test('Verify multiple failed login attempts followed by successful login', async ({ page }) => {
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

  // Attempt 1 - Invalid password
  await username.fill('standard_user');
  await password.fill('wrong_password');
  await loginButton.click();

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText(
    'Username and password do not match'
  );

  await expect(page).not.toHaveURL(/inventory\.html/);

  // Attempt 2 - Invalid password again
  await password.clear();
  await password.fill('invalid_password');
  await loginButton.click();

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText(
    'Username and password do not match'
  );

  await expect(page).not.toHaveURL(/inventory\.html/);

  // Recovery - Correct password
  await password.clear();
  await password.fill('secret_sauce');
  await loginButton.click();

  // Verify successful authentication
  await expect(page).toHaveURL(/inventory\.html/);

  await expect(page.getByText('Products', {exact: true})).toBeVisible();
});