// Practice Test Case #58 — Verify Radio Button Combinations

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

test('TC58 - Verify radio button combinations', async ({ page }) => {

  // 1. Open DemoQA Practice Form
  await page.goto('https://demoqa.com/automation-practice-form');

  // 2. Locate radio buttons
  const male = page.getByText('Male', { exact: true });
  const female = page.getByText('Female', { exact: true });
  const other = page.getByText('Other', { exact: true });

  // 3. Select Male
  await male.click();

  // Verify Male is selected
  await expect(
    page.locator('#gender-radio-1')
  ).toBeChecked();

  // Verify other options are not selected
  await expect(
    page.locator('#gender-radio-2')
  ).not.toBeChecked();

  await expect(
    page.locator('#gender-radio-3')
  ).not.toBeChecked();

  // 4. Select Female
  await female.click();

  // Verify Female is selected
  await expect(
    page.locator('#gender-radio-2')
  ).toBeChecked();

  // Verify Male is automatically deselected
  await expect(
    page.locator('#gender-radio-1')
  ).not.toBeChecked();

  await expect(
    page.locator('#gender-radio-3')
  ).not.toBeChecked();

  // 5. Select Other
  await other.click();

  // Verify Other is selected
  await expect(
    page.locator('#gender-radio-3')
  ).toBeChecked();

  // Verify previous selections are cleared
  await expect(
    page.locator('#gender-radio-1')
  ).not.toBeChecked();

  await expect(
    page.locator('#gender-radio-2')
  ).not.toBeChecked();
});