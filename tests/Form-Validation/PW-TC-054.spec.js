// Practice Test Case #54 — Valid Email Format

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

test('TC54 - Verify valid email format', async ({ page }) => {

  await page.goto('https://demoqa.com/automation-practice-form');

  // Locate fields
  const firstName = page.getByPlaceholder('First Name');
  const lastName = page.getByPlaceholder('Last Name');
  const email = page.getByPlaceholder('name@example.com');
  const mobile = page.getByPlaceholder('Mobile Number');

  // Fill required fields
  await firstName.fill('John');
  await lastName.fill('Doe');

  // Enter valid email
  await email.fill('john.doe@example.com');

  // Select gender
  await page.getByText('Male', { exact: true }).click();

  // Fill valid mobile number
  await mobile.fill('9876543210');

  // Verify entered email
  await expect(email).toHaveValue(
    'john.doe@example.com'
  );

  // Verify email pattern is NOT violated
  await expect(email).toHaveJSProperty(
    'validity.patternMismatch',
    false
  );

  // Verify email field is valid
  await expect(email).toHaveJSProperty(
    'validity.valid',
    true
  );

  // Submit form
  await page.getByRole('button', {
    name: 'Submit'
  }).click();

  // Verify successful submission
  await expect(
    page.getByText('Thanks for submitting the form')
  ).toBeVisible();

  // Verify submitted email
  await expect(
    page.getByText('john.doe@example.com')
  ).toBeVisible();
});