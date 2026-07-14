import { GenerationDashboard } from "@/components/features/generation/GenerationDashboard"

export default function GenerationPage() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI Generation</h1>
        <p className="text-muted-foreground">Run your enterprise prompts through the AI engine.</p>
      </div>
      <GenerationDashboard />
    </div>
  )
}
