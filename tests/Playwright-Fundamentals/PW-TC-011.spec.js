// Practice Test Case #11 — Check and Uncheck a Checkbox

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
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

test('Check and uncheck checkbox', async ({ page }) => {
  await page.goto('https://demoqa.com/checkbox');

  const checkbox = page.getByRole('checkbox').first();

  // Verify initial state
  await expect(checkbox).not.toBeChecked();

  // Check checkbox
  await checkbox.check();

  // Verify checked state
  await expect(checkbox).toBeChecked();

  // Uncheck checkbox
  await checkbox.uncheck();

  // Verify unchecked state
  await expect(checkbox).not.toBeChecked();
});