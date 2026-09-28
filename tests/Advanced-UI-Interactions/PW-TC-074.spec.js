// Practice — Test Case #74 - Keyboard interaction / shortcuts

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
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

test('TC74 - Verify Ctrl+A keyboard shortcut', async ({ page }) => {

  await page.goto('https://demoqa.com/text-box');

  const fullName = page.getByPlaceholder('Full Name');

  await fullName.fill('Old Value');

  // Select all existing text
  await fullName.press('ControlOrMeta+A');

  // Replace selected text
  await page.keyboard.type('New Value');

  await expect(fullName).toHaveValue('New Value');
});
