// Practice test case #82 - Test element becoming enabled

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

test('TC82 - Test element becoming enabled', async ({ page }) => {
  await page.goto('https://uitestingplayground.com/disabledinput');

  const input = page.locator('#inputField');
  const enableButton = page.locator("#enableButton");
  const changeValue = page.locator("#opstatus");

  // Verify initial state
  await expect(input).toBeEnabled();

  // Enter text
  await input.fill('Playwright');
  await expect(input).toHaveValue('Playwright');

  // Click outside the inputField
  await changeValue.click();
  await expect(changeValue).toContainText('Playwright');

  // Make the enable Edit button disabled for 5 seconds
  await enableButton.click();

  await expect(changeValue).toHaveText('Input Disabled...');
  await expect(input).toBeDisabled({
    timeout: 5000
  });

  // Verify the input field returns to the initial state
  await expect(input).toBeEnabled();
  await expect(changeValue).toHaveText('Input Enabled...');

  // Move cursor to the end
  await input.press('End');

  // Append new text to the existing value
  await input.pressSequentially(' Automation!!');
  await expect(input).toHaveValue('Playwright Automation!!');
  
});