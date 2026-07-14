import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

const ExplainabilityDashboard = dynamic(
  () => import("@/components/features/explainability/ExplainabilityDashboard").then(mod => ({ default: mod.ExplainabilityDashboard })),
  { 
    loading: () => (
      <div className="flex justify-center items-center h-64 w-full bg-muted/5 border border-dashed rounded-xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ) 
  }
)

export default function ExplainabilityPage() {
  return (
    <div className="grid gap-4 md:gap-8 max-w-[1400px] mx-auto w-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">System Explainability</h1>
        <p className="text-muted-foreground">Deep dive into the AI architecture and prompt engineering pipeline.</p>
      </div>
      <ExplainabilityDashboard />
    </div>
  )
}
