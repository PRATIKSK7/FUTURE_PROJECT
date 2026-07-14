import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const CONTEXT_BLOCKS = [
  { title: "Business Context", data: { name: "Blue Ribbon Travel", location: "Queens, NY" } },
  { title: "Brand Context", data: { voice: "Professional", usp: "24/7 Concierge" } },
  { title: "Audience Context", data: { personas: ["Honeymooners"], budget: "Luxury" } },
  { title: "SEO Context", data: { primary: ["luxury travel"], areas: ["Queens", "NYC"] } },
]

export function ContextVisualizer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {CONTEXT_BLOCKS.map(block => (
        <Card key={block.title} className="bg-card shadow-sm">
          <CardHeader className="bg-muted/20 border-b p-4">
            <CardTitle className="text-sm text-primary">{block.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-black/5 overflow-auto max-h-48">
            <pre className="text-xs font-mono text-foreground/80">
              {JSON.stringify(block.data, null, 2)}
            </pre>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
