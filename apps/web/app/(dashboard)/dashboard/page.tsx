"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/EmptyState"
import { useProjects } from "@/hooks/useProject"
import { Folder, FileText, Sparkles, Plus, Wand2, Zap, ArrowRight, Clock, Library, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

export default function DashboardPage() {
  const { data: projects = [], isLoading } = useProjects()
  const { user } = useUser()

  const projectCount = projects.length
  const generatedCount = projects.reduce((acc: number, p: any) => acc + (p.generated_content?.length || 0), 0)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 max-w-7xl mx-auto"
    >
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl glass-panel p-8 border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user?.firstName || "Creator"} <span className="inline-block animate-float">👋</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Ready to generate some high-converting copy today? Your workspace is waiting.
            </p>
          </div>
          <Link href="/projects" className="shrink-0">
            <div className="group relative px-6 py-3 bg-white text-black font-semibold rounded-xl overflow-hidden hover:scale-105 transition-transform flex items-center gap-2">
              <span className="relative z-10">New Project</span>
              <Sparkles className="h-4 w-4 relative z-10 text-primary" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </motion.div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item}>
          <Card className="glass relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Folder className="h-16 w-16 text-primary" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-white">{isLoading ? "-" : projectCount}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="glass relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText className="h-16 w-16 text-accent" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Generated Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-white">{isLoading ? "-" : generatedCount}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glass relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="h-16 w-16 text-warning" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Quality Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-white">94<span className="text-lg text-muted-foreground font-normal">/100</span></div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glass relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wand2 className="h-16 w-16 text-success" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tokens Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-white">12.4k</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" /> Recent Activity
          </h2>
          {projectCount === 0 && !isLoading ? (
            <EmptyState 
              title="No Projects Yet" 
              description="Create a project to start generating content."
              actionLabel="Create Project"
            />
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 3).map((p: any, i: number) => (
                <div key={p.id || i} className="glass p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {p.name?.charAt(0) || "P"}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{p.name || "Untitled Project"}</h4>
                      <p className="text-xs text-muted-foreground">{p.generated_content?.length || 0} drafts</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/projects" className="glass p-4 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-primary/20 hover:border-primary/50 transition-all text-center group h-32">
              <div className="p-2 bg-primary/20 rounded-full group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium text-sm">New Project</span>
            </Link>
            <Link href="/prompts" className="glass p-4 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-accent/20 hover:border-accent/50 transition-all text-center group h-32">
              <div className="p-2 bg-accent/20 rounded-full group-hover:scale-110 transition-transform">
                <Library className="h-6 w-6 text-accent" />
              </div>
              <span className="font-medium text-sm">Prompt Library</span>
            </Link>
            <Link href="/content" className="glass p-4 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-success/20 hover:border-success/50 transition-all text-center group h-32">
              <div className="p-2 bg-success/20 rounded-full group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6 text-success" />
              </div>
              <span className="font-medium text-sm">View Drafts</span>
            </Link>
            <Link href="/analytics" className="glass p-4 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-warning/20 hover:border-warning/50 transition-all text-center group h-32">
              <div className="p-2 bg-warning/20 rounded-full group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6 text-warning" />
              </div>
              <span className="font-medium text-sm">Analytics</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
