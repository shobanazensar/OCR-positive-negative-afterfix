# Folder Structure

## Project Layout

```
project-root/
├── tests/                    # Test files
│   └── *.spec.ts          # Test specifications
│
├── pages/                    # Page Object Models
│   └── BasePage.ts        # Base page class
│
├── utils/                    # Utility functions
│   ├── logger.ts          # Logging utility
│   ├── testContext.ts     # Test context manager
│   ├── reportHelper.ts    # Report generation
│   ├── dataHelper.ts      # Test data utilities
│   ├── webHelper.ts       # Web interaction methods
│   ├── elementHelper.ts   # Element utilities
│   └── waitHelper.ts      # Wait strategies
│
├── fixtures/                 # Test fixtures
│   └── testFixtures.ts    # Custom test fixtures
│
├── logs/                     # Test execution logs
│   └── *.log                 # Log files
│
├── reports/                  # Test reports
│   ├── screenshots/          # Failure screenshots
│   └── *.html                # HTML reports
│
├── docs/                     # Documentation
│   ├── FRAMEWORK_GUIDE.md    # This guide
│   ├── FOLDER_STRUCTURE.md   # Structure overview
│   ├── UTILS_REFERENCE.md    # Utils API reference
│   └── BEST_PRACTICES.md     # Best practices
│
├── playwright.config.ts   # Playwright configuration
├── package.json              # Dependencies
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
└── README.md                 # Project README
```

## Directory Descriptions

### `/tests`
Contains all test specification files. Each file should test a specific feature or user flow.

### `/pages`
Page Object Model classes. Each page of your application should have a corresponding class.

### `/utils`
Shared utility functions and helpers used across tests.

### `/fixtures`
Playwright fixtures for dependency injection and test setup.

### `/logs`
Execution logs with detailed information including browser, OS, timestamps, and errors.

### `/reports`
Generated test reports and screenshots from test runs.

### `/docs`
Framework documentation and guides.
