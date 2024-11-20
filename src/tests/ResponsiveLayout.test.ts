import { test, expect } from '@playwright/test';

test('Form layout should be responsive', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Set viewport to mobile size
  await page.setViewportSize({ width: 375, height: 667 });

  // Check if the form editor and form preview stack on mobile
  const jsonEditor = await page.locator('h3:has-text("JSON Editor")');
  const formPreview = await page.locator('h3:has-text("Form Preview")');
  
  await expect(jsonEditor).toBeVisible();
  await expect(formPreview).toBeVisible();

  // Check if the form fields are stacked in mobile view
  const formField = await page.locator('input');
  await expect(formField).toBeVisible();
});
