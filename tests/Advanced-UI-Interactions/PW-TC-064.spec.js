// Practice — Test Case #64 - File upload with Playwright

import { test, expect } from '@playwright/test';
import path from 'path';

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

test('TC64 - Upload a file', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');

  const filePath = path.resolve(
    'test-data/sample.txt'
  );

  await page.locator('#file-upload').setInputFiles(filePath);

  await page.getByRole('button', {
    name: 'Upload'
  }).click();

  await expect(page).toHaveURL("https://the-internet.herokuapp.com/upload");

  await expect(
    page.getByRole('heading', {
      name: 'File Uploaded!'
    })
  ).toBeVisible();

  await expect(
    page.locator('#uploaded-files')
  ).toHaveText('sample.txt');
});