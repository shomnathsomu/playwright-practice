// Practice Test Case #30 — Complete Authentication Suite

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

test('Verify complete authentication lifecycle', async ({ page }) => {
  // 1. Open login page
  await page.goto('https://www.saucedemo.com/');

  const username = page.getByRole('textbox', {name: 'Username'});
  const password = page.getByRole('textbox', {name: 'Password'});
  const loginButton = page.getByRole('button', {name: 'Login'});

  // 2. Verify login controls
  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
  await expect(loginButton).toBeEnabled();

  // 3. Login
  await username.fill('standard_user');
  await password.fill('secret_sauce');
  await loginButton.click();

  // 4. Verify authenticated state
  await expect(page).toHaveURL(/inventory\.html/);

  await expect(page.getByText('Products', {exact: true})).toBeVisible();

  // 5. Navigate to Cart
  await page.getByRole('button', { name: 'Cart, empty' }).click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByText('Your Cart', {exact: true})).toBeVisible();

  // 6. Go back to Inventory
  await page.goBack();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products', {exact: true})).toBeVisible();

  // 7. Refresh the authenticated page
  await page.reload();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products', {exact: true})).toBeVisible();

  // 8. Logout
  await page.getByRole('button', {name: 'Open Menu'}).click();
  await page.getByRole('button', {name: 'Logout'}).click();

  // 9. Verify logged-out state
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  await expect(page.getByRole('button', {name: 'Login'})).toBeVisible();

  // 10. Browser Back
  await page.goBack();

  // 11. Verify authentication is NOT restored
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  await expect(page.getByRole('button', {name: 'Login'})).toBeVisible();
  await expect(page.getByText('Products', {exact: true})).not.toBeVisible();
});
