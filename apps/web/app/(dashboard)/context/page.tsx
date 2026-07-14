import { ContextPreviewDashboard } from "@/components/features/context-engine/ContextPreviewDashboard"

export default function ContextPage() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Context Intelligence Engine</h1>
        <p className="text-muted-foreground">Normalize, enrich, and optimize business data into AI-ready knowledge.</p>
      </div>
      <ContextPreviewDashboard />
    </div>
  )
}
