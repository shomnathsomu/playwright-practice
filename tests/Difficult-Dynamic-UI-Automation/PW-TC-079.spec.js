// Practice — Test Case #79 - Waiting for asynchronous/AJAX response

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

test('TC79 - Verify AJAX result', async ({ page }) => {
  await page.goto('https://uitestingplayground.com/ajax', {
    waitUntil: 'domcontentloaded'
  });

  const button = page.getByRole('button', {
    name: 'Button Triggering AJAX Request'
  });

  const result = page.locator('p.bg-success');

  const startTime = Date.now();

  // Trigger the AJAX request
  await button.click();

  // Keep checking until the AJAX element appears, but don't wait longer than 30 seconds.
  await expect(result).toBeVisible({
    timeout: 30000
  });

  const endTime = Date.now();

  console.log(`AJAX result appeared in ${endTime - startTime} ms`);

  // Verify the returned result
  await expect(result).toHaveText(
    'Data loaded with AJAX get request.'
  );
});