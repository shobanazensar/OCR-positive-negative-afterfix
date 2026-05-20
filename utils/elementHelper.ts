import { Page, Locator } from '@playwright/test';

/**
 * Element Helper
 * Advanced element finding and manipulation utilities
 */
class ElementHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Find element by various strategies
   */
  findElement(strategy: "css" | "xpath" | "text" | "role" | "testId", value: string): Locator {
    switch (strategy) {
      case 'css':
        return this.page.locator(value);
      case 'xpath':
        return this.page.locator('xpath=' + value);
      case 'text':
        return this.page.getByText(value);
      case 'role':
        return this.page.getByRole(value as any);
      case 'testId':
        return this.page.getByTestId(value);
      default:
        return this.page.locator(value);
    }
  }

  /**
   * Find all matching elements
   */
  findElements(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Get element count
   */
  async getElementCount(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }

  /**
   * Get element by index
   */
  getElementByIndex(selector: string, index: number): Locator {
    return this.page.locator(selector).nth(index);
  }

  /**
   * Get first element
   */
  getFirstElement(selector: string): Locator {
    return this.page.locator(selector).first();
  }

  /**
   * Get last element
   */
  getLastElement(selector: string): Locator {
    return this.page.locator(selector).last();
  }

  /**
   * Get element attribute
   */
  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    return await this.page.locator(selector).getAttribute(attribute);
  }

  /**
   * Get all attributes of element
   */
  async getAllAttributes(selector: string) {
    return await this.page.locator(selector).evaluate(el => {
      const attrs: Record<string, string> = {};
      for (const attr of el.attributes) {
        attrs[attr.name] = attr.value;
      }
      return attrs;
    });
  }

  /**
   * Check if element has class
   */
  async hasClass(selector: string, className: string): Promise<boolean> {
    const classAttr = await this.getAttribute(selector, 'class');
    return classAttr ? classAttr.includes(className) : false;
  }

  /**
   * Get computed style
   */
  async getComputedStyle(selector: string, property: string) {
    return await this.page.locator(selector).evaluate((el, prop) => {
      return window.getComputedStyle(el).getPropertyValue(prop);
    }, property);
  }

  /**
   * Get element bounding box
   */
  async getBoundingBox(selector: string) {
    return await this.page.locator(selector).boundingBox();
  }

  /**
   * Filter elements by condition
   */
  filterElements(selector: string, filterFn: (locator: Locator) => Promise<boolean>): Locator {
    return this.page.locator(selector).filter({ has: this.page.locator('*') });
  }

  /**
   * Wait for element state
   */
  async waitForState(selector: string, state: "visible" | "hidden" | "attached" | "detached", timeout = 30000) {
    await this.page.locator(selector).waitFor({ state, timeout });
  }
}

export { ElementHelper };
