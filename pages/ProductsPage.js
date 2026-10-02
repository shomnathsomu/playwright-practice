import { expect } from '@playwright/test';

export class ProductsPage {

  constructor(page) {
    this.page = page;

    this.pageTitle = page.getByText(
      'Products',
      { exact: true }
    );

    this.productItems = page.locator(
      '.inventory_item'
    );

    this.cartLink = page.locator('a.shopping_cart_link');
  }

  async verifyProductsPage() {
    await expect(
      this.pageTitle
    ).toBeVisible();
  }

  async addProductToCart(productName) {

    const product = this.productItems.filter({
      hasText: productName
    });

    await product
      .getByRole('button', {
        name: 'Add to cart'
      })
      .click();
  }

  async openCart() {

    await this.cartLink.click();
  }

  async getProductCount() {

    return await this.productItems.count();
  }
}