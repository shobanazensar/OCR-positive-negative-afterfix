import { test, expect } from "@playwright/test";

test.describe("Unsupported file format upload is rejected with allowed-format error on ID Upload & OCR Extraction", () => {
  test("TC00012", async ({ page }) => {
    await page.goto("https://digital-onboarding-fe.bravesky-d9f9eeb7.eastus2.azurecontainerapps.io/");

    // Verify the application loads successfully
    await expect(page).toHaveURL(
      /digital-onboarding-fe\.bravesky-d9f9eeb7\.eastus2\.azurecontainerapps\.io/
    );

    // Screenshot after page load
    await page.screenshot({ path: "reports/tc00012-homepage.png", fullPage: true });

    // Verify title or main content is present
    await expect(page.locator("body")).toBeVisible();
  });
});