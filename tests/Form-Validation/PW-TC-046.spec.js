// Practice Test Case #46 — Submit Valid Form

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

test('TC-046 - Submit valid registration form', async ({ page }) => {

    // Navigate to DemoQA Practice Form
    await page.goto('https://demoqa.com/automation-practice-form');

    // Verify page title
    await expect(page).toHaveTitle(/demosite/);

    // Fill first name
    await page.getByPlaceholder('First Name').fill('John');

    // Fill last name
    await page.getByPlaceholder('Last Name').fill('Doe');

    // Fill email
    await page.getByPlaceholder('name@example.com')
        .fill('john.doe@example.com');

    // Select gender
    await page.getByText('Male', { exact: true }).click();

    // Fill mobile number
    await page.getByPlaceholder('Mobile Number')
        .fill('9876543210');

    await page.getByPlaceholder('Mobile Number').press('Tab');
    await page.locator('#dateOfBirthInput').press('Tab');

    // Select subject
    await page.locator('#subjectsInput').fill('Computer Science');

    await page.keyboard.press('Enter');

    // Select hobby
    await page.getByText('Sports', { exact: true }).click();

    // Fill address
    await page.getByPlaceholder('Current Address')
        .fill('123 Main Street');
    await page.getByPlaceholder('Current Address').press('Tab');

    // Select state
    await page.locator("//input[@id='react-select-3-input']").click();
    await page.getByText('NCR', { exact: true }).click();

    // Select city
    await page.locator("//input[@id='react-select-4-input']").click();
    await page.getByText('Delhi', { exact: true }).click();

    // Submit form
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify confirmation modal
    await expect(page.getByText('Thanks for submitting the form'))
        .toBeVisible();

    // Verify submitted data
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('john.doe@example.com')).toBeVisible();
    await expect(page.locator("//td[normalize-space()='Male']")).toBeVisible();
    await expect(page.getByText('9876543210')).toBeVisible();
});