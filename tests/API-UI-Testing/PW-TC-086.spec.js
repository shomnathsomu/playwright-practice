// Practice Test Case #86 — Create Test Data Through API

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

test('TC86 - Create test data through API', async ({ request }) => {

  const users = [
    {
      name: 'Playwright QA Engineer 1',
      job: 'Automation Engineer'
    },
    {
      name: 'Playwright QA Engineer 2',
      job: 'SDET'
    },
    {
      name: 'Playwright QA Engineer 3',
      job: 'Tester'
    }
  ];

  for (const user of users) {
    const response = await request.post(
      'https://reqres.in/api/users',
      {
        data: user
      }
    );

    // Verify HTTP status
    expect(response.status()).toBe(201);

    // Read response body
    const responseBody = await response.json();

    // Verify submitted data
    expect(responseBody.name).toBe(user.name);
    expect(responseBody.job).toBe(user.job);

    // Verify generated ID
    expect(responseBody.id).toBeTruthy();

    // Verify created timestamp
    expect(responseBody.createdAt).toBeTruthy();

    console.log('Created User:', responseBody);
  }
  
});