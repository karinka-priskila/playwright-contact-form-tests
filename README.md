# Playwright Contact Form Tests

## Overview

This project contains automated UI and API tests for the Contact Us form on https://automationintesting.online/.

The tests are written using **Playwright and TypeScript** and cover both successful form submission and validation errors when submitting an empty form.

### Test Scenarios

1. **Successful Contact Form Submission**
   - Navigate to the website.
   - Fill in all contact form fields with valid data.
   - Submit the form.
   - Verify the success message displayed on the page.
   - Verify the API response returns HTTP `200` with `{ "success": true }`.

2. **Empty Contact Form Submission**
   - Navigate to the website.
   - Submit the form without entering any data.
   - Verify the API response returns HTTP `400`.
   - Verify all expected validation errors are returned by the API.
   - Verify the validation messages are displayed on the page.

## Tech Stack

- **Playwright** – Browser automation and test execution.
- **TypeScript** – Test scripting language.
- **Node.js and npm** – Runtime and package management.
- **VS Code** – Development environment.

## Setup and Installation

### Prerequisites

Make sure the following tools are installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/USERNAME/playwright-contact-form-tests.git
cd playwright-contact-form-tests
```

Replace `USERNAME` with the actual GitHub username.

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

## Running the Tests

### Run All Tests

```bash
npx playwright test
```

### Run the Contact Form Test File

```bash
npx playwright test tests/contact-message.spec.ts
```

### Run Tests in Headed Mode

To watch the browser while the tests are running:

```bash
npx playwright test tests/contact-message.spec.ts --headed
```

### View the HTML Test Report

After test execution, run:

```bash
npx playwright show-report
```

## Framework Structure

The project follows a simple Playwright test structure to keep the tests easy to understand and maintain.

```text
playwright-contact-form-tests/
├── tests/
│   └── contact-message.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

- **`tests/contact-message.spec.ts`**: Contains the positive and negative contact form test scenarios, including UI and API assertions.
- **`playwright.config.ts`**: Contains the Playwright test configuration, such as browser settings and test execution options.
- **`package.json`**: Defines project dependencies and test-related scripts.
- **`package-lock.json`**: Locks dependency versions to support consistent installations.
- **`.gitignore`**: Excludes generated files, installed dependencies, and environment files from version control.
- **`README.md`**: Documents the project setup, execution instructions, framework structure, and future improvements.

## Framework Design Decisions

1. **Playwright Test Runner**

   The built-in Playwright Test Runner is used for test execution, assertions, and test fixtures. This keeps the framework lightweight without introducing unnecessary dependencies.

2. **Positive and Negative Testing**

   Both positive and negative scenarios are included to verify the expected behavior of the contact form with valid and missing input data.

3. **UI and API Validation**

   The tests validate both the user interface and the API response. This provides additional confidence that the form behaves correctly from the user's perspective and that the backend returns the expected result.

4. **Reusable URL Constants**

   The base URL and API endpoint are defined as constants to avoid repeating URLs throughout the test file and make future updates easier.

5. **Explicit Response Waiting**
   
   The tests wait for the relevant POST API response before asserting the status code and response body. This helps synchronize the test with the application's network activity.

6. **Order-Independent Validation Assertions**

   The negative test checks that all expected validation messages are present without relying on their response order. This makes the assertions less dependent on how the backend orders its validation errors.

7. **Readable Test Structure**

   The test cases use descriptive names and clear assertions so that the scenarios are easy to understand, review, and maintain.

## Potential Improvements

With additional time, I would improve the framework in the following areas:

1. **Test Data Management**  
   Move test data into reusable fixtures or dedicated data files to reduce duplication and simplify maintenance.

2. **Configuration Management**  
   Use Playwright configuration and environment variables for the base URL and other environment-specific settings.

3. **Additional Test Coverage**  
   Add tests for invalid email formats, minimum and maximum field lengths, invalid phone numbers, and boundary conditions.

4. **Reusable Helpers**  
   Extract common form interactions and API response validation into helper functions if the test suite grows.

5. **Cross-Browser Testing**  
   Run the tests across Chromium, Firefox, and WebKit to check browser compatibility.

6. **CI/CD Integration**  
   Integrate the tests into a CI/CD pipeline, such as GitHub Actions, so they can run automatically on every pull request or code change.

7. **Failure Diagnostics**  
   Configure screenshots, traces, and appropriate test reports to make test failures easier to investigate.
