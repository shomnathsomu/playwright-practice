// Practice — Test Case #65 - File download automation

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

test('TC65 - Download a file', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');

  const downloadPromise = page.waitForEvent('download');

  await page.getByRole('link', {
    name: 'some-file.txt'
  }).click();

  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe('some-file.txt');

  const filePath = await download.path();

  expect(filePath).not.toBeNull();
});