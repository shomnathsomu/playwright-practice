// Practice Test Case #50 — Verify Maximum Length

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

test('TC50 - Verify maximum length validation', async ({ page }) => {

  await page.goto('https://your-test-application.com/form');

  const firstName = page.getByRole('textbox', {
    name: 'First Name'
  });

  const maximumLength = 10;

  // Enter exactly the maximum allowed characters
  const validValue = 'ABCDEFGHIJ';

  await firstName.fill(validValue);

  await expect(firstName).toHaveValue(validValue);

  // Try entering more than the maximum
  const invalidValue = 'ABCDEFGHIJK';

  await firstName.fill(invalidValue);

  // Verify the field does not contain more than 10 characters
  const actualValue = await firstName.inputValue();

  expect(actualValue.length).toBeLessThanOrEqual(maximumLength);
});