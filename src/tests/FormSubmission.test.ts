import { test, expect } from '@playwright/test';

test('Form submission should work as expected', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Adjust URL if different

  // Input JSON schema
  const jsonEditor = await page.locator('textarea');
  await jsonEditor.fill('{"formTitle": "Test Form", "fields": [{"id": "name", "type": "text", "label": "Name", "required": true}]}');

  // Wait for the form to be rendered
  await page.waitForSelector('label:has-text("Name")');

  // Fill the form
  const inputField = await page.locator('input[name="name"]');
  await inputField.fill('John Doe');

  // Submit the form
  const submitButton = await page.locator('button[type="submit"]');
  await submitButton.click();

  // Check for success message
  const successMessage = await page.locator('text=Form submitted successfully!');
  await expect(successMessage).toBeVisible();
});

test('Form should show error for missing required fields', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Input JSON schema
  const jsonEditor = await page.locator('textarea');
  await jsonEditor.fill('{"formTitle": "Test Form", "fields": [{"id": "name", "type": "text", "label": "Name", "required": true}]}');

  // Wait for the form to be rendered
  await page.waitForSelector('label:has-text("Name")');

  // Submit the form without filling in the field
  const submitButton = await page.locator('button[type="submit"]');
  await submitButton.click();

  // Check for validation error
  const errorMessage = await page.locator('text=This field is required');
  await expect(errorMessage).toBeVisible();
});
