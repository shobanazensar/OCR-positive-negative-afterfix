import { test as base } from '@playwright/test';
import { Logger } from '../utils/logger';
import { TestContext } from '../utils/testContext';
import { ReportHelper } from '../utils/reportHelper';
import { WebHelper } from '../utils/webHelper';
import { WaitHelper } from '../utils/waitHelper';



// Define custom fixtures type
type CustomFixtures = {
  logger: Logger;
  testContext: TestContext;
  reportHelper: ReportHelper;
  webHelper: WebHelper;
  waitHelper: WaitHelper;
};


/**
 * Extended test with custom fixtures
 */
export const test = base.extend<CustomFixtures>({
  // Logger fixture
  logger: async ({}, use, testInfo) => {
    const logger = new Logger('./logs');
    logger.initTestLog(testInfo.title);
    await use(logger);
    logger.endTest(testInfo.status as any || 'unknown', testInfo.duration);
  },

  // Test context fixture
  testContext: async ({ browser }, use) => {
    const context = TestContext.getInstance();
    await context.setBrowserInfo(browser);
    await use(context);
    context.clear();
  },

  // Report helper fixture
  reportHelper: async ({}, use) => {
    const helper = new ReportHelper('./reports');
    await use(helper);
  },

  // Web helper fixture
  webHelper: async ({ page }, use) => {
    const helper = new WebHelper(page);
    await use(helper);
  },

  // Wait helper fixture
  waitHelper: async ({ page }, use) => {
    const helper = new WaitHelper(page);
    await use(helper);
  },
});

export { expect } from '@playwright/test';
