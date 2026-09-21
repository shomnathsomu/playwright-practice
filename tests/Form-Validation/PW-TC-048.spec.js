// Practice Test Case #48 — Required-Field Validation

import { test, expect } from '@playwright/test';

test.use({
    viewport: {
        height: 768,
        width: 1366
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

test('TC-048 - Verify required-field validation', async ({ page }) => {

    await page.goto('https://demoqa.com/automation-practice-form');

    // Locate fields
    const firstName = page.getByPlaceholder('First Name');
    const lastName = page.getByPlaceholder('Last Name');
    const mobile = page.getByPlaceholder('Mobile Number');

    // Fill all required fields EXCEPT First Name
    await lastName.fill('Doe');

    // Select gender
    await page.getByText('Male', { exact: true }).click();

    // Fill mobile number
    await mobile.fill('9876543210');

    // Submit form
    await page.getByRole('button', { name: 'Submit' }).click();

    // First Name should be invalid because it is required
    await expect(firstName).toHaveJSProperty(
        'validity.valid',
        false
    );

    // Verify the reason is "value missing"
    await expect(firstName).toHaveJSProperty(
        'validity.valueMissing',
        true
    );

    // Successful submission should NOT occur
    await expect(
        page.getByText('Thanks for submitting the form')
    ).not.toBeVisible();
});