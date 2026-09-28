// Practice — Test Case #77 - Handling elements that change dynamically

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
  },

  // Ignore SSL certificate errors for this practice site
  ignoreHTTPSErrors: true,

  // Wait 1 second after each Playwright operation
  launchOptions: {
    slowMo: 1000
  }
});

// Increase timeout because slowMo makes the test take longer
test.beforeEach(async () => {
  test.setTimeout(120_000);
});

test('TC77 - Handle changing element attributes', async ({ page }) => {
  await page.goto('https://uitestingplayground.com/classattr');

  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('Primary button pressed');

    await dialog.accept();
  });

  const button = page.locator("//button[contains(concat(' ', normalize-space(@class), ' '), ' btn-primary ')]");

  await expect(button).toBeVisible();

  // Capture class before clicking
  const classBefore = await button.getAttribute('class');
  console.log('Class before click:', classBefore);

  await button.click();

  await expect(button).toBeVisible();

  // Capture class after clicking
  const classAfter = await button.getAttribute('class');
  console.log('Class after click:', classAfter);

  // Verify that the class changed
  expect(classAfter).toBe(classBefore);
});