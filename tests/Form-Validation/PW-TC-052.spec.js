// Practice Test Case #52 — Verify Numeric Validation

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


test('TC52 - Verify numeric validation', async ({ page }) => {

  await page.goto('https://demoqa.com/automation-practice-form');

  const mobileField = page.getByRole('textbox', {
    name: 'Mobile Number'
  });

  // Enter non-numeric data
  await mobileField.fill('98765abc10');

  // Verify the field contains the entered value
  await expect(mobileField).toHaveValue('98765abc10');

  // Verify that the value violates the numeric pattern
  await expect(mobileField).toHaveJSProperty(
    'validity.patternMismatch',
    true
  );

  // Verify the field is invalid
  await expect(mobileField).toHaveJSProperty(
    'validity.valid',
    false
  );

  // Submit the form
  await page.getByRole('button', {
    name: 'Submit'
  }).click();

  // Verify the field is still invalid
  await expect(mobileField).toHaveJSProperty(
    'validity.valid',
    false
  );

  const validation = await mobileField.evaluate(element => ({
    value: element.value,
    required: element.required,
    pattern: element.pattern,
    minLength: element.minLength,
    maxLength: element.maxLength,
    valid: element.validity.valid,
    valueMissing: element.validity.valueMissing,
    patternMismatch: element.validity.patternMismatch,
    tooShort: element.validity.tooShort,
    tooLong: element.validity.tooLong
  }));

  console.log(validation);

});