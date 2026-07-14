import { Activity, Clock, FileText, CheckCircle2 } from "lucide-react"

export function GenerationMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard icon={Activity} title="Pipeline Latency" value="1.2s" desc="Context to prompt generation" />
      <MetricCard icon={Clock} title="Generation Time" value="4.5s" desc="Gemini API TTFB" />
      <MetricCard icon={FileText} title="Est. Prompt Tokens" value="1,245" desc="Input context weight" />
      <MetricCard icon={CheckCircle2} title="Validation Score" value="98/100" desc="Pre-flight safety check" />
    </div>
  )
}

function MetricCard({ icon: Icon, title, value, desc }: any) {
  return (
    <div className="bg-card border rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
      <div className="p-3 bg-primary/10 rounded-full mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h4 className="text-2xl font-black mb-1">{value}</h4>
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-xs text-muted-foreground mt-2">{desc}</p>
    </div>
  )
}
