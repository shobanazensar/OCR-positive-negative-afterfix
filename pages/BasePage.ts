export class BasePage {
  readonly page: import("@playwright/test").Page;

  constructor(page: import("@playwright/test").Page) {
    this.page = page;
  }

  async navigate(path = '/') {
    await this.page.goto(path);
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}
