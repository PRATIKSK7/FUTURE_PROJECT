"use client"

import { Bell, Search, Menu, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { motion } from "framer-motion"

export function Header() {
  const { toggleSidebar } = useAppStore()

  return (
    <header className="flex h-16 items-center gap-4 border-b border-white/10 glass-panel px-4 lg:px-6 sticky top-0 z-10">
      <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/10" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <div className="w-full flex-1">
        <form>
          <div className="relative group max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="search"
              placeholder="Search workspaces..."
              className="w-full appearance-none bg-black/20 border border-white/10 rounded-full h-10 pl-10 pr-12 text-sm text-white placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-black/40 shadow-inner"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <Command className="h-3 w-3" />
                <span>K</span>
              </kbd>
            </div>
          </div>
        </form>
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button variant="ghost" size="icon" className="relative hover:bg-white/10 rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="sr-only">Notifications</span>
        </Button>
      </motion.div>
    </header>
  )
}
