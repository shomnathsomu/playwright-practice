// Practice — Test Case #69 - Working with multiple browser tabs/pages

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

test('TC69 - Switch between browser tabs', async ({ page, context }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');

  // Verify original tab
  await expect(
    page.getByRole('heading', {
      name: 'Opening a new window'
    })
  ).toBeVisible();

  // Wait for the new tab
  const newPagePromise = context.waitForEvent('page');

  await page.getByRole('link', {
    name: 'Click Here'
  }).click();

  const newPage = await newPagePromise;

  await newPage.waitForLoadState();

  // Verify new tab
  await expect(newPage).toHaveURL(
    'https://the-internet.herokuapp.com/windows/new'
  );

  await expect(
    newPage.getByRole('heading', {
      name: 'New Window'
    })
  ).toBeVisible();

  // Switch back to original tab
  await page.bringToFront();

  await expect(
    page.getByRole('heading', {
      name: 'Opening a new window'
    })
  ).toBeVisible();
});