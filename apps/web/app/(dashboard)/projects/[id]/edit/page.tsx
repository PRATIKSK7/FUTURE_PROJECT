"use client"

import { useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@clerk/nextjs"
import { env } from "@/config/env"
import { useBusinessStore } from "@/lib/business-store"
import { Loader2 } from "lucide-react"

async function fetchProject(id: string, getToken: any) {
  const token = await getToken()
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "x-workspace-id": "default"
    }
  })
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { getToken } = useAuth()
  const { id } = use(params)
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProject(id, getToken)
  })

  const store = useBusinessStore()

  useEffect(() => {
    if (project) {
      // Map project to store
      store.updateData("businessInfo", {
        name: project.name || "",
        category: project.businessProfile?.category || "",
        location: project.businessProfile?.location || "",
        website: project.businessProfile?.website || "",
        phone: project.businessProfile?.phone || "",
        email: project.businessProfile?.email || "",
      })
      store.updateData("brandIdentity", {
        mission: project.brandProfile?.mission || "",
        vision: project.brandProfile?.vision || "",
        usp: project.brandProfile?.usp || "",
        voice: project.brandProfile?.voice || "",
      })
      store.updateData("targetAudience", {
        customerTypes: project.audienceProfile?.customerTypes || "",
        ageGroups: project.audienceProfile?.ageGroups || "",
        budgetRange: project.audienceProfile?.budgetRange || "",
        preferences: project.audienceProfile?.preferences || "",
        painPoints: project.audienceProfile?.painPoints || "",
        goals: project.audienceProfile?.goals || "",
      })
      store.updateData("seoInfo", {
        primaryKeywords: project.seoProfile?.primaryKeywords || "",
        secondaryKeywords: project.seoProfile?.secondaryKeywords || "",
        serviceAreas: project.seoProfile?.serviceAreas || "",
        languages: project.seoProfile?.languages || "",
      })
      
      if (project.services && project.services.length > 0) {
        store.updateData("services", project.services)
      }
      
      if (project.competitors && project.competitors.length > 0) {
        store.updateData("competitors", project.competitors)
      }
      
      // Set to step 1 and active project id
      store.setStep(1)
      store.setActiveProjectId(id)
      
      router.push('/projects/new')
    }
  }, [project])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <h2 className="text-xl font-semibold mb-2 text-destructive">Error Loading Project</h2>
        <p className="text-muted-foreground">{error.message}</p>
        <button className="mt-4 text-primary hover:underline" onClick={() => router.push('/projects')}>Go Back</button>
      </div>
    )
  }

  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p>Loading project into wizard...</p>
      </div>
    </div>
  )
}
