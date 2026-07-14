import { useState } from "react"
import { GeneratedPrompt } from "@/lib/prompt-builder/types"
import { validatePrompt } from "@/lib/prompt-builder/prompt-validator"
import { Button } from "@/components/ui/button"
import { Copy, ChevronDown, ChevronUp, AlertTriangle, Check, Zap, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Props {
  prompt: GeneratedPrompt;
}

export function PromptCard({ prompt }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const validation = validatePrompt(prompt)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.fullPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scoreColor = validation.score > 80 ? "text-emerald-400" : validation.score > 60 ? "text-amber-400" : "text-red-400"
  const scoreBg = validation.score > 80 ? "bg-emerald-400/20 border-emerald-400/30" : validation.score > 60 ? "bg-amber-400/20 border-amber-400/30" : "bg-red-400/20 border-red-400/30"

  return (
    <motion.div 
      layout
      className="glass rounded-2xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all group"
    >
      <div className="p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-primary shrink-0 shadow-lg shadow-primary/10">
            <Star className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-white text-lg truncate">{prompt.name}</h3>
            <div className="flex gap-4 text-xs text-muted-foreground mt-1 items-center">
              <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> ~{prompt.estimatedTokens} tokens</span>
              <span className={cn("px-2 py-0.5 rounded-md border text-[11px] font-bold", scoreBg, scoreColor)}>
                {validation.score}/100
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={copyToClipboard} 
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs gap-1.5 h-9"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setExpanded(!expanded)} 
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg h-9 w-9"
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-white/10 pt-4">
              {validation.warnings.length > 0 && (
                <div className="bg-amber-500/10 text-amber-400 p-4 rounded-xl text-sm flex items-start gap-3 border border-amber-500/20">
                  <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold mb-1">Validation Warnings</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {validation.warnings.map((w, i) => <li key={i} className="text-amber-300/80">{w}</li>)}
                    </ul>
                  </div>
                </div>
              )}
              <div className="rounded-xl bg-black/60 p-5 overflow-auto max-h-[400px] text-sm text-emerald-400 font-mono whitespace-pre-wrap border border-white/5 shadow-inner scrollbar-hide leading-relaxed">
                {prompt.fullPrompt}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
