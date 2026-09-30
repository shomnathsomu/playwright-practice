// Practice test case #84 — Verify dynamically generated text

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


test('TC84 - Verify dynamically generated text', async ({ page }) => {
  await page.goto('https://uitestingplayground.com/textinput');

  const button = page.locator('#updatingButton');
  const input = page.getByRole('textbox');

  const dynamicText = `Playwright-${Date.now()}`;
  await input.fill(dynamicText);

  await button.click();
  await expect(button).toHaveText(dynamicText);

  await input.fill('Dynamic Button');
  await button.click();
  await expect(button).toHaveText('Dynamic Button');
});