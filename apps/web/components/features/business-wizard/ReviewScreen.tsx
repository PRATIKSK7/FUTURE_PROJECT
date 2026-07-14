import { useBusinessStore } from "@/lib/business-store"
import { NavigationButtons } from "./NavigationButtons"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

import { useRouter, useParams } from "next/navigation"
import { useCreateProject, useUpdateProject } from "@/hooks/useProject"

export function ReviewScreen() {
  const router = useRouter()
  const { businessInfo, brandIdentity, targetAudience, services, competitors, seoInfo, activeProjectId, resetStore } = useBusinessStore()
  
  const createProject = useCreateProject()
  const updateProject = useUpdateProject(activeProjectId || "")

  const handleComplete = async () => {
    try {
      if (!businessInfo?.name) {
        alert("Business name is required.")
        return
      }
      
      const payload = {
        name: businessInfo.name,
        description: businessInfo.category,
        business_profile: businessInfo,
        brand_profile: brandIdentity,
        audience_profile: targetAudience,
        seo_profile: seoInfo,
        services: services,
        competitors: competitors,
        status: "completed"
      }
      
      if (activeProjectId) {
        await updateProject.mutateAsync(payload)
        resetStore()
        router.push(`/projects/${activeProjectId}`)
      } else {
        const project = await createProject.mutateAsync(payload)
        resetStore()
        router.push(`/projects/${project.id}`)
      }
    } catch (error) {
      console.error("Failed to save project:", error)
      alert("Failed to save project. Check console for details.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle2 className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Review your Profile</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Business Information</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><span className="font-medium text-muted-foreground">Name:</span> {businessInfo?.name || "N/A"}</p>
            <p><span className="font-medium text-muted-foreground">Location:</span> {businessInfo?.location || "N/A"}</p>
            <p><span className="font-medium text-muted-foreground">Category:</span> {businessInfo?.category || "N/A"}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Brand Identity</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><span className="font-medium text-muted-foreground">Voice:</span> {brandIdentity?.voice || "N/A"}</p>
            <p className="truncate"><span className="font-medium text-muted-foreground">USP:</span> {brandIdentity?.usp || "N/A"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Target Audience</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p className="truncate"><span className="font-medium text-muted-foreground">Types:</span> {targetAudience?.customerTypes || "N/A"}</p>
            <p><span className="font-medium text-muted-foreground">Age Groups:</span> {targetAudience?.ageGroups || "N/A"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">SEO & Competitors</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><span className="font-medium text-muted-foreground">Competitors:</span> {competitors?.length}</p>
            <p className="truncate"><span className="font-medium text-muted-foreground">Keywords:</span> {seoInfo?.primaryKeywords || "N/A"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Services ({services?.length})</h4>
        <div className="space-y-2">
          {services?.map((s, i) => (
            <div key={i} className="text-sm p-3 bg-muted rounded-md flex justify-between">
              <span className="font-medium">{s.name || "Unnamed Service"}</span>
              <span className="text-muted-foreground">{s.priceRange}</span>
            </div>
          ))}
        </div>
      </div>

      <NavigationButtons onNext={handleComplete} isValid={true} />
    </div>
  )
}
