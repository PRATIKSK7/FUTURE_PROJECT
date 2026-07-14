import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock Clerk Auth
vi.mock('@clerk/nextjs', () => ({
  useAuth: () => ({
    isLoaded: true,
    isSignedIn: true,
    userId: "test_user_1",
    getToken: vi.fn(() => Promise.resolve('mock-jwt-token'))
  }),
  useUser: () => ({
    user: { id: "test_user_1", fullName: "Test User" }
  }),
  ClerkProvider: ({ children }: any) => children
}))

// IntersectionObserver mock for framer-motion/UI libraries
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any
