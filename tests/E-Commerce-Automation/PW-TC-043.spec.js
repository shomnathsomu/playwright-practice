// Practice Test Case #43 — Continue Shopping from Cart

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


test('TC43 - Continue shopping from cart', async ({ page }) => {
  // 1. Open SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // 2. Login
  await page.getByRole('textbox', { name: 'Username' })
    .fill('standard_user');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' })
    .click();

  // 3. Verify Products page
  await expect(page).toHaveURL(/inventory\.html/);

  // 4. Add a product to the cart
  const productName = 'Sauce Labs Backpack';

  const productCard = page.locator('.inventory_item').filter({
    hasText: productName
  });

  await expect(productCard).toBeVisible();

  await productCard.getByRole('button', {
    name: 'Add to cart'
  }).click();

  // 5. Open the cart
  await page.locator('a.shopping_cart_link').click();

  // 6. Verify Cart page
  await expect(page).toHaveURL(/cart\.html/);

  await expect(
    page.getByText(productName, { exact: true })
  ).toBeVisible();

  // 7. Click Continue Shopping
  await page.getByRole('button', {
    name: 'Continue Shopping'
  }).click();

  // 8. Verify navigation back to Products page
  await expect(page).toHaveURL(/inventory\.html/);

  // 9. Verify Products page is displayed
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  // 10. Verify previously added product is still in the cart
  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText('1');
});