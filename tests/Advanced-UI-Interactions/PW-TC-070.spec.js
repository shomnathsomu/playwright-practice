// Practice — Test Case #70 - Handling a browser popup

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


test('TC70 - Handle browser popup', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');

  const popupPromise = page.waitForEvent('popup');

  await page.getByRole('link', {
    name: 'Click Here'
  }).click();

  const popup = await popupPromise;

  await popup.waitForLoadState();

  await expect(popup).toHaveURL(
    'https://the-internet.herokuapp.com/windows/new'
  );

  await expect(
    popup.getByRole('heading', {
      name: 'New Window'
    })
  ).toBeVisible();
});