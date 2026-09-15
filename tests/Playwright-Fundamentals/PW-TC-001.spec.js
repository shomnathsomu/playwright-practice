// Practice Test Case #1 — Verify Page Title
import { test, expect } from '@playwright/test';

test('Verify TodoMVC page title', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  await expect(page).toHaveTitle('React • TodoMVC');
});