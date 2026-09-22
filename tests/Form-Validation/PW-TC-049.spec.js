// Practice Test Case #49 — Verify Minimum Length Validation

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


test('TC49 - Verify minimum length validation', async ({ page }) => {

  await page.goto('https://your-test-application.com/form');

  const firstName = page.getByRole('textbox', {
    name: 'First Name'
  });

  // Enter value shorter than the minimum length
  await firstName.fill('Ab');

  // Submit the form
  await page.getByRole('button', {
    name: 'Submit'
  }).click();

  // Verify validation message
  await expect(
    page.getByText('First Name must be at least 3 characters')
  ).toBeVisible();

  // Verify the field is invalid
  await expect(firstName).toHaveAttribute(
    'aria-invalid',
    'true'
  );
});