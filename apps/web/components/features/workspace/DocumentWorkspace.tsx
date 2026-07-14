import { useState, useEffect } from "react"
import { EditorToolbar } from "./EditorToolbar"
import { SectionCard } from "./SectionCard"
import { QualitySidebar } from "./QualitySidebar"
import { DocumentStats } from "./DocumentStats"
import { parseSections } from "@/lib/workspace-utils"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels"

interface DocumentWorkspaceProps {
  content: string;
  isGenerating: boolean;
  onSave?: (content: string) => void;
  isSaving?: boolean;
}

export function DocumentWorkspace({ content, isGenerating, onSave, isSaving }: DocumentWorkspaceProps) {
  const [sections, setSections] = useState<{title: string, content: string}[]>([])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Only parse sections from stream if we don't have local edits
  useEffect(() => {
    if (isGenerating || (!hasUnsavedChanges && content)) {
      setSections(parseSections(content))
    }
  }, [content, isGenerating, hasUnsavedChanges])

  const handleSectionUpdate = (index: number, newContent: string) => {
    const newSections = [...sections]
    newSections[index].content = newContent
    setSections(newSections)
    setHasUnsavedChanges(true)
  }

  const fullContent = sections.map(s => `## ${s.title}\n${s.content}`).join("\n\n")

  return (
    <div className="flex h-full w-full rounded-2xl overflow-hidden shadow-2xl glass border border-white/10">
      <PanelGroup orientation="horizontal">
        {/* Main Editor Area */}
        <Panel defaultSize={70} minSize={50} className="flex flex-col h-full min-w-0 relative bg-black/20">
          <EditorToolbar 
            isGenerating={isGenerating} 
            hasUnsavedChanges={hasUnsavedChanges} 
            onSave={() => onSave && onSave(fullContent)}
            isSaving={isSaving}
            content={fullContent}
          />
          
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 scrollbar-hide">
            {sections.length === 0 && !isGenerating && (
              <div className="h-full flex items-center justify-center p-8 text-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-6 max-w-sm"
                >
                  <div className="h-24 w-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <Sparkles className="h-10 w-10 text-primary/80" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Ready to Generate</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Select a module from the Prompt Engine and click generate to populate this workspace with professional AI content.
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
            {sections.map((section, idx) => (
              <SectionCard 
                key={idx} 
                title={section.title} 
                initialContent={section.content}
                onUpdate={(newContent) => handleSectionUpdate(idx, newContent)}
              />
            ))}
            {isGenerating && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl glass border border-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col gap-4 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent animate-pulse-slow pointer-events-none" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative flex h-10 w-10 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
                    <div className="relative inline-flex rounded-full h-10 w-10 bg-primary items-center justify-center text-white">
                      <Sparkles className="h-5 w-5 animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-primary font-bold text-lg">AI is crafting your copy...</h4>
                    <p className="text-muted-foreground text-sm">Analyzing context and generating high-converting content.</p>
                  </div>
                </div>
                <div className="space-y-2 relative z-10 pl-14">
                  <div className="h-2 w-3/4 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-primary" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, repeat: Infinity }} />
                  </div>
                  <div className="h-2 w-1/2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-accent" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
                  </div>
                  <div className="h-2 w-5/6 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-cyan-500" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <DocumentStats content={fullContent} />
        </Panel>

        <PanelResizeHandle className="hidden lg:flex w-2 items-center justify-center group cursor-col-resize border-l border-white/5 bg-transparent">
          <div className="w-1 h-12 rounded-full bg-white/10 group-hover:bg-primary/50 transition-colors" />
        </PanelResizeHandle>

        {/* Quality Panel Sidebar */}
        <Panel defaultSize={30} minSize={20} className="hidden lg:block h-full relative">
          <QualitySidebar content={fullContent} />
        </Panel>
      </PanelGroup>
    </div>
  )
}
