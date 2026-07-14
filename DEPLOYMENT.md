# Deployment & Infrastructure Guide

CopyCraft AI uses a decoupled cloud architecture.

## 1. Vercel (Frontend)
The Next.js frontend is deployed to Vercel's Edge Network.
- **Config**: The `vercel.json` file automatically enforces security headers (CSP, HSTS).
- **Environment Variables**:
  - `NEXT_PUBLIC_API_URL` (Points to Render)
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

## 2. Render (Backend)
The FastAPI backend is deployed as a Dockerized Web Service on Render.
- **Config**: The `render.yaml` Infrastructure-as-Code file manages the build command, linking it to `apps/api/Dockerfile`.
- **Scaling**: The Dockerfile uses `gunicorn` with Uvicorn workers (`--workers 4`) to handle concurrent streaming requests efficiently.

## 3. Neon PostgreSQL
Database hosting is provided by Neon Serverless.
- **Connection Pooling**: Neon provides a pooled connection string (essential for serverless frontend environments and horizontal backend scaling).
- **Security**: Connections require SSL mode (`sslmode=require`).

## 4. Docker (Local & VPS Deployment)
For on-premise or local deployments, the platform is fully containerized.
- `docker-compose.yml`: Spins up Next.js, FastAPI, and a local Postgres instance.
- `docker-compose.prod.yml`: Adds restart policies and log-rotation limits.

## 5. GitHub Actions (CI/CD)
The `.github/workflows/ci.yml` pipeline strictly validates code.
- **Actions**: Type checking, linting, Pytest, Vitest, Playwright.
- **Security**: Runs Trivy container scans and `npm audit`/`safety` checks.
- **Deployments**: We enforce manual deployment triggers to prevent bad code from reaching production.
