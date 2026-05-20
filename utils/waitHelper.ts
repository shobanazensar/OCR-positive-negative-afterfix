import { Page } from '@playwright/test';

/**
 * Wait Helper
 * Various wait strategies and conditions
 */
class WaitHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for element to be visible
   */
  async waitForVisible(selector: string, timeout = 30000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForHidden(selector: string, timeout = 30000) {
    await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for element to be enabled
   */
  async waitForEnabled(selector: string, timeout = 30000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
    await this.page.waitForFunction(
      (sel) => {
        const el = document.querySelector(sel);
        return el && !el.hasAttribute('disabled');
      },
      selector,
      { timeout }
    );
  }

  /**
   * Wait for text to be present
   */
  async waitForText(selector: string, text: string, timeout = 30000) {
    await this.page.locator(selector).filter({ hasText: text }).waitFor({ timeout });
  }

  /**
   * Wait for URL to match
   */
  async waitForUrl(urlPattern: string | RegExp, timeout = 30000) {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Wait for network idle
   */
  async waitForNetworkIdle(timeout = 30000) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for DOM content loaded
   */
  async waitForDomContentLoaded(timeout = 30000) {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
  }

  /**
   * Wait for specific network request
   */
  async waitForRequest(urlPattern: string | RegExp, timeout = 30000) {
    return await this.page.waitForRequest(urlPattern, { timeout });
  }

  /**
   * Wait for specific network response
   */
  async waitForResponse(urlPattern: string | RegExp, timeout = 30000) {
    return await this.page.waitForResponse(urlPattern, { timeout });
  }

  /**
   * Wait for download
   */
  async waitForDownload(timeout = 30000) {
    return await this.page.waitForEvent('download', { timeout });
  }

  /**
   * Wait for popup/new window
   */
  async waitForPopup(timeout = 30000) {
    return await this.page.waitForEvent('popup', { timeout });
  }

  /**
   * Wait for custom condition
   */
  async waitForCondition(conditionFn: () => Promise<boolean>, timeout = 30000, pollInterval = 100) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await conditionFn()) {
        return true;
      }
      await this.page.waitForTimeout(pollInterval);
    }
    throw new Error('Condition not met within ' + timeout + 'ms');
  }

  /**
   * Simple delay
   */
  async delay(ms: number) {
    await this.page.waitForTimeout(ms);
  }
}

export { WaitHelper };
