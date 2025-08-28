# Lead Consult UI Automation

Automated UI tests for Lead Consult’s website using Playwright and TypeScript.

## Architecture

- **Page Object Model (POM):**
  - All page interactions are encapsulated in dedicated classes.
  - This structure improves maintainability and scalability.

## Installation

1. Clone the repository:
   git clone https://github.com/stoychoenchev/leadConsultTask.git
   cd leadConsultTask

2. Install dependencies:
   npm install

3. Install Playwright browsers:

npx playwright install

## Execution

- Run all tests:
  npx playwright test

  Run a specific test file:
  npx playwright test tests/{{testname}}.spec.ts

## Reporting

- After test execution, Playwright generates a report in the `playwright-report` directory.
- To view the report:

  npx playwright show-report

- In CI, failed test results are uploaded as artifacts for review.

## Continuous Integration (CI)

- GitHub Actions workflow runs tests on every push and pull request to `main`.
- See `.github/workflows/playwright.yml` for details.

## Future Improvements

- Add more test coverage for edge cases and mobile responsiveness.
- Integrate advanced reporting (e.g., Allure).
- Parameterize test data for broader scenarios.
- Enhance CI with parallel test execution and notifications.
- Refactor page objects for even greater reusability.
