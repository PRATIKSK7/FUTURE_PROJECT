"use client"

import { useProjects } from "@/hooks/useProject"
import { EmptyState } from "@/components/shared/EmptyState"
import { Loader2, FileText, Calendar, ExternalLink, MoreVertical, Copy, Trash2, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ContentPage() {
  const { data: projects = [], isLoading } = useProjects()
  const router = useRouter()

  const allContent = projects.flatMap((p: any) => 
    (p.generatedContent || p.generated_content || []).map((c: any) => ({
      ...c,
      projectName: p.name,
      projectId: p.id
    }))
  ).sort((a: any, b: any) => new Date(b.createdAt || b.created_at || Date.now()).getTime() - new Date(a.createdAt || a.created_at || Date.now()).getTime())

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">Generated Content</h1>
          <p className="text-muted-foreground text-lg">Review, edit, and export your AI-generated website copy.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl">
            Filter
          </Button>
          <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl">
            Sort
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center glass rounded-2xl border border-white/10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : allContent.length === 0 ? (
        <EmptyState 
          title="No Content Found" 
          description="Run an AI generation workflow in a project to see saved content here."
          actionLabel="Go to Projects"
          onAction={() => router.push("/projects")}
          icon={<FileText className="h-10 w-10" />}
        />
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          {allContent.map((doc: any, idx: number) => (
            <motion.div 
              variants={item}
              key={idx} 
              className="break-inside-avoid"
            >
              <div className="glass rounded-2xl border border-white/10 overflow-hidden hover:border-primary/50 transition-colors group relative shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-5 flex flex-col gap-4 relative z-10">
                  <div className="flex justify-between items-start gap-4">
                    <span className="inline-flex items-center rounded-md bg-primary/20 px-2.5 py-1 text-xs font-semibold text-primary border border-primary/20 shadow-sm">
                      {doc.moduleName || doc.module_name || "Copy"}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white shrink-0 -mr-2">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-sm bg-black/40 p-4 rounded-xl text-muted-foreground whitespace-pre-wrap border border-white/5 font-mono max-h-[300px] overflow-hidden relative shadow-inner">
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#111] to-transparent" />
                    {doc.content}
                  </div>
                  
                  <div className="pt-2 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(doc.createdAt || doc.created_at).toLocaleDateString()}</span>
                      <span className="text-white font-medium bg-white/10 px-2 py-0.5 rounded text-[10px]">Proj: {doc.projectName}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/20 rounded-lg">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/20 rounded-lg">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        onClick={() => router.push(`/projects/${doc.projectId}`)}
                        size="sm" 
                        variant="secondary" 
                        className="bg-white/10 hover:bg-white/20 text-white border-0 h-8 gap-1 rounded-lg"
                      >
                        Open <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
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
