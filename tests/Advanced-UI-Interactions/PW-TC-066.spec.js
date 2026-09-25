// Practice — Test Case #66 - Download verification

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

test('TC66 - Verify downloaded filename format', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');

  const downloadLink = page.locator('#content a').first();

  const expectedFileName =
    await downloadLink.textContent();

  const downloadPromise = page.waitForEvent('download');

  await downloadLink.click();

  const download = await downloadPromise;

  const actualFileName =
    download.suggestedFilename();

  expect(actualFileName).toBe(
    expectedFileName?.trim()
  );
});