import { useState } from "react"
import { useBusinessStore, Competitor } from "@/lib/business-store"
import { NavigationButtons } from "../NavigationButtons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

export function CompetitorManager() {
  const { competitors, updateData, nextStep } = useBusinessStore()
  const [localCompetitors, setLocalCompetitors] = useState<Competitor[]>(
    (competitors && competitors.length > 0) ? competitors : [{ id: "1", website: "", strengths: "", weaknesses: "" }]
  )

  const addCompetitor = () => {
    setLocalCompetitors([...localCompetitors, { id: Math.random().toString(), website: "", strengths: "", weaknesses: "" }])
  }

  const removeCompetitor = (id: string) => {
    setLocalCompetitors(localCompetitors.filter(c => c.id !== id))
  }

  const updateCompetitor = (id: string, field: keyof Competitor, value: string) => {
    setLocalCompetitors(localCompetitors.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const onSubmit = () => {
    const validCompetitors = localCompetitors.filter(c => (c.website || "").trim() !== "")
    updateData("competitors", validCompetitors)
    nextStep()
  }

  return (
    <div className="space-y-6">
      {localCompetitors?.map((competitor, index) => (
        <div key={competitor.id || index} className="p-4 border rounded-md relative space-y-4 bg-card">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-sm">Competitor #{index + 1}</h4>
            {localCompetitors?.length > 1 && (
              <Button variant="ghost" size="icon" onClick={() => removeCompetitor(competitor.id)} className="text-destructive h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <Label>Competitor Website</Label>
            <Input value={competitor.website || ""} onChange={e => updateCompetitor(competitor.id, "website", e.target.value)} placeholder="https://..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Strengths</Label>
              <Textarea value={competitor.strengths || ""} onChange={e => updateCompetitor(competitor.id, "strengths", e.target.value)} placeholder="What do they do well?" />
            </div>
            <div className="space-y-2">
              <Label>Weaknesses</Label>
              <Textarea value={competitor.weaknesses || ""} onChange={e => updateCompetitor(competitor.id, "weaknesses", e.target.value)} placeholder="What are they missing?" />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addCompetitor} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Competitor
      </Button>
      <NavigationButtons onNext={onSubmit} isValid={true} />
    </div>
  )
}
