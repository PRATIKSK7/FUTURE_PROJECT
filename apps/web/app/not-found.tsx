import Link from "next/link"
import { FileQuestion, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="bg-muted p-6 rounded-full inline-flex mb-4">
          <FileQuestion className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-black">404 - Page Not Found</h1>
        <p className="text-muted-foreground">
          The project, workspace, or module you are looking for does not exist or has been moved.
        </p>
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 mt-4 px-6 py-2 border font-medium rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Return to Dashboard"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
