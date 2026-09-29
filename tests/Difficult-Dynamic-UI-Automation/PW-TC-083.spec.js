// Practice test case #83 - Handle unstable UI timing

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

test('TC83 - Handle unstable UI timing', async ({ page }) => {
  await page.goto('https://uitestingplayground.com/progressbar');

  const startButton = page.getByRole('button', {
    name: 'Start'
  });

  const progressBar = page.locator('#progressBar');

  await startButton.click();

  // Wait for the progress bar to reach 75%
  await expect(progressBar).toHaveAttribute(
    'aria-valuenow',
    '75',
    { timeout: 30_000 }
  );
});