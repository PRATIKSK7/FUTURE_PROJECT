# Security Architecture

CopyCraft AI processes sensitive enterprise business data and manages expensive LLM API credits. Security is paramount.

## 1. Authentication (Clerk)
We utilize Clerk for identity management.
- **Tokens**: Clerk issues short-lived JWTs to the client.
- **Validation**: The FastAPI backend extracts the Bearer token and cryptographically verifies the signature against Clerk's public JWKS endpoint (`PyJWKClient`). No session state is held on our backend.

## 2. Authorization (Workspace Isolation)
Data is segregated using a Multi-Tenant architecture via PostgreSQL Row-Level Security patterns.
- **The Rule**: Every database query requires a valid `workspace_id`.
- **The Check**: The `require_workspace_access` FastAPI dependency queries the `WorkspaceMember` table to verify the authenticated user has explicit permission (Owner, Editor, Viewer) to access the requested `workspace_id`. If not, a `403 Forbidden` is returned.

## 3. Infrastructure Security
- **HTTP Headers**: Vercel injects `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Strict-Transport-Security` via `vercel.json` to prevent clickjacking and XSS.
- **CORS**: FastAPI strictly enforces `CORS_ORIGINS` to accept traffic only from our verified production domains.
- **Exception Masking**: A global exception handler prevents internal Python stack traces or SQLAlchemy errors from leaking to the client during a 500 error.

## 4. Supply Chain Security (CI/CD)
The `.github/workflows/ci.yml` file enforces security checks on every pull request:
- **Trivy**: Scans compiled Docker images for OS-level vulnerabilities.
- **npm audit & safety**: Scans Node and Python dependencies for known CVEs.
