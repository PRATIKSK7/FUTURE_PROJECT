"use client"

import { PromptBuilderDashboard } from "@/components/features/prompt-builder/PromptBuilderDashboard"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function PromptsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="h-32 w-32 text-accent" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">Prompt Builder Engine</h1>
          <p className="text-muted-foreground text-lg">Inspect and validate enterprise prompts generated from your business context.</p>
        </div>
      </motion.div>
      <PromptBuilderDashboard />
    </div>
  )
}
