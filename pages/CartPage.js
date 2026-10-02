import { expect } from '@playwright/test';

export class CartPage {

  constructor(page) {
    this.page = page;

    this.cartItems = page.locator(
      '.cart_item'
    );

    this.checkoutButton = page.getByRole(
      'button',
      { name: 'Checkout' }
    );
  }

  async verifyProduct(productName) {

    await expect(
      this.cartItems.filter({
        hasText: productName
      })
    ).toBeVisible();
  }

  async getCartItemCount() {

    return await this.cartItems.count();
  }

  async checkout() {

    await this.checkoutButton.click();
  }
}