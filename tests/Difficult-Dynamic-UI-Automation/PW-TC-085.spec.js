// Practice test case #85 — Build locator without XPath dependency

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
  },

  ignoreHTTPSErrors: true,

  launchOptions: {
    slowMo: 1000
  }
});

test.beforeEach(async () => {
  test.setTimeout(120_000);
});


test('TC85 - Build locator without XPath dependency', async ({ page }) => {
  await page.goto('https://uitestingplayground.com/dynamicid');

  // Robust locator based on accessible role + name
  const button = page.getByRole('button', {
    name: 'Button with Dynamic ID'
  });

  await expect(button).toBeVisible();

  await button.click();

  await expect(button).toBeVisible();
});