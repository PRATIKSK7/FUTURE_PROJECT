# CopyCraft AI Testing Infrastructure

We maintain strict coverage thresholds across the platform to ensure enterprise reliability.

## 1. Backend Testing (Pytest)
- **Framework**: `pytest`
- **Location**: `apps/api/tests/`
- **Execution**: `pytest apps/api/tests/ --cov=apps/api`
- **Architecture**: We use in-memory SQLite (`sqlite:///:memory:`) combined with deterministic data seeding in `conftest.py` to test the API securely without corrupting local or production databases.

## 2. Frontend Testing (Vitest & RTL)
- **Framework**: `vitest` + React Testing Library
- **Location**: `apps/web/tests/`
- **Execution**: `npm run test:coverage`
- **Mocks**: The `@clerk/nextjs` auth layer and `next/navigation` hooks are globally mocked in `setup.ts` to allow isolated unit testing of complex UI components (like the Business Wizard).

## 3. End-to-End Testing (Playwright)
- **Framework**: `playwright`
- **Location**: `tests/e2e/`
- **Execution**: `npx playwright test`
- **Scope**: Automates full user flows (Login -> Wizard -> Workspace Generation) against Chromium browsers. Clerk testing tokens are utilized in CI environments to bypass bot protection.

## 4. AI Prompt Testing
- **Location**: `apps/api/tests/test_ai_engine.py`
- **Strategy**: We do *not* hit the live Gemini API during automated tests to conserve credits and ensure determinism. Instead, we mock the `GeminiProvider.generate_stream()` method. Tests mathematically validate the prompt context injection and token constraints before the LLM mock is called.

## Coverage Targets
| Domain | Target | Status |
| :--- | :---: | :--- |
| **Backend** | ≥90% | Enforced in CI |
| **Frontend** | ≥85% | Enforced in CI |
| **Prompt Engine** | ≥95% | Passing |
| **Critical E2E**| 100% | Passing |
