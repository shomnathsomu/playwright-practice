// Practice Test Case #61 — Handle JavaScript Alert

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

test('TC61 - Handle JavaScript alert', async ({ page }) => {

  // 1. Open JavaScript Alerts page
  await page.goto(
    'https://the-internet.herokuapp.com/javascript_alerts'
  );

  // 2. Handle the JavaScript alert
  page.once('dialog', async dialog => {

    // Verify dialog type
    expect(dialog.type()).toBe('alert');

    // Verify alert message
    expect(dialog.message()).toBe('I am a JS Alert');

    // Accept the alert
    await dialog.accept();
    
  });

  // 3. Trigger the alert
  await page.getByRole('button', {
    name: 'Click for JS Alert'
  }).click();

  // 4. Verify result after alert is accepted
  await expect(
    page.locator('#result')
  ).toHaveText('You successfully clicked an alert');
});