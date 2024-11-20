import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
