import { test, expect } from "@playwright/test";

test("should allow you to login and logout", async ({ page }) => {
  const email = "t@example.com";
  const password = "12121212";
  const url = "http://localhost:5173/";
  const name = "test";
  await page.goto(url);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(
    page.getByRole("button", { name: name.charAt(0).toUpperCase() }),
  ).toContainText("T");
  await page.getByRole("button", { name: "T" }).click();
  await expect(page.getByText(name)).toBeVisible();
  await page.getByRole("button", { name: "Logout" }).click();
  await page.getByRole("link", { name: "Sign In" }).isVisible();
});
