"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, 
  FolderOpen, 
  Wand2, 
  FileText, 
  Library, 
  BarChart3, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { UserButton } from "@clerk/nextjs"

const routes = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Projects", icon: FolderOpen, href: "/projects" },
  { label: "AI Generation", icon: Wand2, href: "/generation" },
  { label: "Generated Content", icon: FileText, href: "/content" },
  { label: "Prompt Library", icon: Library, href: "/prompts" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
  { label: "Settings", icon: Settings, href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="hidden flex-col border-r border-white/10 glass-panel md:flex relative z-20 h-screen sticky top-0"
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 font-bold text-lg">
          <div className="p-1.5 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg shadow-primary/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
              >
                CopyCraft AI
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-5 bg-card border border-white/10 rounded-full p-1 hover:bg-muted transition-colors shadow-md z-30"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 scrollbar-hide">
        <nav className="grid gap-2">
          {routes.map((route) => {
            const isActive = pathname === route.href || pathname.startsWith(route.href + "/")
            return (
              <Link key={route.href} href={route.href}>
                <div className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 relative group overflow-hidden",
                  isActive ? "text-white" : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 border border-white/10 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-primary to-accent rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  )}
                  
                  <route.icon className={cn(
                    "h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110",
                    isActive ? "text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" : ""
                  )} />
                  
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-medium whitespace-nowrap relative z-10"
                      >
                        {route.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-white/10">
        <Link href="/help">
          <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-muted-foreground transition-all hover:text-white hover:bg-white/5 mb-4 group">
            <HelpCircle className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium whitespace-nowrap"
                >
                  Help & Resources
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Link>

        <div className={cn(
          "flex items-center gap-3 rounded-xl p-3 bg-black/20 border border-white/5 transition-all",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center gap-3 overflow-hidden">
            <UserButton appearance={{ elements: { avatarBox: "h-9 w-9 ring-2 ring-primary/20" } }} />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col whitespace-nowrap"
                >
                  <span className="text-sm font-semibold text-white">My Workspace</span>
                  <span className="text-xs text-muted-foreground">Pro Plan</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
