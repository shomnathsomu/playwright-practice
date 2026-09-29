// Practice — Test Case #78 - Auto-waiting / delayed elements

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


test('TC78 - Handle delayed button', async ({ page }) => {
  await page.goto('https://uitestingplayground.com/loaddelay');

  const button = page.getByRole('button', {
    name: 'Button Appearing After Delay'
  });

  // Playwright waits for the delayed button
  await expect(button).toBeVisible();

  // Verify it is actionable
  await expect(button).toBeEnabled();

  // Click after it becomes available
  await button.click();

  await page.screenshot({
    path: 'test-results/delayed-button.png'
  });
});