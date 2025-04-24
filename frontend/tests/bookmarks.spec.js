import { test, expect } from "@playwright/test";

// Selectors and xPaths
const resultsSelector = '[data-test-id="result-link"]';
const bookmarkButtonSelector = '[data-test-id="bookmark-button"]';
const quickViewToggleSelector = '[data-test-id="quick-view-toggle-button"]';
const bookmarkedItemIcon = ".bookmarked-item-icon";
const edpOptionsDropdownToggleSelector = ".options-dropdown";
const xPathAlert =
  "xpath=//div[contains(@role, 'alert')]/div[text()='{MESSAGE}']";
const xPathCloseAlert = "xpath=//div[contains(@role, 'alert')]/../button";
const messageSaved = "Bookmark saved!";
const messageRemoved = "Bookmark removed!";

test("bookmarks first result via quick view and verifies it on the bookmarks page", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);

  // Get the name of the first result item
  const firstResultName = await page
    .locator(resultsSelector)
    .first()
    .innerText();

  await page.locator(quickViewToggleSelector).first().click();
  await page.locator(bookmarkButtonSelector).first().click();

  await expect(
    page.locator(xPathAlert.replace("{MESSAGE}", messageSaved)),
  ).toBeVisible();
  await page.goto(`${baseURL}/bookmarks`);
  await expect(page.getByText(firstResultName)).toBeVisible();
});

test("bookmarks second result via three dots menu and verifies it on the bookmarks page", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);

  // Get the name of the second result item
  const secondResultName = await page
    .locator(resultsSelector)
    .nth(1)
    .innerText();

  // Scroll down to ensure there will not be an overlay issue
  await page.locator(resultsSelector).nth(1).scrollIntoViewIfNeeded();
  await page.locator(edpOptionsDropdownToggleSelector).nth(1).click();
  await page.getByText("Bookmark").click();

  // Verify Message
  await expect(
    page.locator(xPathAlert.replace("{MESSAGE}", messageSaved)),
  ).toBeVisible();
  await page.locator(xPathCloseAlert).click();
  await expect(
    page.locator(xPathAlert.replace("{MESSAGE}", messageSaved)),
  ).toHaveCount(0);

  // Verify stars appeared
  await expect(page.locator(bookmarkedItemIcon)).toBeVisible();

  // Navigate to the /bookmarks page
  await page.goto(`${baseURL}/bookmarks`);

  // Verify that the bookmarked item appears on the /bookmarks page
  await expect(page.getByText(secondResultName)).toBeVisible();
});

test("bookmarks third result details page and verifies it on the bookmarks page", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);

  // Get the name of the third result item
  const thirdResultName = await page
    .locator(resultsSelector)
    .nth(2)
    .innerText();

  // Scroll to item and click to open details page
  await page.locator(resultsSelector).nth(2).scrollIntoViewIfNeeded();
  await page.locator(resultsSelector).nth(2).click();

  // Bookmark via details page
  await page.locator(bookmarkButtonSelector).click();

  // Verify Message
  await expect(
    page.locator(xPathAlert.replace("{MESSAGE}", messageSaved)),
  ).toBeVisible();
  await page.locator(xPathCloseAlert).click();
  await expect(
    page.locator(xPathAlert.replace("{MESSAGE}", messageSaved)),
  ).toHaveCount(0);

  // Verify item is bookmarked
  await expect(page.locator(bookmarkButtonSelector)).not.toBeVisible();
  await expect(page.getByText("Remove Bookmark")).toBeVisible();

  // Navigate to the /bookmarks page
  await page.goto(`${baseURL}/bookmarks`);

  // Verify that the bookmarked item appears on the /bookmarks page
  await expect(page.getByText(thirdResultName)).toBeVisible();
});

test("removes bookmarked entry from bookmarks page via quick view", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);

  // Set a bookmark first
  const fourthResultName = await page
    .locator(resultsSelector)
    .nth(3)
    .innerText();
  await page.locator(resultsSelector).nth(3).scrollIntoViewIfNeeded();
  await page.locator(quickViewToggleSelector).nth(3).click();
  await page.locator(bookmarkButtonSelector).first().click();

  // Navigate to the /bookmarks page
  await page.goto(`${baseURL}/bookmarks`);

  // Verify that the bookmarked item appears on the /bookmarks page
  await expect(page.locator(`text="${fourthResultName}"`)).toBeVisible();

  // Click the quick view toggle button to reveal options including the bookmark button
  await page.locator(quickViewToggleSelector).first().click();
  await expect(page.locator(bookmarkButtonSelector).first()).not.toBeVisible();
  await page.getByText("Remove Bookmark").click();

  // Verify Message
  await expect(
    page.locator(xPathAlert.replace("{MESSAGE}", messageRemoved)),
  ).toBeVisible();
  await page.locator(xPathCloseAlert).click();
  await expect(
    page.locator(xPathAlert.replace("{MESSAGE}", messageRemoved)),
  ).toHaveCount(0);

  // Verify the bookmarked item disappeared
  await expect(page.locator(`text="${fourthResultName}"`)).not.toBeVisible();
});

test("removes bookmarked entry from bookmarks page via three dots menu", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);

  // Set a bookmark first
  const fifthResultName = await page
    .locator(resultsSelector)
    .nth(4)
    .innerText();
  await page.locator(resultsSelector).nth(4).scrollIntoViewIfNeeded();
  await page.locator(quickViewToggleSelector).nth(4).click();
  await page.locator(bookmarkButtonSelector).first().click();

  // Navigate to the /bookmarks page
  await page.goto(`${baseURL}/bookmarks`);

  // Selector for bookmarked item name in the /bookmarks page
  const bookmarkedItemSelector = `[data-test-id="result-link"]:has-text("${fifthResultName}")`;

  // Verify that the bookmarked item appears on the /bookmarks page
  await expect(page.locator(bookmarkedItemSelector)).toBeVisible();

  // Remove bookmark via three dots menu
  await page.locator(edpOptionsDropdownToggleSelector).first().click();
  await page.getByText("Remove Bookmark").click();

  // Verify Message
  await expect(
    page.locator(xPathAlert.replace("{MESSAGE}", messageRemoved)),
  ).toBeVisible();
  await page.locator(xPathCloseAlert).click();
  await expect(
    page.locator(xPathAlert.replace("{MESSAGE}", messageRemoved)),
  ).toHaveCount(0);

  // Verify the bookmarked item disappeared
  await expect(page.locator(bookmarkedItemSelector)).not.toBeVisible();
});
