// Practice Test Case #15 — Verify Multiple Elements Using a Locator

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

test('Verify all Add to Cart buttons are visible and enabled', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByRole('textbox', { name: 'Username' })
    .fill('standard_user');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' })
    .click();

  const addToCartButtons = page.getByRole('button', {
    name: 'Add to cart'
  });

  // Verify count
  await expect(addToCartButtons).toHaveCount(6);

  // Verify every button
  for (const button of await addToCartButtons.all()) {
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  }
});