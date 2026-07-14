import { ProjectsDashboard } from "@/components/features/projects/ProjectsDashboard"

export default function ProjectsPage() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Projects Workspace</h1>
        <p className="text-muted-foreground">Manage your AI generation projects and business profiles.</p>
      </div>
      <ProjectsDashboard />
    </div>
  )
}
