import { test, expect } from "@playwright/test";
import path from "path";

test.describe("Unsupported file format upload is rejected with allowed-format error on ID Upload & OCR Extraction", () => {
  test("TC00012", async ({ page }) => {
    test.setTimeout(180000); // OCR processing can take time

    // Step 1: Open URL
    await page.goto("https://digital-onboarding-fe.bravesky-d9f9eeb7.eastus2.azurecontainerapps.io/");
    await page.waitForLoadState("networkidle");

    // Step 2: Click New Onboarding menu link
    await page.getByRole("link", { name: "New Onboarding" }).click();
    await page.waitForLoadState("networkidle");

    // Step 3: Click Start Onboarding
    await page.getByRole("button", { name: "Start Onboarding" }).click();
    await page.waitForLoadState("networkidle");

    // Step 4: Upload invalid ID (inavlid.pdf — unreadable/non-ID document)
    const invalidIdPath = path.resolve("./testdata/inavlid.pdf");
    await page.locator("input[type='file']").first().setInputFiles(invalidIdPath);

    // Wait for the app to process the uploaded file
    await page.waitForTimeout(5000);

    // Step 5: Assert that an allowed-format error is shown after unsupported file upload.
    // The app MUST reject the file and display a format validation error.
    // Expected: a message such as "Invalid file format", "Unsupported file type",
    // or "Only JPG, PNG, PDF files are allowed" should appear.
    // This test is expected to FAIL if the app silently accepts the file
    // instead of rejecting it with a proper format error.
    await expect(
      page.getByText(/invalid file format|unsupported file|unsupported format|only jpg|only png|only pdf|file type not allowed|not a valid format/i)
    ).toBeVisible({ timeout: 10000 });
  });
});
