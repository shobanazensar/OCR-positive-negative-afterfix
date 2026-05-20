import { test, expect } from "@playwright/test";
import path from "path";

test.describe("Readable supported ID uploads to Extracted and populates Name, Date of Birth, and ID Number within 2 minutes", () => {
  test("TC00006", async ({ page }) => {
    test.setTimeout(180000); // OCR can take up to 2 minutes

    // Step 1: Open URL
    await page.goto("https://digital-onboarding-fe.bravesky-d9f9eeb7.eastus2.azurecontainerapps.io/");
    await page.waitForLoadState("networkidle");

    // Step 2: Click New Onboarding menu link
    await page.getByRole("link", { name: "New Onboarding" }).click();
    await page.waitForLoadState("networkidle");

    // Step 3: Click Start Onboarding
    await page.getByRole("button", { name: "Start Onboarding" }).click();
    await page.waitForLoadState("networkidle");

    // Step 4: Upload valid ID (Valid.png)
    const validIdPath = path.resolve("./testdata/Valid.png");
    await page.locator("input[type='file']").first().setInputFiles(validIdPath);

    // Wait for OCR processing to complete (up to 2 minutes)
    await expect(page.getByText("Processing")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Processing")).not.toBeVisible({ timeout: 120000 });

    // Step 5: Check extracted details match expected values
    await expect(page.getByText("✓ Extracted")).toBeVisible();
    await expect(page.getByText("5 fields extracted")).toBeVisible();
    await expect(page.getByText("JOHN DOE")).toBeVisible();
    await expect(page.getByText("1990-01-01")).toBeVisible();
    await expect(page.getByText("123456789")).toBeVisible();
  });
});
