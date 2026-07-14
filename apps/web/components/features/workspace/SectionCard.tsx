import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Copy, RefreshCw, FileText } from "lucide-react"

interface SectionCardProps {
  title: string;
  initialContent: string;
  onUpdate: (newContent: string) => void;
}

export function SectionCard({ title, initialContent, onUpdate }: SectionCardProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [content, setContent] = useState(initialContent)

  // Sync when streaming updates
  useEffect(() => {
    setContent(initialContent)
  }, [initialContent])

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    onUpdate(e.target.value)
  }

  return (
    <div className="mb-4 rounded-xl border border-white/10 bg-white/5 shadow-sm hover:border-primary/30 transition-all overflow-hidden">
      <div className="p-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          <h4 className="font-bold text-sm flex items-center gap-2 text-white">
            <FileText className="h-4 w-4 text-primary" /> {title}
          </h4>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-lg" onClick={handleCopy} title="Copy Section">
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-lg" title="Regenerate Section">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      {!collapsed && (
        <div className="p-0">
          <textarea 
            value={content}
            onChange={handleChange}
            className="w-full min-h-[150px] p-5 bg-transparent border-none focus:ring-0 text-sm font-mono leading-relaxed resize-y focus:outline-none placeholder:text-muted-foreground text-white/90"
            placeholder="Content for this section..."
          />
        </div>
      )}
    </div>
  )
}
