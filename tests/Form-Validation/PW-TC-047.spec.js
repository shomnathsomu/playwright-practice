// Practice Test Case #47 — Submit Empty Form

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

test('TC-047 - Submit empty registration form', async ({ page }) => {

    await page.goto('https://demoqa.com/automation-practice-form');

    const firstName = page.getByPlaceholder('First Name');
    const lastName = page.getByPlaceholder('Last Name');
    const mobile = page.getByPlaceholder('Mobile Number');

    // Submit empty form
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify required fields are invalid
    await expect(firstName).toHaveJSProperty(
        'validity.valid',
        false
    );

    await expect(lastName).toHaveJSProperty(
        'validity.valid',
        false
    );

    await expect(mobile).toHaveJSProperty(
        'validity.valid',
        false
    );

    // Email is optional when empty, so DON'T assert validity.valid = false
    const email = page.getByPlaceholder('name@example.com');

    await expect(email).toHaveJSProperty(
        'validity.valid',
        true
    );

    // Successful submission should NOT occur
    await expect(
        page.getByText('Thanks for submitting the form')
    ).not.toBeVisible();
});