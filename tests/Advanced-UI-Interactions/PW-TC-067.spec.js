// Practice — Test Case #67 - Interacting with elements inside an iframe

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
  },
  launchOptions: {
    slowMo: 1000
  }
});

test.beforeEach(async () => {
  test.setTimeout(120_000);
});

test('TC67 - Verify and interact with iframe', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/iframe');

  // Verify iframe is visible
  const iframe = page.locator('#mce_0_ifr');

  await expect(iframe).toBeVisible();

  // Enter iframe
  const editor = page.frameLocator('#mce_0_ifr');

  // Locate body inside iframe
  const body = editor.locator('body');

  // Verify body is visible
  await expect(body).toBeVisible();

  // Extract text from iframe
  const iframeText = await body.innerText();

  console.log('Iframe text:', iframeText);

  // Verify iframe contains expected content
  await expect(body).toContainText('Your content goes here.');
});