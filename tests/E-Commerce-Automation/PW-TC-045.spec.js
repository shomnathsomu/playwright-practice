// Practice Test Case #45 — Verify Order Completion

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


test('TC45 - Verify order completion', async ({ page }) => {

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

  // 4. Add product to cart
  const productName = 'Sauce Labs Backpack';

  const productCard = page.locator('.inventory_item').filter({
    hasText: productName
  });

  await expect(productCard).toBeVisible();

  await productCard.getByRole('button', {
    name: 'Add to cart'
  }).click();

  // 5. Open cart
  await page.locator('a.shopping_cart_link').click();

  // 6. Verify cart
  await expect(page).toHaveURL(/cart\.html/);

  await expect(
    page.getByText(productName, { exact: true })
  ).toBeVisible();

  // 7. Start checkout
  await page.getByRole('button', {
    name: 'Checkout'
  }).click();

  // 8. Verify checkout information page
  await expect(page).toHaveURL(/checkout-step-one\.html/);

  // 9. Enter customer information
  await page.getByRole('textbox', {
    name: 'First Name'
  }).fill('John');

  await page.getByRole('textbox', {
    name: 'Last Name'
  }).fill('Doe');

  await page.getByRole('textbox', {
    name: 'Zip\/Postal Code'
  }).fill('12345');

  // 10. Continue to overview
  await page.getByRole('button', {
    name: 'Continue'
  }).click();

  // 11. Verify checkout overview
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await expect(
    page.getByText(productName, { exact: true })
  ).toBeVisible();

  // 12. Finish the order
  await page.getByRole('button', {
    name: 'Finish'
  }).click();

  // 13. Verify order completion URL
  await expect(page).toHaveURL(/checkout-complete\.html/);

  // 14. Verify order confirmation message
  await expect(
    page.getByText('Thank you for your order!')
  ).toBeVisible();

  // 15. Verify confirmation heading
  await expect(
    page.getByRole('heading', {
      name: 'Thank you for your order!'
    })
  ).toBeVisible();

  // 16. Verify completion message
  await expect(
    page.getByText(
      /Your order has been dispatched, and will arrive just as fast as the pony can get there!/
    )
  ).toBeVisible();
});