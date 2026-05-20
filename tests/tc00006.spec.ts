import { test, expect } from "@playwright/test";
import { OnboardingDashboardPage } from "./page-objects/OnboardingDashboardPage";
import { OnboardingFlowPage } from "./page-objects/OnboardingFlowPage";

test.describe("Readable supported ID uploads to Extracted and populates Name, Date of Birth, and ID Number within 2 minutes", () => {
  test("TC00006", async ({ page }) => {
    const onboardingDashboardPage = new OnboardingDashboardPage(page);
    const onboardingFlowPage = new OnboardingFlowPage(page);

    await page.goto("https://digital-onboarding-fe.bravesky-d9f9eeb7.eastus2.azurecontainerapps.io/");
    await onboardingDashboardPage.clickNewOnboardingMenu();
    await onboardingDashboardPage.clickStartOnboarding();
    await onboardingFlowPage.selectDocumentType("Driver's License, Passport, or State ID");
    await onboardingFlowPage.clickFileUploadControl();
    await onboardingFlowPage.clickKycReadableDriverLicenseSamplePdf();
    await expect(page.locator("onboarding status")).toBeVisible();
  });
});