// Practice Test Case #2 — Verify URL After Navigation
import { test, expect } from '@playwright/test';

test('Verify TodoMVC URL after navigation', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  await expect(page).toHaveURL('https://demo.playwright.dev/todomvc/#/');
});