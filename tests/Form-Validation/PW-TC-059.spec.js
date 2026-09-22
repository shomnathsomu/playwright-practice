// Practice Test Case #59 — Verify Form Reset

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


test('TC59 - Verify form reset', async ({ page }) => {

  // 1. Open the form
  await page.goto('https://your-test-application.com/form');

  // 2. Locate fields
  const firstName = page.getByRole('textbox', {
    name: 'First Name'
  });

  const lastName = page.getByRole('textbox', {
    name: 'Last Name'
  });

  const email = page.getByRole('textbox', {
    name: 'Email'
  });

  const phone = page.getByRole('textbox', {
    name: 'Phone'
  });

  // 3. Enter test data
  await firstName.fill('John');
  await lastName.fill('Doe');
  await email.fill('john@example.com');
  await phone.fill('9876543210');

  // 4. Verify data was entered
  await expect(firstName).toHaveValue('John');
  await expect(lastName).toHaveValue('Doe');
  await expect(email).toHaveValue('john@example.com');
  await expect(phone).toHaveValue('9876543210');

  // 5. Click Reset
  await page.getByRole('button', {
    name: 'Reset'
  }).click();

  // 6. Verify all fields are cleared
  await expect(firstName).toHaveValue('');
  await expect(lastName).toHaveValue('');
  await expect(email).toHaveValue('');
  await expect(phone).toHaveValue('');
});