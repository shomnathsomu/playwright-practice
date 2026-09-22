// Practice Test Case #51 — Verify Special Character Validation

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

const invalidValues = [
  'John@',
  'John#',
  'John$',
  'John%',
  'John&',
  '@John'
];

for (const value of invalidValues) {

  test(`TC51 - Reject special character: ${value}`, async ({ page }) => {

    await page.goto('https://your-test-application.com/form');

    const firstName = page.getByRole('textbox', {
      name: 'First Name'
    });

    await firstName.fill(value);

    await page.getByRole('button', {
      name: 'Submit'
    }).click();

    await expect(
      page.getByText(
        'First Name should contain alphabetic characters only'
      )
    ).toBeVisible();
  });
}