import { expect, test } from "@playwright/test";

test("marketing renders the starter page", async ({ page }) => {
  await page.goto("http://127.0.0.1:4322/");

  await expect(page).toHaveTitle("gg marketing");
  await expect(
    page.getByRole("heading", {
      name: "Ship product, content, and infrastructure from one clean repo.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Docs are first-class" }),
  ).toBeVisible();
});
