import { test, expect } from '@playwright/test';

test('bookmarks first result and verifies it on the bookmarks page', async ({ page, baseURL }) => {

    await page.goto(`${baseURL}`);

    // Selector for the first result and bookmark button
    const firstResultSelector = '[data-test-id="result-link"]';
    const bookmarkButtonSelector = '[data-test-id="bookmark-button"]';
    const quickViewToggleSelector = '[data-test-id="quick-view-toggle-button"]';

    // Get the name of the first result item
    const firstResultName = await page.locator(firstResultSelector).first().innerText();

    // Click the quick view toggle button to reveal options including the bookmark button
    await page.locator(quickViewToggleSelector).first().click();

    // Click the bookmark button for the first result item
    await page.locator(bookmarkButtonSelector).first().click();

    // Navigate to the /bookmarks page
    await page.goto(`${baseURL}/bookmarks`);

    // Selector for bookmarked item name in the /bookmarks page
    const bookmarkedItemSelector = `[data-test-id="result-link"]:has-text("${firstResultName}")`;

    // Verify that the bookmarked item appears on the /bookmarks page
    await expect(page.locator(bookmarkedItemSelector)).toBeVisible();
});
