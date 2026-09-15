// Practice Test Case #10 — Verify Checkbox State

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

test('Verify checkbox state', async ({ page }) => {
  await page.goto('https://demoqa.com/checkbox');

  const checkbox = page.getByRole('checkbox').first();

  await checkbox.check();

  await expect(checkbox).toBeChecked();
});