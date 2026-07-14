import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Copy } from "lucide-react"

interface Props {
  title: string;
  data: Record<string, any>;
}

export function ContextCard({ title, data }: Props) {
  const [expanded, setExpanded] = useState(false)

  const copyData = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
  }

  return (
    <Card className="border-border bg-card overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/30 pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyData}>
            <Copy className="h-4 w-4 mr-2" /> Copy
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="p-4 border-t bg-black/5 overflow-auto max-h-64">
          <pre className="text-xs font-mono text-primary whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      )}
    </Card>
  )
}
