"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useProjects, useDeleteProject, useCloneProject } from "@/hooks/useProject"
import { Button } from "@/components/ui/button"
import { Search, Plus, Folder, Trash2, Calendar, FileText, Copy, Edit, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function ProjectsDashboard() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const { data: projects = [], isLoading } = useProjects(search)
  const deleteProject = useDeleteProject()
  const cloneProject = useCloneProject()

  const handleCreate = () => {
    router.push(`/projects/new`)
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            placeholder="Search projects..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl h-11 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
          />
        </div>
        <Button 
          onClick={handleCreate} 
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 h-11 px-6 rounded-xl shadow-lg shadow-primary/30 gap-2"
        >
          <Plus className="h-4 w-4" /> Create Project
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="glass rounded-2xl border border-white/10 h-48 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center glass relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary shadow-lg shadow-primary/20 mb-6 relative z-10">
            <Folder className="h-10 w-10" />
          </motion.div>
          <h3 className="text-xl font-bold text-white relative z-10">No Projects Found</h3>
          <p className="mb-6 mt-2 text-sm text-muted-foreground max-w-[400px] relative z-10">Create your first project to start generating high-converting copy.</p>
          <Button onClick={handleCreate} className="relative z-10 bg-gradient-to-r from-primary to-accent hover:opacity-90 border-0 shadow-lg shadow-primary/30 gap-2">
            <Sparkles className="h-4 w-4" /> Create First Project
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((p: any) => (
            <motion.div key={p.id} variants={item}>
              <div 
                className="glass rounded-2xl border border-white/10 overflow-hidden hover:border-primary/40 transition-all group cursor-pointer flex flex-col shadow-lg relative"
                onClick={() => router.push(`/projects/${p.id}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="p-5 flex items-start justify-between relative z-10 border-b border-white/10">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-primary font-bold shrink-0 shadow-lg shadow-primary/10">
                      {p.name?.charAt(0) || "P"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-white truncate">{p.name}</h3>
                      <span className={cn(
                        "text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border mt-1 inline-block",
                        p.status === "complete" 
                          ? "bg-emerald-400/20 text-emerald-400 border-emerald-400/20" 
                          : "bg-amber-400/20 text-amber-400 border-amber-400/20"
                      )}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); cloneProject.mutate(p.id) }} className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/20 rounded-lg" title="Clone">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); router.push(`/projects/${p.id}/edit`) }} className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/20 rounded-lg" title="Edit">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); deleteProject.mutate(p.id) }} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/20 rounded-lg" title="Delete">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-5 flex-1 relative z-10">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {p.description || "No description provided."}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {new Date(p.updated_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5 text-primary font-medium group-hover:translate-x-1 transition-transform">
                      Open <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
