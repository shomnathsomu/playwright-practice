// Practice Test Case #56 — Multi-Select

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


test('TC56 - Verify multi-select subjects', async ({ page }) => {

  await page.goto('https://demoqa.com/automation-practice-form');

  const subjects = page.locator('#subjectsInput');

  // Select first subject
  await subjects.fill('Maths');

  await page.getByText('Maths', { exact: true }).click();

  // Verify first subject
  await expect(page.locator('#subjectsContainer')).toContainText('Maths');

  // Select second subject
  await subjects.fill('Physics');

  await page.getByText('Physics', { exact: true }).click();

  // Verify second subject
  await expect(page.locator('#subjectsContainer')).toContainText('Physics');

  // Verify both subjects are selected
  await expect(page.locator('#subjectsContainer')).toContainText('Maths');
  await expect(page.locator('#subjectsContainer')).toContainText('Physics');
});