"use client"

import { useState, useEffect } from "react"
import { generatePrompts } from "@/lib/prompt-builder/prompt-builder"
import { GeneratedPrompt } from "@/lib/prompt-builder/types"
import { PromptCard } from "./PromptCard"
import { PromptChainViewer } from "./PromptChainViewer"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PromptBuilderDashboard() {
  const [prompts, setPrompts] = useState<GeneratedPrompt[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    // Generate prompts locally from Zustand state on mount
    setPrompts(generatePrompts())
  }, [])

  const filteredPrompts = prompts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search prompts..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>

        <div className="space-y-4">
          {filteredPrompts.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
          {filteredPrompts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No prompts match your search.
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="p-4 bg-primary/10 text-primary rounded-lg border border-primary/20">
          <h3 className="font-semibold mb-1">Local Prompt Engine</h3>
          <p className="text-sm">These prompts are generated entirely locally based on your Business Profile wizard state. No API calls are being made.</p>
        </div>
        <PromptChainViewer />
      </div>
    </div>
  )
}
