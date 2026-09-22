// Practice Test Case #55 — Dropdown Selection

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

test('TC55 - Verify dropdown selection', async ({ page }) => {

  // Navigate to DemoQA Practice Form
  await page.goto('https://demoqa.com/automation-practice-form');

  // -----------------------------
  // Select State
  // -----------------------------

  // Open State dropdown
  await page.locator('#state').click();

  // Select NCR
  await page.getByText('NCR', { exact: true }).click();

  // Verify selected State
  await expect(page.locator('#state')).toContainText('NCR');

  // -----------------------------
  // Select City
  // -----------------------------

  // Open City dropdown
  await page.locator('#city').click();

  // Select Delhi
  await page.getByText('Delhi', { exact: true }).click();

  // Verify selected City
  await expect(page.locator('#city')).toContainText('Delhi');
});
