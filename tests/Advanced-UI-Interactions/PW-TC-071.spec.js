// Practice — Test Case #71 - Drag & Drop

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

test('TC71 - Drag Box A to Box B', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

  const source = page.locator('#column-a');
  const target = page.locator('#column-b');

  // Pre-condition
  await expect(source).toContainText('A');
  await expect(target).toContainText('B');

  // Action
  await source.dragTo(target);

  // Expected result
  await expect(source).toContainText('B');
  await expect(target).toContainText('A');
});