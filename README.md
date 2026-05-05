## Betsson2 – API Testing with Playwright

This project contains automated API tests built with Playwright to validate endpoints from the Swagger Petstore API. It demonstrates how to structure, execute, and validate REST API requests using modern testing practices.

# Overview

The purpose of this repository is to:

- Validate REST API endpoints using Playwright
- Demonstrate CRUD operations testing
- Cover both **positive** and **negative** scenarios
- Provide a clean and scalable structure for API automation

- The current implementation focuses on updating a pet and verifying the result via API calls.

# Technology used

- Framework: Playwright
- Language: JavaScript / TypeScript
- API Under Test: Swagger Petstore API
- Assertions: Playwright Test Runner (expect)


# Project Structure

Betsson2/
│
├── tests/ # API test files
├── playwright.config.js # Playwright configuration
├── package.json # Project dependencies
├── test-results.json # Test execution results
├── README.md # Project documentation
└── DETAILS.md # Individual Test Results

# Run Tests
- Running all tests async in one row will cause that the API flow will not follow the ADD - GET - UPDATE hapy path and may cause errors.
- In this case I recommend to run the tests individially and following an order:

1. npx playwright test tests/POST_add_pet.spec.js
2. npx playwright test tests/GET_pet_byID.spec.js.
3. npx playwright test tests/PUT_Update_byID.spec.js.
4. npx playwright test tests/e2ePets.spec.js.


# Setup & Installation

. Clone the repository

```bash
git clone <your-repo-url>
cd Betsson2

. Install dependencies
npm install

. Install Playwright (if needed)
npx playwright install



