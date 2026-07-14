"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowDown, Database, BrainCircuit, FileCode2, CheckCircle, Zap, FileText } from "lucide-react"

const PIPELINE_STAGES = [
  { id: "business", icon: Database, title: "1. Business Profile", purpose: "Collect raw client data.", input: "User Forms", output: "Zustand State", notes: "Data is unformatted and raw." },
  { id: "context", icon: BrainCircuit, title: "2. Context Intelligence", purpose: "Normalize & enrich data.", input: "Raw State", output: "Structured AI Context", notes: "Removes duplicates, adds semantic structure." },
  { id: "builder", icon: FileCode2, title: "3. Prompt Builder", purpose: "Assemble enterprise prompts.", input: "Context + Template", output: "Full Prompt String", notes: "Uses strict delimiters like [SYSTEM ROLE]." },
  { id: "validation", icon: CheckCircle, title: "4. Prompt Validation", purpose: "Ensure LLM safety.", input: "Full Prompt", output: "Validation Score", notes: "Checks token lengths and missing context." },
  { id: "gemini", icon: Zap, title: "5. Gemini API Streaming", purpose: "Generate copy.", input: "Validated Prompt", output: "Token Stream", notes: "Uses Server-Sent Events (SSE) for low latency." },
  { id: "workspace", icon: FileText, title: "6. Document Workspace", purpose: "Render and edit.", input: "Markdown Stream", output: "Interactive Editor", notes: "Parses stream into Notion-style blocks." }
]

export function PipelineFlow() {
  const [activeStage, setActiveStage] = useState<string | null>("business")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg mb-4">Interactive Execution Pipeline</h3>
        {PIPELINE_STAGES.map((stage, idx) => (
          <div key={stage.id} className="flex flex-col items-center">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveStage(stage.id)}
              className={`w-full p-4 rounded-xl border cursor-pointer transition-colors flex items-center gap-4 ${activeStage === stage.id ? 'bg-primary/10 border-primary text-primary' : 'bg-muted/30 hover:bg-muted'}`}
            >
              <div className={`p-2 rounded-lg ${activeStage === stage.id ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                <stage.icon className="h-5 w-5" />
              </div>
              <span className="font-semibold">{stage.title}</span>
            </motion.div>
            {idx < PIPELINE_STAGES.length - 1 && (
              <div className="h-6 w-px bg-border my-1 relative">
                <ArrowDown className="absolute -bottom-2 -left-1.5 h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {activeStage && (
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Card className="h-full border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5" /> Pipeline Inspector
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {PIPELINE_STAGES.map(s => s.id === activeStage && (
                    <div key={s.id} className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Purpose</h4>
                        <p className="text-sm font-medium">{s.purpose}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background p-3 rounded-md border">
                          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Input</h4>
                          <p className="text-sm font-mono text-amber-500">{s.input}</p>
                        </div>
                        <div className="bg-background p-3 rounded-md border">
                          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Output</h4>
                          <p className="text-sm font-mono text-green-500">{s.output}</p>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-md border border-primary/20">
                        <h4 className="text-xs font-semibold uppercase text-primary mb-1">Engineering Notes</h4>
                        <p className="text-sm">{s.notes}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
