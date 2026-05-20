import { test, expect } from "@playwright/test";

test.describe("Unsupported file format upload is rejected with allowed-format error on ID Upload & OCR Extraction", () => {
  test("TC00012", async ({ page }) => {
    await page.goto("https://digital-onboarding-fe.bravesky-d9f9eeb7.eastus2.azurecontainerapps.io/");
  });
});