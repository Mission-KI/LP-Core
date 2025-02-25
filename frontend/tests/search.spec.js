import { test, expect } from '@playwright/test';

test('search query updates URL exactly to baseURL/?q=<query>', async ({ page, baseURL }) => {
    const query = 'test';

    await page.goto(baseURL);

    await page.fill('input[type="search"]', query);

    await page.press('input[type="search"]', 'Enter');

    const expectedUrl = `${baseURL}/?q=${encodeURIComponent(query)}`;
    await page.waitForURL(expectedUrl);

    await expect(page).toHaveURL(expectedUrl);
});

test('clicking on the edp link leads to detail view', async ({ page, baseURL }) => {

    await page.goto(baseURL+'/');

    const firstResultSelector = '[data-test-id="result-link"]';

    const firstResultLink = await page.locator(firstResultSelector).first().getAttribute('href');
    await page.locator(firstResultSelector).first().click();

    const expectedUrl = `${baseURL}${firstResultLink}`;
    await page.waitForURL(expectedUrl);
    await expect(page).toHaveURL(expectedUrl);
});

test('clicking on the quick view icon shows quick view dropdown', async ({ page, baseURL }) => {

    await page.goto(baseURL);

    const quickViewTogglerSelector = '[data-test-id="quick-view-toggle-button"]';
    const quickViewSelector = '[data-test-id="quick-view"]';

    await page.locator(quickViewTogglerSelector).first().click();

    const quickView = page.locator(quickViewSelector);
    await expect(quickView).toBeVisible();
});