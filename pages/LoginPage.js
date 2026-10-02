import { expect } from '@playwright/test';

export class LoginPage {

  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput = page.getByRole('textbox', {
      name: 'Username'
    });

    this.passwordInput = page.getByRole('textbox', {
      name: 'Password'
    });

    this.loginButton = page.getByRole('button', {
      name: 'Login'
    });

    this.errorMessage = page.locator(
      '[data-test="error"]'
    );
  }

  // Page action
  async goto() {
    await this.page.goto(
      'https://www.saucedemo.com/'
    );
  }

  // Page action
  async login(username, password) {

    await this.usernameInput.fill(username);

    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }

  // Page assertion
  async verifyLoginError() {

    await expect(
      this.errorMessage
    ).toBeVisible();
  }
}