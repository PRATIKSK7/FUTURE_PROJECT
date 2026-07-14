import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Terminal } from "lucide-react"

export function PromptBreakdown() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Metric title="Prompt Version" value="v2.4.1" />
        <Metric title="Estimated Tokens" value="1,245" />
        <Metric title="Characters" value="5,892" />
        <Metric title="Format" value="Markdown" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-muted/30 pb-4 border-b">
            <CardTitle className="text-sm flex items-center gap-2"><Terminal className="h-4 w-4" /> System Prompt</CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-black/5 font-mono text-xs text-green-400 whitespace-pre-wrap overflow-auto max-h-64">
{`You are a Senior Conversion Copywriter and Travel Industry Expert.
Your objective is to write enterprise-grade website copy that builds immense local trust and drives bookings.
Follow the exact constraints and maintain the specified brand voice.`}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-muted/30 pb-4 border-b">
            <CardTitle className="text-sm flex items-center gap-2"><Terminal className="h-4 w-4" /> Injected Context</CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-black/5 font-mono text-xs text-amber-400 whitespace-pre-wrap overflow-auto max-h-64">
{`[BUSINESS]: Blue Ribbon Travel is a Luxury Agency...
[USP]: We provide 24/7 concierge support.
[BRAND VOICE]: Professional, authoritative, welcoming.
[PERSONAS]: High Net Worth Individuals, Honeymooners.
[SERVICES]: Custom Itineraries, Cruise Bookings.
[KEYWORDS]: luxury travel queens, best travel agency ny`}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="bg-muted/30 pb-4 border-b">
            <CardTitle className="text-sm flex items-center gap-2"><Terminal className="h-4 w-4" /> Constraints & Validation</CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-black/5 font-mono text-xs text-blue-400 whitespace-pre-wrap">
{`- Do NOT invent services not listed in context.
- Maintain maximum 500 words per section.
- Output MUST be valid markdown format.
- DO NOT use markdown code blocks (\`\`\`) in the final output.
- Inject primary keywords naturally into H1 and H2 tags.`}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Metric({ title, value }: { title: string, value: string }) {
  return (
    <div className="bg-card border rounded-lg p-4 text-center shadow-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">{title}</div>
      <div className="text-2xl font-bold text-primary">{value}</div>
    </div>
  )
}
