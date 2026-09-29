// Practice test case #81 - Test hidden element

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
  },

  // Ignore SSL certificate errors for this practice site
  ignoreHTTPSErrors: true,

  // Wait 1 second after each Playwright operation
  launchOptions: {
    slowMo: 1000
  }
});

// Increase timeout because slowMo makes the test take longer
test.beforeEach(async () => {
  test.setTimeout(120_000);
});

test('TC81 - Test hidden element', async ({ page }) => {
  await page.goto('https://uitestingplayground.com/hiddenlayers');

  // Visible button
  const greenButton = page.locator('#greenButton');
  // Hidden button
  const blueButton = page.locator('#blueButton');

  // Initial State
  await expect(greenButton).toBeVisible();
  await expect(blueButton).toBeHidden();

  // First click
  // I expect this click to succeed
  await greenButton.click();

  // Blue button becomes visible
  await expect(blueButton).toBeVisible();

  // Green button may still be visible in the DOM
  await expect(greenButton).toBeVisible();

  // Second click should fail because green button is covered
  // I expect this click to fail
  await expect(
    greenButton.click({timeout: 5_000})
  ).rejects.toThrow();

});