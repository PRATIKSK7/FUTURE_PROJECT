# Database Architecture

The application relies on a PostgreSQL database managed by Prisma ORM.

## Schema Design
The schema is designed to be relational and scalable.

### 1. Project
Represents a business profile.
- `id` (UUID, Primary Key)
- `userId` (String, mapped to Clerk)
- `name` (String)
- `industry` (String)
- `target_audience` (Text)
- `value_proposition` (Text)
- `brand_voice` (Text)
- `createdAt` & `updatedAt`

### 2. GeneratedContent
Represents a saved draft of generated copy.
- `id` (UUID, Primary Key)
- `projectId` (UUID, Foreign Key)
- `module_name` (String, e.g., "SEO Blog Post")
- `content` (Text, the markdown string)
- `metrics` (JSON, optional SEO/readability scores)
- `createdAt`

## Prisma Client
- The Prisma client is instantiated as a singleton (`lib/db.ts`) to prevent connection exhaustion during Next.js hot reloads in development mode.
- Server Actions (`actions/projects.ts`) handle all CRUD operations securely on the backend.
