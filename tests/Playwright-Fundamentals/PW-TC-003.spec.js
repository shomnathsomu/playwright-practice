// Practice Test Case #3 — Verify Page Heading
import { test, expect } from '@playwright/test';

test('Verify TodoMVC page heading', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  const heading = page.getByRole('heading', { name: 'todos' });

  await expect(heading).toBeVisible();
});