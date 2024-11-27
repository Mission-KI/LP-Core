import { test, expect } from '@playwright/test';

test('search query updates URL exactly to baseURL/?q=<query>', async ({ page, baseURL }) => {
    const query = 'test';

    await page.goto(baseURL);

    // Locate the search input and type the query
    await page.fill('input[type="search"]', query);

    // Submit the form (assuming Enter works to submit)
    await page.press('input[type="search"]', 'Enter');

    // Wait for the URL to match the expected value
    const expectedUrl = `${baseURL}/?q=${encodeURIComponent(query)}`;
    await page.waitForURL(expectedUrl);

    // Assert the URL is exactly as expected
    await expect(page).toHaveURL(expectedUrl);
});

test('clicks first result link and checks the URL', async ({ page, baseURL }) => {

    await page.goto(baseURL+'/');

    const firstResultSelector = '[data-test-id="result-link"]';

    // Use locator to get the href attribute and click
    const firstResultLink = await page.locator(firstResultSelector).first().getAttribute('href');
    await page.locator(firstResultSelector).first().click();

    // Wait for navigation to complete and check the URL
    const expectedUrl = `${baseURL}${firstResultLink}`;
    await page.waitForURL(expectedUrl);
    await expect(page).toHaveURL(expectedUrl);
});