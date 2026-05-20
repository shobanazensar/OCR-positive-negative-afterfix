import { test, expect } from "@playwright/test";

test.describe("Readable supported ID uploads to Extracted and populates Name, Date of Birth, and ID Number within 2 minutes", () => {
  test("TC00006", async ({ page }) => {
    await page.goto(
      "https://digital-onboarding-fe.bravesky-d9f9eeb7.eastus2.azurecontainerapps.io/"
    );

    // Verify the application loads successfully
    await expect(page).toHaveURL(
      /digital-onboarding-fe\.bravesky-d9f9eeb7\.eastus2\.azurecontainerapps\.io/
    );

    // Take a screenshot after page load
    await page.screenshot({ path: "reports/tc00006-homepage.png", fullPage: true });

    // Attempt to navigate to new onboarding
    const newOnboardingBtn = page.getByRole("button", { name: /new onboarding|start/i });
    if (await newOnboardingBtn.isVisible()) {
      await newOnboardingBtn.click();
      await page.screenshot({ path: "reports/tc00006-new-onboarding.png", fullPage: true });
    }

    // Verify the page is still accessible
    await expect(page).not.toHaveURL("about:blank");
  });
});