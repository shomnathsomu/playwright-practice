// Practice — Test Case #68 - Handling a newly opened browser tab

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


test('TC68 - Handle newly opened browser tab', async ({ page, context }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');

  const newPagePromise = context.waitForEvent('page');

  await page.getByRole('link', {
    name: 'Click Here'
  }).click();

  const newPage = await newPagePromise;

  await newPage.waitForLoadState();

  await expect(newPage).toHaveURL(
    'https://the-internet.herokuapp.com/windows/new'
  );

  await expect(
    newPage.getByRole('heading', {
      name: 'New Window'
    })
  ).toBeVisible();
});