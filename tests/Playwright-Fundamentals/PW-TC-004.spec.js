// Practice Test Case #4 — Verify Visible Buttons
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

test('Verify Clear completed button is visible', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Add a todo
  const todoInput = page.getByPlaceholder('What needs to be done?');
  await todoInput.fill('Learn Playwright');

  await todoInput.press('Enter');

  // Complete the todo
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();

  // Verify Clear completed button
  const clearCompletedButton = page.getByRole('button', {
    name: 'Clear completed'
  });

  await expect(clearCompletedButton).toBeVisible();
});