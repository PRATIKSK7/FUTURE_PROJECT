"use client"

import { FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, actionLabel = "Get Started", onAction, icon }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[300px] shrink-0 flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center glass relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
      
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary shadow-lg shadow-primary/20 mb-6 relative z-10"
      >
        {icon || <FolderOpen className="h-10 w-10" />}
      </motion.div>
      
      <h3 className="text-xl font-bold text-white relative z-10">{title}</h3>
      <p className="mb-6 mt-2 text-sm text-muted-foreground max-w-[400px] mx-auto relative z-10">
        {description}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction} 
          className="relative z-10 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity border-0 shadow-lg shadow-primary/30"
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  )
}
