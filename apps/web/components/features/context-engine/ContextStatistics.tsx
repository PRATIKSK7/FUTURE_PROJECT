import { Card, CardContent } from "@/components/ui/card"
import { ContextStatistics as StatsType } from "@/lib/context-engine/types"
import { FileText, Database, Hash, BarChart, FileCode2 } from "lucide-react"

export function ContextStatistics({ stats }: { stats: StatsType }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <FileText className="h-6 w-6 text-muted-foreground mb-2" />
          <div className="text-2xl font-bold">{stats.wordCount}</div>
          <div className="text-xs text-muted-foreground">Word Count</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <Database className="h-6 w-6 text-muted-foreground mb-2" />
          <div className="text-2xl font-bold">{stats.entities}</div>
          <div className="text-xs text-muted-foreground">Entities</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <Hash className="h-6 w-6 text-muted-foreground mb-2" />
          <div className="text-2xl font-bold">{stats.keywordCount}</div>
          <div className="text-xs text-muted-foreground">Keywords</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <BarChart className="h-6 w-6 text-muted-foreground mb-2" />
          <div className="text-2xl font-bold">{stats.sections}</div>
          <div className="text-xs text-muted-foreground">Sections</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <FileCode2 className="h-6 w-6 text-muted-foreground mb-2" />
          <div className="text-2xl font-bold">{stats.estimatedTokens}</div>
          <div className="text-xs text-muted-foreground">Est. Tokens</div>
        </CardContent>
      </Card>
    </div>
  )
}
