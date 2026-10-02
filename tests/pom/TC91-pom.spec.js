import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';


test.use({
  viewport: {
    height: 768,
    width: 1366
  },

  ignoreHTTPSErrors: true,

  launchOptions: {
    slowMo: 1000
  }
});


test.beforeEach(async () => {
  test.setTimeout(120_000);
});


test('TC91 - Create Page Object Model', async ({ page }) => {

  // ----------------------------------------
  // 1. Create Page Objects
  // ----------------------------------------

  const loginPage = new LoginPage(page);

  const productsPage = new ProductsPage(page);

  const cartPage = new CartPage(page);


  // ----------------------------------------
  // 2. Login
  // ----------------------------------------

  await loginPage.goto();

  await loginPage.login(
    'standard_user',
    'secret_sauce'
  );


  // ----------------------------------------
  // 3. Verify Products Page
  // ----------------------------------------

  await productsPage.verifyProductsPage();


  // ----------------------------------------
  // 4. Add product
  // ----------------------------------------

  const productName =
    'Sauce Labs Backpack';

  await productsPage.addProductToCart(
    productName
  );


  // ----------------------------------------
  // 5. Open Cart
  // ----------------------------------------

  await productsPage.openCart();


  // ----------------------------------------
  // 6. Verify product in cart
  // ----------------------------------------

  await cartPage.verifyProduct(
    productName
  );


  // ----------------------------------------
  // 7. Verify cart count
  // ----------------------------------------

  const cartItemCount =
    await cartPage.getCartItemCount();

  expect(cartItemCount).toBe(1);
});