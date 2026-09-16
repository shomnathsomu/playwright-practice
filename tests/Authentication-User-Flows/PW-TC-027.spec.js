// Practice Test Case #27 — Browser Back After Logout

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

test('Verify browser back does not restore authenticated page after logout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByRole('textbox', {
    name: 'Username'
  }).fill('standard_user');

  await page.getByRole('textbox', {
    name: 'Password'
  }).fill('secret_sauce');

  await page.getByRole('button', {
    name: 'Login'
  }).click();

  // Verify authenticated state
  await expect(page).toHaveURL(/inventory\.html/);

  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  // Logout
  await page.getByRole('button', {
    name: 'Open Menu'
  }).click();

  await page.getByRole('button', {
    name: 'Logout'
  }).click();

  // Verify logout
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  await expect(
    page.getByRole('button', {
      name: 'Login'
    })
  ).toBeVisible();

  // Browser Back
  await page.goBack();

  // User should NOT regain access to inventory
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  await expect(
    page.getByRole('button', {
      name: 'Login'
    })
  ).toBeVisible();

  await expect(
    page.getByText('Products', {
      exact: true
    })
  ).not.toBeVisible();
});