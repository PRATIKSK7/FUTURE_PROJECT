"use client"

import { useEffect, useRef, use } from "react"
import { useProject, useUpdateProject } from "@/hooks/useProject"
import { useBusinessStore } from "@/lib/business-store"
import { BusinessWizard } from "@/components/features/business-wizard/BusinessWizard"
import { GenerationDashboard } from "@/components/features/generation/GenerationDashboard"
import { Loader2 } from "lucide-react"

export default function ProjectWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: project, isLoading } = useProject(id)
  const updateProject = useUpdateProject(id)
  const isHydrated = useRef(false)

  // 1. Hydrate Zustand store from backend on mount
  useEffect(() => {
    if (project && !isHydrated.current) {
      const services = project.services ?? project.services ?? [];
      const competitors = project.competitors ?? project.competitors ?? [];
      const businessInfo = project.businessProfile ?? project.business_profile ?? null;
      const brandIdentity = project.brandProfile ?? project.brand_profile ?? null;
      const targetAudience = project.audienceProfile ?? project.audience_profile ?? null;
      const seoInfo = project.seoProfile ?? project.seo_profile ?? null;

      useBusinessStore.setState({
        businessInfo,
        brandIdentity,
        targetAudience,
        seoInfo,
        services,
        competitors
      })
      isHydrated.current = true
    }
  }, [project])

  // 2. Auto-sync Zustand state back to the DB upon any change
  useEffect(() => {
    const unsub = useBusinessStore.subscribe((state) => {
      if (!isHydrated.current) return;
      
      // Debounce saving or save immediately (optimistic)
      updateProject.mutate({
        businessProfile: state.businessInfo,
        brandProfile: state.brandIdentity,
        audienceProfile: state.targetAudience,
        seoProfile: state.seoInfo,
        services: state.services,
        competitors: state.competitors
      })
    })
    
    return () => unsub()
  }, [updateProject])

  if (isLoading) return <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>
  if (!project) return <div className="p-20 text-center text-muted-foreground">Project not found.</div>

  if (project.status === "completed") {
    return (
      <div className="h-full flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground">Workspace ready. Select a module to generate content.</p>
        </div>
        <GenerationDashboard />
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
        <p className="text-muted-foreground">Configure the business context for this project.</p>
      </div>
      <BusinessWizard />
    </div>
  )
}
