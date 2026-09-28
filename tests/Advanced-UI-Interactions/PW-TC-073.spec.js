// Practice — Test Case #73 - Right-click / Context menu

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
  },
  // Wait 1 second after each Playwright operation 
  launchOptions: {
    slowMo: 1000
  }
});

// Increase timeout because slowMo makes the test take longer
test.beforeEach(async () => {
  test.setTimeout(120_000);
});

test('TC73 - Right-click on an element', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/context_menu');

  const contextMenu = page.locator('#hot-spot');

  // Handle the JavaScript alert
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('You selected a context menu');

    await dialog.accept();
  });

  // Perform right-click
  await contextMenu.click({ button: 'right' });
});


test('TC73 - Verify left-click does not trigger context menu alert', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/context_menu');

  const contextMenu = page.locator('#hot-spot');

  let dialogAppeared = false;

  page.on('dialog', async dialog => {
    dialogAppeared = true;
    await dialog.dismiss();
  });

  await contextMenu.click();

  await page.waitForTimeout(500);

  expect(dialogAppeared).toBe(false);
});