// Practice — Test Case #76 - Handling dynamic IDs

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


test('TC76 - Handle dynamic ID', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/dynamicid');

  const button = page.getByRole('button', {
    name: 'Button with Dynamic ID'
  });

  await expect(button).toBeVisible();

  await button.click();

  await expect(button).toBeVisible();

  const id = await button.getAttribute('id');
  console.log('Current ID:', id);

  await page.reload();

  const newId = await button.getAttribute('id');
  console.log('New ID:', newId);

  expect(id).not.toBe(newId);
});