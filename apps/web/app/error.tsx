"use client"
import { useEffect } from "react"
import { AlertTriangle, RefreshCcw } from "lucide-react"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Analytics/Monitoring
    console.error("Route level error:", error)
  }, [error])

  return (
    <div className="h-[50vh] flex flex-col items-center justify-center p-8 bg-muted/10 rounded-xl border border-dashed m-4 md:m-8">
      <div className="bg-destructive/10 p-4 rounded-full mb-6">
        <AlertTriangle className="h-10 w-10 text-destructive" aria-hidden="true" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        We encountered an unexpected issue while rendering this workspace.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Retry loading this module"
      >
        <RefreshCcw className="h-4 w-4" /> Try again
      </button>
    </div>
  )
}
