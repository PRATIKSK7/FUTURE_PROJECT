"use client"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to an error reporting service like Sentry in production
    console.error("Critical Global Error:", error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
          <div className="w-full max-w-md space-y-6 text-center">
            <h1 className="text-4xl font-black text-destructive">500</h1>
            <h2 className="text-2xl font-bold">Fatal System Error</h2>
            <p className="text-muted-foreground">
              A critical failure occurred in the CopyCraft AI engine. Our engineering team has been notified.
            </p>
            <button
              onClick={() => reset()}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Try to recover from the error"
            >
              Try to recover
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
