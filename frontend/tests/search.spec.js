import { test, expect } from "@playwright/test";

const resultsSelector = '[data-test-id="result-link"]';
const xPathDropdownFilter =
  "xpath=//button[contains(@id, 'dropdown-filters-checkboxes') and text()='{TEXT}']";
const processedSelector = '[id="checkbox-Processed Data"]';
const xPathProcessingStatus =
  "xpath=//a[contains(@data-test-id, 'result-link')]/../div/div/span[text()='{STATUS}']";
const xPathThreeDots =
  "xpath=//a[contains(@data-test-id, 'result-link')]/../../../div[contains(@class,'mt-1 dropdown')]/div";

test("search query updates URL exactly to baseURL/?q=<query>", async ({
  page,
  baseURL,
}) => {
  const query = "test";

  await page.goto(baseURL);

  await page.fill('input[type="search"]', query);

  await page.press('input[type="search"]', "Enter");

  const expectedUrl = `${baseURL}/?q=${encodeURIComponent(query)}`;
  await page.waitForURL(expectedUrl);

  await expect(page).toHaveURL(expectedUrl);
});

test("clicking on the edp link leads to detail view", async ({
  page,
  baseURL,
}) => {
  await page.goto(baseURL + "/");

  const firstResultSelector = '[data-test-id="result-link"]';

  const firstResultLink = await page
    .locator(firstResultSelector)
    .first()
    .getAttribute("href");
  await page.locator(firstResultSelector).first().click();

  const expectedUrl = `${baseURL}${firstResultLink}`;
  await page.waitForURL(expectedUrl);
  await expect(page).toHaveURL(expectedUrl);
});

test("clicking on the quick view icon shows quick view dropdown", async ({
  page,
  baseURL,
}) => {
  await page.goto(baseURL);

  const quickViewTogglerSelector = '[data-test-id="quick-view-toggle-button"]';
  const quickViewSelector = '[data-test-id="quick-view"]';

  await page.locator(quickViewTogglerSelector).first().click();

  const quickView = page.locator(quickViewSelector);
  await expect(quickView).toBeVisible();
});

test("go to details via quick view", async ({ page, baseURL }) => {
  await page.goto(baseURL);

  const quickViewTogglerSelector = '[data-test-id="quick-view-toggle-button"]';
  const quickViewSelector = '[data-test-id="quick-view"]';

  await page.locator(quickViewTogglerSelector).first().click();

  const quickView = page.locator(quickViewSelector);
  await expect(quickView).toBeVisible();
  await page.getByText("Details").click();
  await expect(page.getByText("Data Science Info")).toBeVisible();
});

test("get schema via quick view", async ({ page, baseURL }) => {
  await page.goto(baseURL);

  const quickViewTogglerSelector = '[data-test-id="quick-view-toggle-button"]';
  const quickViewSelector = '[data-test-id="quick-view"]';

  await page.locator(quickViewTogglerSelector).first().click();

  const quickView = page.locator(quickViewSelector);
  await expect(quickView).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByText("Schema").click();
  const download = await downloadPromise;
});

test("get report via quick view", async ({ page, baseURL }) => {
  await page.goto(baseURL);

  const quickViewTogglerSelector = '[data-test-id="quick-view-toggle-button"]';
  const quickViewSelector = '[data-test-id="quick-view"]';

  await page.locator(quickViewTogglerSelector).first().click();

  const quickView = page.locator(quickViewSelector);
  await expect(quickView).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByText("Report (pdf)").click();
  const download = await downloadPromise;
});

test("get dataset via quick view", async ({ page, baseURL }) => {
  await page.goto(baseURL);

  const quickViewTogglerSelector = '[data-test-id="quick-view-toggle-button"]';
  const quickViewSelector = '[data-test-id="quick-view"]';

  await page.locator(quickViewTogglerSelector).first().click();

  const quickView = page.locator(quickViewSelector);
  await expect(quickView).toBeVisible();

  const promise = page.waitForEvent("download");
  await page.getByText("Get Dataset").click();
  const download = await promise;
});

test("get dataset via three dot menu", async ({ page, baseURL }) => {
  await page.goto(baseURL);
  const resultName = await page.locator(resultsSelector).nth(0).innerText();
  await page.locator(xPathThreeDots).nth(0).click();
  const promise = page.waitForEvent("download");
  await page.getByText("Get Dataset").click();
  const popup = await promise;
});

test("get dataset from detail page", async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await page.locator(resultsSelector).nth(0).click();
  const promise = page.waitForEvent("download");
  await page.getByText("Get Dataset").click();
  const download = await promise;
});

test("search for title of the first listed asset", async ({
  page,
  baseURL,
}) => {
  await page.goto(baseURL);

  const firstResultName = await page
    .locator(resultsSelector)
    .first()
    .innerText();

  await page.fill('input[type="search"]', firstResultName);
  await page.press('input[type="search"]', "Enter");
  await page.waitForTimeout(1000);
  const newFirstResultName = await page
    .locator(resultsSelector)
    .first()
    .innerText();
  expect(newFirstResultName).toBe(firstResultName);
});

test("filter for asset processing", async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await page.getByText("Filter").click();
  await page
    .locator(xPathDropdownFilter.replace("{TEXT}", "Asset processing"))
    .first()
    .click();
  await page.locator(processedSelector).first().click();
  await page.waitForTimeout(2000);
  await expect(page.getByText("assetProcessingStatus")).toBeVisible();
  await expect(
    page
      .locator(xPathProcessingStatus.replace("{STATUS}", "Processed Data"))
      .first(),
  ).toBeVisible();
  await expect(
    page.locator(xPathProcessingStatus.replace("{STATUS}", "Original Data")),
  ).toHaveCount(0);
});
