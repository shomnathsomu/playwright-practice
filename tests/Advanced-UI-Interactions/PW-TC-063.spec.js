// Practice — Test Case #63 - JavaScript prompt dialog handling

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

test('TC63 - Handle JavaScript prompt dialog', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  const promptText = 'Playwright Automation';

  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toBe('I am a JS prompt');

    await dialog.accept(promptText);
  });

  await page.getByRole('button', {
    name: 'Click for JS Prompt'
  }).click();

  await expect(
    page.locator('#result')
  ).toHaveText(`You entered: ${promptText}`);
});