"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAIGeneration } from "@/hooks/useAIGeneration"
import { useSaveDraft } from "@/hooks/useProject"
import { generatePrompts } from "@/lib/prompt-builder/prompt-builder"
import { GeneratedPrompt } from "@/lib/prompt-builder/types"
import { runContextEngine } from "@/lib/context-engine/engine"
import { Button } from "@/components/ui/button"
import { Play, Square, AlertTriangle, Loader2, Sparkles, Wand2, Database, LayoutTemplate, Briefcase, Users, Search } from "lucide-react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels"
import { PromptPreview } from "./PromptPreview"

const DocumentWorkspace = dynamic(
  () => import("@/components/features/workspace/DocumentWorkspace").then(mod => ({ default: mod.DocumentWorkspace })),
  {
    loading: () => (
      <div className="h-full w-full flex items-center justify-center glass rounded-2xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
    ssr: false
  }
)

export function GenerationDashboard() {
  const [prompts, setPrompts] = useState<GeneratedPrompt[]>([])
  const [selectedPromptId, setSelectedPromptId] = useState<string>("")
  const [contextString, setContextString] = useState("")

  const params = useParams()
  const projectId = params?.id as string
  const saveDraft = useSaveDraft(projectId)

  const { content, isGenerating, error, generate, cancel } = useAIGeneration()

  useEffect(() => {
    const p = generatePrompts()
    setPrompts(p)
    if (p.length > 0) setSelectedPromptId(p[0].id)
    
    const ctx = runContextEngine()
    setContextString(ctx.normalizedString)
  }, [])

  const selectedPrompt = prompts.find(p => p.id === selectedPromptId)

  const handleGenerate = () => {
    if (!selectedPrompt) return;
    generate(contextString, selectedPrompt.fullPrompt, selectedPrompt.name)
  }

  const icons = [LayoutTemplate, Briefcase, Users, Search, Database]

  return (
    <div className="h-[calc(100vh-140px)] w-full">
      <PanelGroup orientation="horizontal">
        {/* Left Panel: Prompt Engine */}
        <Panel defaultSize={35} minSize={25} className="flex flex-col h-full bg-transparent">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full relative"
          >
            <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col h-full overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Wand2 className="h-32 w-32 text-primary" />
              </div>
              
              <h2 className="text-xl font-bold text-white mb-6 flex-shrink-0 relative z-10 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Prompt Engine
              </h2>

              {/* Scrollable middle area for list and preview */}
              <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-6 scrollbar-hide relative z-10 flex flex-col">
                <div className="space-y-3 flex-shrink-0">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Module</label>
                  <div className="grid gap-3">
                    {prompts.map((p, i) => {
                      const isActive = p.id === selectedPromptId
                      const Icon = icons[i % icons.length]
                      return (
                        <button
                          key={p.id}
                          onClick={() => setSelectedPromptId(p.id)}
                          disabled={isGenerating}
                          className={cn(
                            "flex flex-col gap-2 p-4 rounded-xl transition-all text-left group",
                            isActive 
                              ? "bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]" 
                              : "bg-white/5 border border-white/5 hover:bg-white/10"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-2 rounded-lg transition-colors",
                              isActive ? "bg-primary text-white" : "bg-black/20 text-muted-foreground group-hover:text-white"
                            )}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className={cn("font-semibold text-sm", isActive ? "text-white" : "text-muted-foreground group-hover:text-white")}>{p.name}</span>
                          </div>
                          {isActive && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-muted-foreground mt-2">
                              Generate high-converting copy using the latest context from your business profile. Estimated 450 tokens.
                            </motion.div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col min-h-[300px]">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Compiled Prompt Preview</label>
                  <PromptPreview 
                    promptText={selectedPrompt ? selectedPrompt.fullPrompt : ""} 
                    estimatedTokens={selectedPrompt ? 450 : 0} 
                  />
                </div>
              </div>

              {/* Fixed bottom area for button */}
              <div className="mt-4 pt-4 border-t border-white/10 relative z-10 flex-shrink-0 bg-background/50 backdrop-blur-sm -mx-6 px-6 -mb-6 pb-6">
                {isGenerating ? (
                  <Button onClick={cancel} className="w-full h-12 bg-destructive hover:bg-destructive/90 text-white rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-2 group">
                    <Loader2 className="h-5 w-5 animate-spin" /> Generating AI Content...
                  </Button>
                ) : (
                  <Button 
                    onClick={handleGenerate} 
                    disabled={!selectedPrompt}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 text-white rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2 group"
                  >
                    <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" /> ✨ Generate Content
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </Panel>

        <PanelResizeHandle className="w-4 flex items-center justify-center group cursor-col-resize">
          <div className="w-1 h-12 rounded-full bg-white/10 group-hover:bg-primary/50 transition-colors" />
        </PanelResizeHandle>

        {/* Center Panel: Workspace */}
        <Panel defaultSize={65} minSize={40} className="h-full relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-full relative"
          >
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-x-4 top-4 z-50 bg-destructive/90 backdrop-blur-md border border-destructive p-4 text-white flex items-center justify-center gap-3 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                >
                  <AlertTriangle className="h-5 w-5" />
                  <p className="font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <DocumentWorkspace 
              content={content} 
              isGenerating={isGenerating} 
              isSaving={saveDraft.isPending}
              onSave={async (fullContent) => {
                if (!selectedPrompt) return;
                try {
                  await saveDraft.mutateAsync({
                    module_name: selectedPrompt.name,
                    content: fullContent,
                    metrics: null
                  });
                } catch (err: any) {
                  console.error("Failed to save", err)
                }
              }}
            />
          </motion.div>
        </Panel>
      </PanelGroup>
    </div>
  )
}
