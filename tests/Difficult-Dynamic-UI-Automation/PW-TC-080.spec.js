// Practice — Test Case #79 - Handle dynamically loaded content

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
  },

  // Ignore SSL certificate errors for this practice site
  ignoreHTTPSErrors: true,

  // Wait 1 second after each Playwright operation
  launchOptions: {
    slowMo: 1000
  }
});

// Increase timeout because slowMo makes the test take longer
test.beforeEach(async () => {
  test.setTimeout(120_000);
});

test('TC80 - Handle dynamically loaded content', async ({ page }) => {
  await page.goto('https://uitestingplayground.com/dynamictable');

  const table = page.getByRole('table');

  // Find the CPU column dynamically
  const headers = table.getByRole('columnheader');
  const headerCount = await headers.count();

  let cpuColumnIndex = -1;

  for (let i = 0; i < headerCount; i++) {
    const headerText = (await headers.nth(i).innerText()).trim();

    if (headerText === 'CPU') {
      cpuColumnIndex = i;
      break;
    }
  }

  expect(cpuColumnIndex).toBeGreaterThanOrEqual(0);

  // Find Chrome row
  const chromeRow = table
    .getByRole('row')
    .filter({ hasText: 'Chrome' })
    .first();

  await expect(chromeRow).toBeVisible();

  // Get Chrome CPU using the actual CPU column
  const chromeCpu = (
    await chromeRow.getByRole('cell').nth(cpuColumnIndex).innerText()
  ).trim();

  // Get CPU value from the dynamic label
  const chromeCpuLabel = await page
    .getByText(/^Chrome CPU:/) // the text must START with "Chrome CPU:"
    .innerText();

  const expectedCpu = chromeCpuLabel
    .replace('Chrome CPU:', '')
    .trim();

  expect(chromeCpu).toBe(expectedCpu);
});