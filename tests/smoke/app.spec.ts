import { expect, test } from "@playwright/test";

test("app renders the starter shell", async ({ page }) => {
  await page.goto("http://127.0.0.1:4173/");

  await expect(page).toHaveTitle("gg app");
  await expect(
    page.getByRole("heading", {
      name: "Start the repo with clear product boundaries.",
    }),
  ).toBeVisible();
  await expect(page.getByText("pnpm dev:api")).toBeVisible();
});
