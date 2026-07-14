"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Maximize2, Minimize2, Check, Download, Hash, Type } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PromptPreviewProps {
  promptText: string
  estimatedTokens?: number
}

export function PromptPreview({ promptText, estimatedTokens }: PromptPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = (format: 'txt' | 'md') => {
    const blob = new Blob([promptText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `compiled-prompt-${Date.now()}.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const wordCount = promptText ? promptText.trim().split(/\s+/).length : 0
  const charCount = promptText ? promptText.length : 0

  const Content = () => (
    <div className="flex flex-col h-full bg-black/40 rounded-xl border border-white/10 overflow-hidden relative shadow-inner">
      {/* Sticky Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Hash className="h-3.5 w-3.5" /> {wordCount} words</span>
          <span className="flex items-center gap-1"><Type className="h-3.5 w-3.5" /> {charCount} chars</span>
          {estimatedTokens && <span className="flex items-center gap-1 text-primary">~{estimatedTokens} tokens</span>}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 hover:bg-white/10 text-xs gap-1.5 rounded-lg px-2">
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDownload('md')} className="h-8 hover:bg-white/10 text-xs gap-1.5 rounded-lg px-2">
            <Download className="h-3.5 w-3.5" /> .md
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8 hover:bg-white/10 rounded-lg">
            {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>
      
      {/* Code Area */}
      <div className="flex-1 overflow-auto p-4 text-sm font-mono text-emerald-400/90 whitespace-pre-wrap leading-relaxed relative scrollbar-hide">
        {promptText || "Select a module to view the compiled prompt."}
      </div>
    </div>
  )

  return (
    <>
      <div className="flex-1 min-h-[250px] relative h-full">
        <Content />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-12"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl h-[80vh] flex flex-col shadow-2xl glass-panel rounded-2xl p-1"
            >
              <Content />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
