// Practice — Test Case #62 - JavaScript confirmation dialog handling

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

test('TC62 - Handle JavaScript confirmation dialog', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('I am a JS Confirm');

    await dialog.accept();
  });

  await page.getByRole('button', {
    name: 'Click for JS Confirm'
  }).click();

  await expect(
    page.locator('#result')
  ).toHaveText('You clicked: Ok');
});

test('TC62 - Cancel JavaScript confirmation dialog', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('I am a JS Confirm');

    await dialog.dismiss();
  });

  await page.getByRole('button', {
    name: 'Click for JS Confirm'
  }).click();

  await expect(
    page.locator('#result')
  ).toHaveText('You clicked: Cancel');
});