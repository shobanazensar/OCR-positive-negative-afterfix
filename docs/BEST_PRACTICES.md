# Best Practices

## Test Design

### 1. Keep Tests Independent
Each test should be able to run independently without relying on other tests.

```javascript
// Good - Self-contained test
test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'password');
  await page.click('#submit');
  await expect(page).toHaveURL('/dashboard');
});

// Bad - Depends on previous test state
test('user can logout', async ({ page }) => {
  // Assumes user is already logged in from previous test
  await page.click('#logout');
});
```

### 2. Use Meaningful Test Names
Test names should describe the scenario and expected outcome.

```javascript
// Good
test('should display error when login with invalid credentials', ...);

// Bad
test('test1', ...);
test('login test', ...);
```

### 3. Follow AAA Pattern
Arrange, Act, Assert - structure your tests clearly.

```javascript
test('example AAA pattern', async ({ page }) => {
  // Arrange - Setup test data and conditions
  const testUser = DataHelper.randomEmail();
  
  // Act - Perform the action
  await page.goto('/register');
  await page.fill('#email', testUser);
  await page.click('#submit');
  
  // Assert - Verify the outcome
  await expect(page.locator('.success')).toBeVisible();
});
```

## Selectors

### Prefer Stable Selectors
Use data attributes over CSS classes or text content.

```javascript
// Best - Data test ID
await page.click('[data-testid="submit-button"]');

// Good - Semantic role
await page.getByRole('button', { name: 'Submit' });

// Okay - CSS selector
await page.click('#submit-btn');

// Avoid - Fragile selectors
await page.click('.btn.btn-primary.mt-4');
await page.click('div > form > button:nth-child(2)');
```

## Waits

### Avoid Hard-Coded Waits
Use proper waiting mechanisms instead of waitForTimeout.

```javascript
// Good - Wait for specific condition
await page.waitForSelector('#result');
await expect(page.locator('#result')).toBeVisible();

// Good - Wait for network
await page.waitForLoadState('networkidle');

// Bad - Arbitrary wait
await page.waitForTimeout(5000);
```

## Error Handling

### Log Meaningful Errors
Provide context when errors occur.

```javascript
test('test with error handling', async ({ page, logger }) => {
  try {
    logger.step(1, 'Attempting to click element');
    await page.click('#element', { timeout: 5000 });
  } catch (error) {
    logger.error('Failed to click element', error);
    await page.screenshot({ path: 'error-screenshot.png' });
    throw error;
  }
});
```

## Page Objects

### Keep Page Objects Focused
Each page object should represent one page or component.

```javascript
// Good - Focused page object
class LoginPage {
  constructor(page) { this.page = page; }
  
  async login(email, password) {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('#submit');
  }
}

// Bad - Too many responsibilities
class AppPage {
  async login() { ... }
  async register() { ... }
  async checkout() { ... }
  async profile() { ... }
}
```

## Test Data

### Use Dynamic Test Data
Generate unique data to avoid conflicts.

```javascript
// Good - Unique data each run
const email = DataHelper.randomEmail();

// Bad - Static data may cause conflicts
const email = 'test@example.com';
```

## Reporting

### Add Context to Reports
Include relevant information for debugging.

```javascript
test('test with reporting', async ({ logger, reportHelper }) => {
  logger.setContext({ feature: 'checkout', priority: 'high' });
  
  logger.step(1, 'Add item to cart');
  // ... test steps
  
  reportHelper.addReportData('checkout-test', {
    items: 3,
    total: 99.99
  });
});
```
