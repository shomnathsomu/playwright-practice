// Practice Test Case #57 — Checkbox Combinations

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

test('TC57 - Verify checkbox combinations', async ({ page }) => {

  await page.goto('https://demoqa.com/automation-practice-form');

  // Locate hobbies
  const sports = page.getByText('Sports', { exact: true });
  const reading = page.getByText('Reading', { exact: true });
  const music = page.getByText('Music', { exact: true });

  // Select Sports and Reading
  await sports.click();
  await reading.click();

  // Verify selected states
  await expect(
    page.locator('#hobbies-checkbox-1')
  ).toBeChecked();

  await expect(
    page.locator('#hobbies-checkbox-2')
  ).toBeChecked();

  // Verify Music remains unchecked
  await expect(
    page.locator('#hobbies-checkbox-3')
  ).not.toBeChecked();
});