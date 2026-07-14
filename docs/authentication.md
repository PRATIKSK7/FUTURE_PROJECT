# Authentication & User Management

Security and user management are handled seamlessly via Clerk.

## Setup
- Clerk is integrated into the Next.js App Router using the `@clerk/nextjs` package.
- The `ClerkProvider` wraps the entire application in the Root Layout.

## Features
- **Middleware Protection:** The `middleware.ts` file is configured to protect all dashboard routes (`/dashboard`, `/projects`, `/generation`, etc.). Unauthorized users are automatically redirected to the sign-in page.
- **User Metadata:** Clerk synchronizes user identities. The `userId` is extracted on the server-side to associate Projects and Saved Drafts uniquely with the authenticated user.
- **Custom UI:** The Clerk components (`UserButton`, `SignIn`, `SignUp`) have been styled using the `appearance` prop to perfectly match the dark theme and glassmorphic aesthetic of the platform.
