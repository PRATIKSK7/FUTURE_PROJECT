"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PipelineFlow } from "./PipelineFlow"
import { PromptBreakdown } from "./PromptBreakdown"
import { ContextVisualizer } from "./ContextVisualizer"
import { GenerationMetrics } from "./GenerationMetrics"
import { ArchitectureDiagram } from "./ArchitectureDiagram"
import { RecruiterMode } from "./RecruiterMode"
import { Sparkles } from "lucide-react"

export function ExplainabilityDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
          <Sparkles className="h-6 w-6" /> Prompt Explainability Engine
        </h2>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          An interactive, transparent view into the internal architecture, prompt engineering techniques, and AI pipeline routing used in CopyCraft AI. Designed for technical review.
        </p>
      </div>

      <Tabs defaultValue="pipeline" className="w-full">
        <TabsList className="grid grid-cols-2 lg:grid-cols-6 h-auto p-1 gap-2 bg-muted/50 rounded-lg">
          <TabsTrigger value="pipeline" className="rounded-md">Pipeline Flow</TabsTrigger>
          <TabsTrigger value="breakdown" className="rounded-md">Prompt Breakdown</TabsTrigger>
          <TabsTrigger value="context" className="rounded-md">Context Engine</TabsTrigger>
          <TabsTrigger value="metrics" className="rounded-md">Metrics</TabsTrigger>
          <TabsTrigger value="architecture" className="rounded-md">Architecture</TabsTrigger>
          <TabsTrigger value="recruiter" className="rounded-md bg-amber-500/10 text-amber-600 data-[state=active]:bg-amber-500 data-[state=active]:text-white">Recruiter Guide</TabsTrigger>
        </TabsList>
        
        <div className="mt-6 border rounded-xl bg-card p-6 min-h-[500px] shadow-sm">
          <TabsContent value="pipeline" className="m-0"><PipelineFlow /></TabsContent>
          <TabsContent value="breakdown" className="m-0"><PromptBreakdown /></TabsContent>
          <TabsContent value="context" className="m-0"><ContextVisualizer /></TabsContent>
          <TabsContent value="metrics" className="m-0"><GenerationMetrics /></TabsContent>
          <TabsContent value="architecture" className="m-0"><ArchitectureDiagram /></TabsContent>
          <TabsContent value="recruiter" className="m-0"><RecruiterMode /></TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
