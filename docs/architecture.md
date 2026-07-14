# System Architecture

CopyCraft AI is built on a modern, robust, and scalable tech stack designed for high performance and seamless developer experience.

## Overview
The application follows a traditional monorepo architecture leveraging Turborepo for workspace management, separating the frontend and backend logically while keeping them within the same repository for ease of deployment.

## Tech Stack
### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Framer Motion (for animations)
- **UI Components:** Shadcn UI, Radix UI, React Resizable Panels
- **State Management:** Zustand, React Query (TanStack)

### Backend
- **Framework:** Next.js Server Actions & API Routes (Node.js)
- **ORM:** Prisma
- **Database:** PostgreSQL (Neon / Supabase compatible)
- **AI Provider:** Google Gemini API

### Infrastructure & DevOps
- **Authentication:** Clerk
- **Monorepo Management:** Turborepo
- **Package Manager:** pnpm

## Key Design Patterns
1. **Glassmorphism & Dark Theme First:** The UI leverages CSS variables and backdrop filters to create a premium SaaS aesthetic.
2. **Contextual AI Engine:** Business data is aggregated and normalized into a single context string before being passed to the Gemini LLM.
3. **Streaming Responses:** The AI generation utilizes streaming to provide immediate visual feedback to the user via a live-typing interface in the Document Editor.
4. **Optimistic Updates:** Draft saves and UI state toggles happen optimistically using React Query cache mutations.
