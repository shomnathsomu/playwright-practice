// Practice Test Case #53 — Invalid Email Format

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

test('TC53 - Verify invalid email format', async ({ page }) => {

  await page.goto('https://demoqa.com/automation-practice-form');

  const firstName = page.getByPlaceholder('First Name');
  const lastName = page.getByPlaceholder('Last Name');
  const email = page.getByPlaceholder('name@example.com');
  const mobile = page.getByPlaceholder('Mobile Number');

  // Fill valid required fields
  await firstName.fill('John');
  await lastName.fill('Doe');

  // Enter invalid email
  await email.fill('invalid-email');

  // Select gender
  await page.getByText('Male', { exact: true }).click();

  // Fill valid mobile number
  await mobile.fill('9876543210');

  // Verify entered email
  await expect(email).toHaveValue('invalid-email');

  // Verify email format validation
  await expect(email).toHaveJSProperty(
    'validity.patternMismatch',
    true
  );

  // Verify field is invalid
  await expect(email).toHaveJSProperty(
    'validity.valid',
    false
  );

  // Submit form
  await page.getByRole('button', {
    name: 'Submit'
  }).click();

  // Verify form was not successfully submitted
  await expect(
    page.getByText('Thanks for submitting the form')
  ).not.toBeVisible();

  const validation = await email.evaluate(element => ({
    value: element.value,
    pattern: element.pattern,
    valid: element.validity.valid,
    patternMismatch: element.validity.patternMismatch,
    valueMissing: element.validity.valueMissing
  }));

  console.log(validation);

});