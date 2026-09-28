// Practice — Test Case #75 - Dynamic scrolling

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
  },
  // Wait 1 second after each Playwright operation 
  launchOptions: {
    slowMo: 1000
  }
});

// Increase timeout because slowMo makes the test take longer
test.beforeEach(async () => {
  test.setTimeout(120_000);
});

test('TC75 - Scroll dynamic content and verify elements', async ({ page }) => {

  await page.goto('https://demoqa.com/books', {
    waitUntil: 'domcontentloaded'
  });

  // Locate a book near the bottom of the list
  const book = page.getByText('Understanding ECMAScript 6', {
    exact: true
  });

  // Initially verify the element exists
  await expect(book).toBeAttached();

  // Scroll the element into view
  await book.scrollIntoViewIfNeeded();

  // Verify it is now visible
  await expect(book).toBeVisible();

  // Verify the book title
  await expect(book).toHaveText(
    'Understanding ECMAScript 6'
  );
});