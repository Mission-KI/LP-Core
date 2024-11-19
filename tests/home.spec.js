import { test, expect } from '@playwright/test';

test('home page has correct title', async ({ page, baseURL }) => {
  await page.goto(baseURL);
  
  await expect(page).toHaveTitle('Daseen - Large Dataset Search Engine');
});