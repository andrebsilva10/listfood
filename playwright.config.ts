import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  testMatch: /.*\.spec\.ts$/,
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:8081',
    headless: false,
    launchOptions: {
      slowMo: 1000,
    },
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});
