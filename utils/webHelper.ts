import { Page, Locator, expect } from '@playwright/test';

/**
 * Web Helper
 * Reusable methods for common web interactions
 */
class WebHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to URL with wait
   */
  async navigateTo(url: string, waitForLoad = true) {
    await this.page.goto(url);
    if (waitForLoad) {
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Click element with auto-wait
   */
  async click(selector: string, options?: { force?: boolean; timeout?: number } = {}) {
    const element = this.page.locator(selector);
    await element.click(options);
  }

  /**
   * Type text into input with optional clear
   */
  async type(selector: string, text: string, clearFirst = true) {
    const element = this.page.locator(selector);
    if (clearFirst) {
      await element.clear();
    }
    await element.fill(text);
  }

  /**
   * Select dropdown option by value, label, or index
   */
  async selectOption(selector: string, option: string | { value?: string; label?: string; index?: number }) {
    const element = this.page.locator(selector);
    if (typeof option === 'string') {
      await element.selectOption(option);
    } else {
      await element.selectOption(option);
    }
  }

  /**
   * Check/uncheck checkbox
   */
  async setCheckbox(selector: string, checked: boolean) {
    const element = this.page.locator(selector);
    if (checked) {
      await element.check();
    } else {
      await element.uncheck();
    }
  }

  /**
   * Get text content of element
   */
  async getText(selector: string): Promise<string> {
    const element = this.page.locator(selector);
    return await element.textContent() || '';
  }

  /**
   * Get input value
   */
  async getValue(selector: string): Promise<string> {
    const element = this.page.locator(selector);
    return await element.inputValue();
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    const element = this.page.locator(selector);
    return await element.isVisible();
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(selector: string): Promise<boolean> {
    const element = this.page.locator(selector);
    return await element.isEnabled();
  }

  /**
   * Hover over element
   */
  async hover(selector: string) {
    const element = this.page.locator(selector);
    await element.hover();
  }

  /**
   * Double click element
   */
  async doubleClick(selector: string) {
    const element = this.page.locator(selector);
    await element.dblclick();
  }

  /**
   * Right click element
   */
  async rightClick(selector: string) {
    const element = this.page.locator(selector);
    await element.click({ button: 'right' });
  }

  /**
   * Press keyboard key
   */
  async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }

  /**
   * Upload file
   */
  async uploadFile(selector: string, filePath: string) {
    const element = this.page.locator(selector);
    await element.setInputFiles(filePath);
  }

  /**
   * Accept alert/dialog
   */
  async acceptDialog() {
    this.page.on('dialog', dialog => dialog.accept());
  }

  /**
   * Dismiss alert/dialog
   */
  async dismissDialog() {
    this.page.on('dialog', dialog => dialog.dismiss());
  }

  /**
   * Switch to iframe
   */
  async switchToFrame(selector: string) {
    const frame = this.page.frameLocator(selector);
    return frame;
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(selector: string) {
    const element = this.page.locator(selector);
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Take screenshot
   */
  async screenshot(name: string) {
    await this.page.screenshot({ path: './reports/screenshots/' + name + '.png', fullPage: true });
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Refresh page
   */
  async refresh() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Go back
   */
  async goBack() {
    await this.page.goBack();
  }

  /**
   * Go forward
   */
  async goForward() {
    await this.page.goForward();
  }
}

export { WebHelper };
