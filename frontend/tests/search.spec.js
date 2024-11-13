import { test, expect } from '@playwright/test';

test('search query updates URL exactly to baseURL/search?q=<query>', async ({ page, baseURL }) => {
    const query = 'test';

    await page.goto(baseURL);

    // Locate the search input and type the query
    await page.fill('input[type="search"]', query);

    // Submit the form (assuming Enter works to submit)
    await page.press('input[type="search"]', 'Enter');

    // Wait for the URL to match the expected value
    const expectedUrl = `${baseURL}/search?q=${encodeURIComponent(query)}`;
    await page.waitForURL(expectedUrl);

    // Assert the URL is exactly as expected
    await expect(page).toHaveURL(expectedUrl);
});