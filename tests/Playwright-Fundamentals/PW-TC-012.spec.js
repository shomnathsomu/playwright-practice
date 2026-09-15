// Practice Test Case #12 — Verify Radio-Button Selection

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

test('Verify radio button selection', async ({ page }) => {
  await page.goto('https://demoqa.com/radio-button');

  const yesRadio = page.getByRole('radio', { name: 'Impressive' });

  await yesRadio.check();

  await expect(yesRadio).toBeChecked();
});