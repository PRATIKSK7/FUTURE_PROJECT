import { getMockQualityScores } from "@/lib/workspace-utils"
import { ShieldCheck, Search, Type, CheckCircle2, TrendingUp } from "lucide-react"

export function QualitySidebar({ content }: { content: string }) {
  const scores = getMockQualityScores(content)

  return (
    <div className="w-72 border-l border-white/10 glass-panel h-full flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-bold text-sm flex items-center gap-2 text-white">
          <ShieldCheck className="h-4 w-4 text-primary" /> AI Quality Score
        </h3>
      </div>
      
      <div className="p-5 space-y-6">
        <div className="text-center relative">
          <div className="inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-primary/30 relative">
            <div className="absolute inset-0 rounded-full bg-primary/5" />
            <div className="text-5xl font-black text-primary relative z-10">{scores.overallScore}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold relative z-10">Quality</div>
          </div>
        </div>

        <div className="space-y-4">
          <ScoreBar icon={Search} label="SEO Score" value={scores.seoScore} color="from-blue-500 to-cyan-500" />
          <ScoreBar icon={Type} label="Readability" value={scores.readabilityScore} color="from-purple-500 to-pink-500" />
          <ScoreBar icon={CheckCircle2} label="CTA Strength" value={scores.ctaStrength} color="from-emerald-500 to-teal-500" />
        </div>

        <div className="pt-4 border-t border-white/10 space-y-3">
          <StatusItem label="Grammar" value={scores.grammarStatus} />
          <StatusItem label="Brand Consistency" value={scores.brandConsistency} />
          <StatusItem label="Keyword Density" value={scores.keywordDensity} />
          <StatusItem label="Est. Tokens" value={scores.estimatedTokens.toString()} />
        </div>
      </div>
    </div>
  )
}

function ScoreBar({ icon: Icon, label, value, color }: { icon: any, label: string, value: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="h-4 w-4" /> {label}
        </div>
        <div className={`font-bold text-sm ${value > 80 ? 'text-emerald-400' : value > 60 ? 'text-amber-400' : 'text-red-400'}`}>
          {value}
        </div>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
        <div 
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function StatusItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="font-semibold text-sm text-white bg-white/10 px-2.5 py-0.5 rounded-lg text-xs">{value}</div>
    </div>
  )
}
