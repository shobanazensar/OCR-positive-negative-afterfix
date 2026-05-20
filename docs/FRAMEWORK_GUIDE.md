# Framework Guide

## Overview

This test automation framework is built with **Playwright** using **TypeScript**.
It follows industry best practices for maintainable, scalable, and reliable test automation.

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run specific test file
npm test -- tests/your-test.spec.ts
```

## Key Features

### Web UI Testing
- **Page Object Model**: Organized page classes in `pages/` directory
- **Web Helper**: Reusable methods for common interactions
- **Wait Helper**: Smart waiting strategies
- **Element Helper**: Advanced element finding utilities

### Logging & Reporting
- **Detailed Logs**: Browser, OS, timestamp, step-by-step execution
- **Reports**: HTML
- **Screenshots**: Automatic capture on failures

### Test Data Management
- **Data Helper**: Random data generation
- **Fixtures**: Test data files support
- **Environment Config**: `.env` based configuration

## Configuration

### Environment Variables

Create a `.env` file (copy from `.env.example`):

```
BASE_URL=https://your-app.com
DEBUG=false
```

### Playwright Config

Key configuration options in `playwright.config.ts`:

- **Browsers**: Chromium, Firefox, WebKit
- **Retries**: Automatic retry on failure
- **Parallel**: Run tests in parallel
- **Reporters**: HTML

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '../fixtures/testFixtures';

test('example test', async ({ page, logger, webHelper }) => {
  logger.step(1, 'Navigate to homepage');
  await webHelper.navigateTo('https://example.com');
  
  logger.step(2, 'Verify page title');
  await expect(page).toHaveTitle(/Example/);
  
  logger.success('Test completed');
});
```

## Best Practices

1. **Use Page Objects** for UI interactions
2. **Use fixtures** for shared setup/teardown
3. **Log steps** for better debugging
4. **Keep tests independent** - no test should depend on another
5. **Use meaningful test names** that describe the scenario
6. **Handle dynamic waits** properly - avoid hardcoded sleeps

## Troubleshooting

### Common Issues

1. **Element not found**: Check selectors, add proper waits
2. **Timeout errors**: Increase timeout or check network
3. **Flaky tests**: Use proper wait conditions

### Getting Help

- Check the [Playwright Documentation](https://playwright.dev/docs/intro)
- Review logs in `./logs` directory
- Check screenshots in `./reports/screenshots`
