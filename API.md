# CopyCraft AI REST API

The FastAPI backend exposes the following REST endpoints. All endpoints require a valid Clerk JWT Bearer token.

---

## Authentication & Headers
- **Authorization**: `Bearer <clerk-jwt>`
- **X-Workspace-ID**: `<workspace-uuid>` (Required for all project/generation routes)

---

## 1. Projects API

### `GET /api/v1/projects`
Retrieves all projects belonging to the active workspace.
- **Response (200)**: `[ { "id": "uuid", "name": "string", "created_at": "datetime" } ]`
- **Error (403)**: `User lacks access to this workspace`

### `POST /api/v1/projects`
Creates a new project.
- **Request Body**: `{"name": "Blue Ribbon Project", "description": "Travel site"}`
- **Response (201)**: `Project Object`

---

## 2. Generation API

### `POST /api/v1/generate`
Initiates the AI generation sequence using the Prompt Builder.
- **Request Body**: 
  ```json
  {
    "businessContext": { ... },
    "module": "landing_page"
  }
  ```
- **Response (200)**: Returns a `text/event-stream` (Server-Sent Events) streaming the Gemini response chunks.
- **Error (400)**: `Prompt Validation Failed: Token limit exceeded.`

---

## 3. System API

### `GET /api/v1/health`
Kubernetes/Render health check endpoint.
- **Auth**: None required.
- **Response (200)**: `{"status": "healthy", "database": "connected"}`
