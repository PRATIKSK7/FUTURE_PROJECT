"use client"

import { useState, useEffect } from "react"
import { runContextEngine } from "@/lib/context-engine/engine"
import { FinalContext } from "@/lib/context-engine/types"
import { ContextCard } from "./ContextCard"
import { ContextStatistics } from "./ContextStatistics"
import { Input } from "@/components/ui/input"
import { Search, Filter, AlertTriangle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContextPreviewDashboard() {
  const [context, setContext] = useState<FinalContext | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    setContext(runContextEngine())
  }, [])

  if (!context) return null;

  const sections = [
    { title: "Business Analyzer", data: context.business },
    { title: "Brand Analyzer", data: context.brand },
    { title: "Audience Analyzer", data: context.audience },
    { title: "Services Analyzer", data: context.services },
    { title: "SEO Analyzer", data: context.seo },
    { title: "Competitor Analyzer", data: context.competitors }
  ].filter(s => s.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center p-4 bg-card border rounded-xl">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Context Intelligence Score
          </h2>
          <p className="text-sm text-muted-foreground">Overall readiness for AI Prompt Generation.</p>
        </div>
        <div className="text-3xl font-black text-primary">
          {context.score} / 100
        </div>
      </div>

      {context.warnings.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
          <h3 className="text-amber-500 font-semibold flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5" /> Warnings
          </h3>
          <ul className="list-disc pl-5 text-sm text-amber-600/80 space-y-1">
            {context.warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}

      <ContextStatistics stats={context.statistics} />

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search context modules..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map(section => (
          <ContextCard key={section.title} title={section.title} data={section.data} />
        ))}
      </div>

      <div className="p-6 bg-black/5 rounded-xl border">
        <h3 className="font-semibold mb-4">Final Normalized AI Context</h3>
        <pre className="text-sm font-mono text-green-500 whitespace-pre-wrap overflow-auto max-h-64">
          {context.normalizedString}
        </pre>
      </div>
    </div>
  )
}
