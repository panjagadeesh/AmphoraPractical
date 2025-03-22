# Amphora Test Automation Framework

This project contains automated tests for both UI and API testing using Cypress with Cucumber (BDD) and Page Object Model (POM).

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Project Structure

```
cypress/
├── e2e/
│   ├── ui/
│   │   └── amphora.feature
│   └── api/
│       └── petstore.feature
├── support/
│   ├── pages/
│   │   ├── ui/
│   │   │   └── HomePage.js
│   │   └── api/
│   │       └── PetStoreAPI.js
│   ├── step_definitions/
│   │   ├── ui/
│   │   │   └── amphora.steps.js
│   │   └── api/
│   │       └── petstore.steps.js
│   ├── commands.js
│   └── e2e.js
└── videos/
    └── (test execution videos)
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running Tests

### UI Tests
```bash
npm run test:ui
```

### API Tests
```bash
npm run test:api
```

### Open Cypress Test Runner
```bash
npm run cypress:open
```

## Test Reports

After test execution, reports will be generated in the following locations:
- HTML Reports: `cypress/reports/html`
- Videos: `cypress/videos`
- Screenshots: `cypress/screenshots`

## Features

- Cucumber BDD framework integration
- Page Object Model implementation
- Separate UI and API test suites
- Automatic screenshot and video capture on test failure
- HTML report generation
- Custom commands for common operations
- Reusable page objects and step definitions

## Best Practices Implemented

1. Page Object Model for better maintainability
2. Cucumber BDD for better readability and collaboration
3. Separate concerns for UI and API testing
4. Reusable components and custom commands
5. Proper error handling and reporting
6. Clean and organized project structure
7. Latest version of all dependencies 