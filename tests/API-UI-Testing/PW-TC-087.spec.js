// Practice Test Case #87 — Use API-Created Data in UI

import { test, expect } from '@playwright/test';

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

test('TC87 - Use API-created data in UI', async ({ request, page }) => {

  // 1. Generate unique test data
  const email = `playwright_${Date.now()}@example.com`;
  const password = 'Playwright@123';

  console.log(email);

  const userData = {
    name: 'Playwright API User',
    email,
    password,
    title: 'Mr',
    birth_date: '10',
    birth_month: '9',
    birth_year: '1994',
    firstname: 'Playwright',
    lastname: 'Tester',
    company: 'QA Company',
    address1: '123 Automation Street',
    address2: 'Test Area',
    country: 'India',
    zipcode: '12345',
    state: 'Test State',
    city: 'Test City',
    mobile_number: '9876543210'
  };

  // 2. Create user through API
  const createUserResponse = await request.post(
    'https://automationexercise.com/api/createAccount',
    {
      form: userData
    }
  );

  // 3. Verify API response
  expect(createUserResponse.status()).toBe(200);

  const createUserBody = await createUserResponse.json();

  expect(createUserBody.responseCode).toBe(201);
  expect(createUserBody.message).toBe('User created!');

  // 4. Open UI
  await page.goto('https://automationexercise.com/login');

  // 5. Verify login page
  await expect(
    page.getByText('Login to your account')
  ).toBeVisible();

  // 6. Login using API-created credentials
  await page.locator("input[data-qa='login-email']").fill(email);
  await page.getByPlaceholder('Password').fill(password);

  await page.getByRole('button', { name: 'Login' }).click();

  // 7. Verify successful UI login
  await expect(
    page.getByText('Logged in as Playwright API User')
  ).toBeVisible();
});