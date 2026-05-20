# Utils Reference

## Logger

Enhanced logging with browser, OS, and error details.

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `initTestLog(testName)` | Initialize log file for test | testName: string |
| `setContext(context)` | Set execution context | context: { browser?, os?, testName? } |
| `info(message, data?)` | Log info message | message: string, data?: any |
| `warn(message, data?)` | Log warning | message: string, data?: any |
| `error(message, error?)` | Log error with stack | message: string, error?: Error |
| `debug(message, data?)` | Debug log (when DEBUG=true) | message: string, data?: any |
| `success(message, data?)` | Log success | message: string, data?: any |
| `step(num, description)` | Log test step | num: number, description: string |
| `endTest(status, duration)` | Finalize test log | status: string, duration: number |

---

## DataHelper

Test data generation and management.

### Static Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `randomString(length)` | Random alphanumeric | string |
| `randomEmail(domain?)` | Random email address | string |
| `randomNumber(min, max)` | Random integer | number |
| `randomPhone()` | Random phone number | string |
| `randomDate(start?, end?)` | Random date | Date |
| `uuid()` | Generate UUID v4 | string |
| `loadJson(path)` | Load JSON file | object |
| `loadCsv(path)` | Load CSV as array | object[] |
| `clone(obj)` | Deep clone object | object |
| `timestamp()` | Current ISO timestamp | string |

---

## WebHelper

Common web interaction methods.

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `navigateTo(url, waitForLoad?)` | Navigate to URL | url: string |
| `click(selector, options?)` | Click element | selector: string |
| `type(selector, text, clear?)` | Type into input | selector, text: string |
| `selectOption(selector, option)` | Select dropdown | selector, option: string |
| `setCheckbox(selector, checked)` | Check/uncheck | selector: string, checked: bool |
| `getText(selector)` | Get text content | selector: string |
| `getValue(selector)` | Get input value | selector: string |
| `isVisible(selector)` | Check visibility | selector: string |
| `isEnabled(selector)` | Check if enabled | selector: string |
| `hover(selector)` | Hover element | selector: string |
| `uploadFile(selector, path)` | Upload file | selector, path: string |
| `screenshot(name)` | Take screenshot | name: string |
| `refresh()` | Refresh page | - |

---

## WaitHelper

Wait strategies and conditions.

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `waitForVisible(selector, timeout?)` | Wait visible | selector: string |
| `waitForHidden(selector, timeout?)` | Wait hidden | selector: string |
| `waitForEnabled(selector, timeout?)` | Wait enabled | selector: string |
| `waitForText(selector, text)` | Wait for text | selector, text: string |
| `waitForUrl(pattern, timeout?)` | Wait URL match | pattern: string/RegExp |
| `waitForNetworkIdle(timeout?)` | Wait network idle | timeout?: number |
| `waitForRequest(pattern)` | Wait for request | pattern: string/RegExp |
| `waitForResponse(pattern)` | Wait for response | pattern: string/RegExp |
| `delay(ms)` | Simple delay | ms: number |

