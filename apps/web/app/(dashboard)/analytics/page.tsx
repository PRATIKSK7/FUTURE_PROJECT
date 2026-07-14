"use client"

import { useProjects } from "@/hooks/useProject"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/EmptyState"
import { BarChart3, Clock, Zap, Target, TrendingUp, Activity } from "lucide-react"
import { motion } from "framer-motion"

export default function AnalyticsPage() {
  const { data: projects = [], isLoading } = useProjects()

  const totalGenerations = projects.reduce((acc: number, p: any) => acc + (p.generated_content?.length || 0), 0)
  const totalTokens = totalGenerations * 850
  const apiCalls = totalGenerations + projects.length

  const moduleCounts: Record<string, number> = {}
  projects.forEach((p: any) => {
    (p.generated_content || []).forEach((c: any) => {
      const mod = c.module_name || 'Unknown'
      moduleCounts[mod] = (moduleCounts[mod] || 0) + 1
    })
  })
  
  const moduleData = Object.keys(moduleCounts).map(name => ({
    name,
    value: moduleCounts[name]
  })).sort((a, b) => b.value - a.value).slice(0, 5)

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  if (isLoading) return (
    <div className="max-w-7xl mx-auto grid gap-6">
      <div className="glass-panel p-6 rounded-2xl border border-white/10 animate-pulse h-24" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1,2,3,4].map(i => <div key={i} className="glass rounded-2xl h-32 animate-pulse" />)}
      </div>
    </div>
  )

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-8"
    >
      <motion.div variants={item} className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <TrendingUp className="h-32 w-32 text-primary" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-lg">Monitor API usage, costs, and generation metrics.</p>
        </div>
      </motion.div>
      
      {totalGenerations === 0 ? (
        <EmptyState 
          title="Not Enough Data" 
          description="Metrics will appear here after your first content generation."
          actionLabel="Generate Content"
          icon={<Activity className="h-10 w-10" />}
        />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Generations", value: totalGenerations, icon: BarChart3, color: "text-primary", glow: "shadow-primary/20", bg: "bg-primary/20" },
              { label: "Est. Tokens", value: totalTokens.toLocaleString(), icon: Zap, color: "text-accent", glow: "shadow-accent/20", bg: "bg-accent/20" },
              { label: "API Calls", value: apiCalls, icon: Target, color: "text-cyan-400", glow: "shadow-cyan-400/20", bg: "bg-cyan-400/20" },
              { label: "Avg Latency", value: "1.2s", icon: Clock, color: "text-emerald-400", glow: "shadow-emerald-400/20", bg: "bg-emerald-400/20" },
            ].map((stat, i) => (
              <motion.div key={i} variants={item}>
                <Card className="glass relative overflow-hidden group border-white/10 rounded-2xl">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <stat.icon className={`h-16 w-16 ${stat.color}`} />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-black text-white">{stat.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={item} className="grid gap-6 md:grid-cols-2">
            <Card className="glass border-white/10 rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-white/10 bg-white/5">
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="h-5 w-5 text-primary" /> Generations by Module
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ChartWrapper data={moduleData} />
              </CardContent>
            </Card>
            
            <Card className="glass border-white/10 rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-white/10 bg-white/5">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="h-5 w-5 text-accent" /> Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {projects.flatMap((p: any) => p.generated_content?.map((c: any) => ({...c, projectName: p.name})) || [])
                    .sort((a: any, b: any) => new Date(b.created_at || Date.now()).getTime() - new Date(a.created_at || Date.now()).getTime())
                    .slice(0, 5)
                    .map((entry: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                            {(entry.module_name || 'G').charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{entry.module_name || 'Generation'}</p>
                            <p className="text-xs text-muted-foreground">{entry.projectName}</p>
                          </div>
                        </div>
                        <span className="text-xs bg-white/10 px-2.5 py-1 rounded-lg text-muted-foreground font-medium">
                          {new Date(entry.created_at || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                  ))}
                  {projects.flatMap((p: any) => p.generated_content || []).length === 0 && (
                    <p className="text-center text-muted-foreground text-sm py-8">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}

function ChartWrapper({ data }: { data: any[] }) {
  if (typeof window === 'undefined') return null;

  if (data.length === 0) {
    return <div className="h-[250px] flex items-center justify-center text-muted-foreground">No module data yet</div>
  }

  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="space-y-4">
      {data.map((entry, i) => (
        <div key={i} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white font-medium">{entry.name}</span>
            <span className="text-muted-foreground font-mono">{entry.value}</span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)]"
              initial={{ width: 0 }}
              animate={{ width: `${(entry.value / maxValue) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
