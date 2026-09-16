// Practice Test Case #25 — Verify Protected Page Cannot Be Accessed Without Login

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

test('Verify protected inventory page requires authentication', async ({ page }) => {
  // Start without logging in
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

  // Verify unauthenticated state
  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
  await expect(loginButton).toBeVisible();

  // Attempt to access protected resource directly
  await page.goto(
    'https://www.saucedemo.com/inventory.html'
  );

  // Verify access is denied
  await expect(page).toHaveURL(
    'https://www.saucedemo.com/'
  );

  // Verify login page is displayed
  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
  await expect(loginButton).toBeVisible();

  // Verify protected content is not exposed
  await expect(
    page.getByText('Products', { exact: true })
  ).not.toBeVisible();
});