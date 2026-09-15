// Practice Test Case #13 — Submit a Basic Form

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1920
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

test('Submit basic practice form successfully', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');

  // Enter first name
  await page.getByRole('textbox', { name: 'First Name' })
    .fill('Shomnath');

  // Enter last name
  await page.getByRole('textbox', { name: 'Last Name' })
    .fill('Tester');

  // Enter email
  await page.getByRole('textbox', { name: 'name@example.com' })
    .fill('shomnath.test@example.com');

  // Select gender
  await page.getByText('Male', { exact: true }).click();

  // Enter mobile number
  await page.getByRole('textbox', { name: 'Mobile Number' })
    .fill('01712345678');

  // Enter the Subjects
  await page.locator('#subjectsInput').fill('Maths');

  await page.press('#subjectsInput', 'Enter');

  // Select hobbies
  await page.getByRole('checkbox', { name: 'Reading' }).click();
  await page.getByRole('checkbox', { name: 'Sports' }).click();
  await page.getByRole('checkbox', { name: 'Music' }).click();

  // Enter current address
  await page.getByRole('textbox', { name: 'Current Address' })
  .fill('123 Main Street');

  await page.press('#currentAddress', 'Tab');

  // Enter state and city
  await page.locator('//input[@id=\'react-select-3-input\']').fill('NCR');
  await page.press('#react-select-3-input', 'Enter');

  await page.locator('//input[@id=\'react-select-4-input\']').fill('Noida');
  await page.press('#react-select-4-input', 'Enter');

  // Submit form
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verify submission
  await expect(page.getByText('Thanks for submitting the form'))
    .toBeVisible();
});