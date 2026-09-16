# Playwright Practice: Hands-on Playwright...

🚀 100 Playwright Automation Practice Test Cases Roadmap

Recommended practice stack:
TodoMVC → SauceDemo → The Internet → DemoQA → UI Testing Playground → Automation Exercise → OrangeHRM → ParaBank

### 🟢 Level 1 — Playwright Fundamentals

Cases 1–15 | Beginner

|  # | Practice Test Case                       | Main Playwright Skill          |
| -: | ---------------------------------------- | ------------------------------ |
|  1 | Open application and verify page title   | `page.goto()`, `toHaveTitle()` |
|  2 | Verify URL after navigation              | `toHaveURL()`                  |
|  3 | Verify page heading                      | `getByRole()`                  |
|  4 | Verify visible buttons                   | Locators                       |
|  5 | Click a button and verify result         | `click()`                      |
|  6 | Enter text into an input                 | `fill()`                       |
|  7 | Clear an input field                     | `fill("")`                     |
|  8 | Verify input value                       | `toHaveValue()`                |
|  9 | Select an option from dropdown           | `selectOption()`               |
| 10 | Verify checkbox state                    | `toBeChecked()`                |
| 11 | Check and uncheck checkbox               | Checkbox interaction           |
| 12 | Verify radio-button selection            | Radio buttons                  |
| 13 | Submit a basic form                      | Form interaction               |
| 14 | Verify success/error message             | Text assertions                |
| 15 | Verify multiple elements using a locator | Locator assertions             |

Recommended site: TodoMVC + SauceDemo

### 🟢 Level 2 — Authentication & User Flows

Cases 16–30

|  # | Practice Test Case                          | Main Skill             |
| -: | ------------------------------------------- | ---------------------- |
| 16 | Login with valid credentials                | Login automation       |
| 17 | Login with invalid username                 | Negative testing       |
| 18 | Login with invalid password                 | Negative testing       |
| 19 | Login with blank username                   | Validation             |
| 20 | Login with blank password                   | Validation             |
| 21 | Login with both fields blank                | Validation             |
| 22 | Verify password masking                     | UI validation          |
| 23 | Verify logout                               | Session handling       |
| 24 | Verify protected page after logout          | Authentication         |
| 25 | Verify browser back after logout            | Session security       |
| 26 | Login and save authentication state         | `storageState()`       |
| 27 | Reuse authenticated state                   | Authentication reuse   |
| 28 | Verify session persistence after refresh    | Session                |
| 29 | Verify unauthorized access                  | Security-oriented test |
| 30 | Verify login across Chromium/Firefox/WebKit | Cross-browser          |

Recommended site: SauceDemo / OrangeHRM

### 🟡 Level 3 — E-Commerce Automation

Cases 31–45

Use SauceDemo or Automation Exercise.
|  # | Practice Test Case            | Main Skill            |
| -: | ----------------------------- | --------------------- |
| 31 | Verify product list           | Collection locators   |
| 32 | Verify product names          | Text assertions       |
| 33 | Verify product prices         | Data extraction       |
| 34 | Add one product to cart       | E2E flow              |
| 35 | Add multiple products         | Loops                 |
| 36 | Remove product from cart      | State validation      |
| 37 | Verify cart item count        | Assertions            |
| 38 | Verify product details        | Navigation            |
| 39 | Sort products by price        | Dropdown + validation |
| 40 | Sort products by name         | Sorting               |
| 41 | Verify lowest-priced product  | Data handling         |
| 42 | Verify highest-priced product | Data handling         |
| 43 | Continue shopping from cart   | Navigation            |
| 44 | Complete checkout             | Multi-step workflow   |
| 45 | Verify order completion       | End-to-end assertion  |


### 🟡 Level 4 — Forms & Validation

Cases 46–60

Recommended: DemoQA / LetCode

|  # | Practice Test Case        | Main Skill           |
| -: | ------------------------- | -------------------- |
| 46 | Submit valid form         | Form automation      |
| 47 | Submit empty form         | Negative testing     |
| 48 | Required-field validation | Assertions           |
| 49 | Minimum-length validation | Boundary testing     |
| 50 | Maximum-length validation | Boundary testing     |
| 51 | Special-character input   | Test data            |
| 52 | Numeric input validation  | Data validation      |
| 53 | Invalid email format      | Negative testing     |
| 54 | Valid email format        | Positive testing     |
| 55 | Dropdown selection        | Dropdown             |
| 56 | Multi-select              | Advanced interaction |
| 57 | Checkbox combinations     | State validation     |
| 58 | Radio-button combinations | State validation     |
| 59 | Form reset                | State handling       |
| 60 | Verify submitted data     | Data extraction      |


### 🟠 Level 5 — Advanced UI Interactions

Cases 61–75

This is where The Internet + DemoQA become extremely useful.

|  # | Practice Test Case                   | Main Skill            |
| -: | ------------------------------------ | --------------------- |
| 61 | Handle JavaScript alert              | `dialog`              |
| 62 | Handle confirmation dialog           | Dialog handling       |
| 63 | Handle prompt dialog                 | Dialog handling       |
| 64 | Upload a file                        | `setInputFiles()`     |
| 65 | Download a file                      | Download API          |
| 66 | Verify downloaded filename           | File validation       |
| 67 | Interact with iframe                 | `frameLocator()`      |
| 68 | Open new browser tab                 | Multiple pages        |
| 69 | Switch between tabs                  | Page management       |
| 70 | Handle popup window                  | `page.waitForEvent()` |
| 71 | Drag and drop                        | `dragTo()`            |
| 72 | Hover over element                   | `hover()`             |
| 73 | Right-click element                  | Mouse interaction     |
| 74 | Keyboard shortcuts                   | Keyboard API          |
| 75 | Scroll to dynamically loaded content | Scrolling             |


### 🔴 Level 6 — Difficult/Dynamic UI Automation

Cases 76–85

Recommended: UI Testing Playground

|  # | Practice Test Case                     | Main Skill       |
| -: | -------------------------------------- | ---------------- |
| 76 | Automate dynamic IDs                   | Robust locators  |
| 77 | Handle dynamically changing elements   | Locator strategy |
| 78 | Test delayed button                    | Auto-waiting     |
| 79 | Test AJAX request result               | Async behavior   |
| 80 | Handle dynamically loaded content      | Synchronization  |
| 81 | Test hidden element                    | Visibility       |
| 82 | Test element becoming enabled          | State waiting    |
| 83 | Handle unstable UI timing              | Auto-waiting     |
| 84 | Verify dynamically generated text      | Assertions       |
| 85 | Build locator without XPath dependency | Locator design   |


### 🔴 Level 7 — API + UI Testing

Cases 86–90

This is an important step toward Senior SQA Engineer-level automation.

|  # | Practice Test Case                          | Main Skill       |
| -: | ------------------------------------------- | ---------------- |
| 86 | Create test data through API                | `request`        |
| 87 | Use API-created data in UI                  | API + UI         |
| 88 | Validate UI data against API response       | Data consistency |
| 89 | Mock API response                           | `page.route()`   |
| 90 | Simulate API failure and verify UI behavior | Network mocking  |

Example concept:

<img width="167" height="156" alt="image" src="https://github.com/user-attachments/assets/8a58cdf4-ef1b-494a-b68d-33727ca80d75" />

This is much closer to real-world automation than simply clicking buttons.

### 🟣 Level 8 — Professional Playwright Framework
Cases 91–100

These final 10 aren't just individual UI tests. They're framework-level challenges.

|   # | Practice Test Case                         | Main Skill          |
| --: | ------------------------------------------ | ------------------- |
|  91 | Create Page Object Model                   | POM                 |
|  92 | Create reusable test fixtures              | Fixtures            |
|  93 | Create reusable authentication fixture     | Fixtures + auth     |
|  94 | Parameterize tests with multiple users     | Data-driven testing |
|  95 | Run tests in parallel                      | Parallel execution  |
|  96 | Configure retries for CI                   | `retries`           |
|  97 | Generate HTML test report                  | Reporting           |
|  98 | Capture screenshot on failure              | Debugging           |
|  99 | Analyze failed test using Trace Viewer     | Trace               |
| 100 | Execute complete regression suite in CI/CD | GitHub Actions      |


### 🧠 The 100-Case Learning Progression
Think of the roadmap like this:

<img width="288" height="411" alt="image" src="https://github.com/user-attachments/assets/1aa88423-5d59-4000-b84f-6697821ab2b4" />

## 🏆 100 Cases → Skill Matrix

| Skill          |        Cases |
| -------------- | -----------: |
| Locators       |  1–15, 76–85 |
| Assertions     |         1–30 |
| Forms          | 16–30, 46–60 |
| Authentication |    16–30, 93 |
| E2E            |        31–45 |
| Test Data      |    46–60, 94 |
| File Handling  |        64–66 |
| Frames         |           67 |
| Multiple Tabs  |        68–70 |
| Mouse/Keyboard |        71–75 |
| Dynamic UI     |        76–85 |
| API Testing    |        86–90 |
| API + UI       |        87–90 |
| Mocking        |        89–90 |
| POM            |           91 |
| Fixtures       |        92–93 |
| Data-driven    |           94 |
| Parallelism    |           95 |
| CI/CD          |      96, 100 |
| Reporting      |           97 |
| Debugging      |        98–99 |
