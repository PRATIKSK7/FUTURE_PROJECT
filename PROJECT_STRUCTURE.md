# Project Structure

CopyCraft AI is structured as a monorepo containing both the Next.js frontend and the FastAPI backend.

```text
copycraft-ai/
├── apps/
│   ├── web/                    # Next.js Frontend
│   │   ├── app/                # App Router (Pages & Layouts)
│   │   │   ├── (auth)/         # Clerk Sign-in/Sign-up routes
│   │   │   └── (dashboard)/    # Protected workspace routes
│   │   ├── components/
│   │   │   ├── ui/             # Generic Shadcn UI components
│   │   │   └── features/       # Domain-specific components (e.g., Business Wizard)
│   │   ├── lib/                # Zustand stores and API fetchers
│   │   └── tests/              # Vitest React Testing Library suites
│   │
│   └── api/                    # FastAPI Backend
│       ├── core/               # Middleware, dependencies, JWT decoding
│       ├── database/           # SQLAlchemy models and Neon connection setup
│       ├── routers/            # FastAPI HTTP endpoints
│       ├── services/           # Business logic (Prompt Engine, LLM integration)
│       └── tests/              # Pytest suites
│
├── tests/
│   └── e2e/                    # Playwright end-to-end automation scripts
│
├── .github/
│   └── workflows/              # GitHub Actions CI/CD pipelines
│
├── docker-compose.yml          # Local development orchestration
├── docker-compose.prod.yml     # Production VPS overrides
├── render.yaml                 # Render backend IaC deployment config
└── vercel.json                 # Vercel frontend security configuration
```

## Key Directories
- **`components/features/`**: Contains the complex domain logic (The Business Profile Wizard, the Explainability Dashboard, and the AI Workspace Editor).
- **`services/ai/`**: Contains the `PromptBuilder` and the `GeminiProvider` responsible for talking to Google's LLM API.
- **`database/models.py`**: The single source of truth for the PostgreSQL schema.
