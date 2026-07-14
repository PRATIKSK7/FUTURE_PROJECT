import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, Database, FileText, CheckCircle2 } from "lucide-react"

export function PromptChainViewer() {
  const steps = [
    { name: "Business Context", icon: Database },
    { name: "Brand & Audience Prompt", icon: FileText },
    { name: "Homepage Prompt", icon: FileText },
    { name: "Services Prompt", icon: FileText },
    { name: "SEO Prompt", icon: FileText },
    { name: "Final Validation", icon: CheckCircle2 }
  ]

  return (
    <Card className="bg-card/50">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-6">Execution Chain</h3>
        <div className="flex flex-col items-center">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center w-full">
              <div className="flex items-center gap-3 bg-muted p-3 rounded-lg w-full max-w-sm border shadow-sm">
                <step.icon className="h-5 w-5 text-primary" />
                <span className="font-medium text-sm">{step.name}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className="h-8 w-px bg-border my-1 flex items-center justify-center relative">
                  <ArrowDown className="absolute h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
