// Practice — Test Case #72 - Hover interaction

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

test('TC72 - Hover over multiple users', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/hovers');

  const users = page.locator('.figure');

  const userCount = await users.count();

  expect(userCount).toBeGreaterThan(0);

  for (let i = 0; i < userCount; i++) {
    const user = users.nth(i);

    await user.hover();

    await expect(user.locator('.figcaption')).toBeVisible();
    await expect(
      user.getByRole('link', { name: 'View profile' })
    ).toBeVisible();
  }
});