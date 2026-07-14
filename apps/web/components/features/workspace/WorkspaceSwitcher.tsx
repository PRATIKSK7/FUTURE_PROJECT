"use client"
import { useState } from "react"
import { UserButton } from "@clerk/nextjs"
import { ChevronsUpDown, Building, PlusCircle } from "lucide-react"

export function WorkspaceSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeWorkspace, setActiveWorkspace] = useState("Personal Workspace")

  return (
    <div className="flex items-center justify-between w-full p-2 border rounded-md bg-muted/20 hover:bg-muted/50 cursor-pointer transition-colors relative">
      <div 
        className="flex items-center gap-2 flex-1 min-w-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-primary/20 text-primary p-1.5 rounded-md shrink-0">
          <Building className="h-4 w-4" />
        </div>
        <div className="flex flex-col flex-1 truncate">
          <span className="text-xs text-muted-foreground leading-none mb-1">Workspace</span>
          <span className="text-sm font-semibold truncate leading-none">{activeWorkspace}</span>
        </div>
        <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
      </div>

      <div className="ml-2 pl-2 border-l shrink-0">
        <UserButton />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-card border rounded-md shadow-lg z-50 p-2 space-y-1">
          <div className="p-2 text-sm font-medium bg-muted/50 rounded-md cursor-pointer">
            Personal Workspace
          </div>
          <div className="p-2 text-sm text-muted-foreground hover:bg-muted/30 rounded-md cursor-pointer flex items-center gap-2">
            <PlusCircle className="h-4 w-4" /> Create Workspace
          </div>
        </div>
      )}
    </div>
  )
}
