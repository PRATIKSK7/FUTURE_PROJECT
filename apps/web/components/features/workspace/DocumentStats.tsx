import { getDocumentStats } from "@/lib/workspace-utils"
import { Clock, Type, Hash } from "lucide-react"

export function DocumentStats({ content }: { content: string }) {
  const { words, chars, readingTime } = getDocumentStats(content)

  return (
    <div className="flex items-center gap-6 text-xs text-muted-foreground px-5 py-3 border-t border-white/10 bg-black/20">
      <div className="flex items-center gap-1.5"><Hash className="h-3.5 w-3.5 text-primary/60" /> <span className="text-white font-medium">{words}</span> words</div>
      <div className="flex items-center gap-1.5"><Type className="h-3.5 w-3.5 text-accent/60" /> <span className="text-white font-medium">{chars}</span> characters</div>
      <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-cyan-400/60" /> <span className="text-white font-medium">{readingTime}</span> min read</div>
    </div>
  )
}
