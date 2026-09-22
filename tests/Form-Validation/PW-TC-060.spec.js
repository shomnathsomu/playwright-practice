// Practice Test Case #60 — Verify Submitted Data

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

test('TC60 - Verify submitted data using extraction', async ({ page }) => {

  await page.goto('https://demoqa.com/automation-practice-form');

  const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    mobile: '9876543210'
  };

  // Fill form
  await page.getByPlaceholder('First Name').fill(testData.firstName);
  await page.getByPlaceholder('Last Name').fill(testData.lastName);
  await page.getByPlaceholder('name@example.com').fill(testData.email);

  await page.getByText('Male', { exact: true }).click();

  await page.getByPlaceholder('Mobile Number').fill(testData.mobile);

  // Subject
  const subjectsInput = page.locator('#subjectsInput');

  await subjectsInput.fill('Maths');
  await page.getByText('Maths', { exact: true }).click();

  // Hobby
  await page.getByText('Sports', { exact: true }).click();

  // State
  await page.locator('#state').click();
  await page.getByText('NCR', { exact: true }).click();

  // City
  await page.locator('#city').click();
  await page.getByText('Delhi', { exact: true }).click();

  // Submit
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verify modal
  await expect(
    page.getByText('Thanks for submitting the form')
  ).toBeVisible();

  // Extract submitted table
  const submittedData = await page
    .locator('.table')
    .innerText();

  console.log(submittedData);

  // Verify submitted values
  expect(submittedData).toContain(testData.firstName);
  expect(submittedData).toContain(testData.lastName);
  expect(submittedData).toContain(testData.email);
  expect(submittedData).toContain(testData.mobile);

  expect(submittedData).toContain('Male');
  expect(submittedData).toContain('Maths');
  expect(submittedData).toContain('Sports');
  expect(submittedData).toContain('NCR');
  expect(submittedData).toContain('Delhi');
});