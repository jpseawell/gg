import { defineConfig, devices } from "@playwright/test";

const isCi = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./tests/smoke",
  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 1 : 0,
  reporter: isCi ? "github" : "list",
  use: {
    trace: "on-first-retry",
  },
  webServer: [
    {
      command: "pnpm --filter @gg/app preview --host 127.0.0.1 --port 4173",
      url: "http://127.0.0.1:4173",
      reuseExistingServer: !isCi,
      timeout: 120_000,
    },
    {
      command:
        "pnpm --filter @gg/marketing preview --host 127.0.0.1 --port 4322",
      url: "http://127.0.0.1:4322",
      reuseExistingServer: !isCi,
      timeout: 120_000,
    },
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
