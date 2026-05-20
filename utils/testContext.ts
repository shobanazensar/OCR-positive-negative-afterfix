import { BrowserContext, Page } from '@playwright/test';

/**
 * Test Context Manager
 * Manages browser context, test data, and shared state across tests
 */
class TestContext {
  private static instance: TestContext;
  private data: Map<string, any> = new Map();
  public browser: string = "";
  public browserVersion: string = "";
  public platform: string = "";

  constructor() {
    
  }

  static getInstance(): TestContext {
    if (!TestContext.instance) {
      TestContext.instance = new TestContext();
    }
    return TestContext.instance;
  }

  /**
   * Set browser info from Playwright browser
   */
  async setBrowserInfo(browser: any) {
    const browserType = browser.browserType();
    this.browser = browserType.name();
    this.browserVersion = browser.version();
    this.platform = process.platform;
  }

  /**
   * Store data in context
   */
  set(key: string, value: any) {
    this.data.set(key, value);
  }

  /**
   * Retrieve data from context
   */
  get<T>(key: string): T | undefined {
    return this.data.get(key);
  }

  /**
   * Check if key exists
   */
  has(key: string): boolean {
    return this.data.has(key);
  }

  /**
   * Clear all stored data
   */
  clear() {
    this.data.clear();
  }

  /**
   * Get all stored data as object
   */
  toJSON() {
    const obj: Record<string, any> = {};
    this.data.forEach((value, key) => {
      obj[key] = value;
    });
    return {
      browser: this.browser,
      browserVersion: this.browserVersion,
      platform: this.platform,
      data: obj,
    };
  }
}


export { TestContext };
