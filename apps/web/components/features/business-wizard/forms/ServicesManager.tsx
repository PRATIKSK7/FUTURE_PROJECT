import { useState } from "react"
import { useBusinessStore, Service } from "@/lib/business-store"
import { NavigationButtons } from "../NavigationButtons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

export function ServicesManager() {
  const { services, updateData, nextStep } = useBusinessStore()
  const [localServices, setLocalServices] = useState<Service[]>(
    (services && services.length > 0) ? services : [{ id: "1", name: "", description: "", priceRange: "", duration: "", uniqueBenefit: "" }]
  )

  const addService = () => {
    setLocalServices([...localServices, { id: Math.random().toString(), name: "", description: "", priceRange: "", duration: "", uniqueBenefit: "" }])
  }

  const removeService = (id: string) => {
    setLocalServices(localServices.filter(s => s.id !== id))
  }

  const updateService = (id: string, field: keyof Service, value: string) => {
    setLocalServices(localServices.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const onSubmit = () => {
    // Basic validation: at least one service with a name
    const validServices = localServices.filter(s => (s.name || "").trim() !== "")
    updateData("services", validServices)
    nextStep()
  }

  return (
    <div className="space-y-6">
      {localServices?.map((service, index) => (
        <div key={service.id || index} className="p-4 border rounded-md relative space-y-4 bg-card">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-sm">Service #{index + 1}</h4>
            {localServices?.length > 1 && (
              <Button variant="ghost" size="icon" onClick={() => removeService(service.id)} className="text-destructive h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Service Name *</Label>
              <Input value={service.name || ""} onChange={e => updateService(service.id, "name", e.target.value)} placeholder="Domestic Tours" />
            </div>
            <div className="space-y-2">
              <Label>Price Range</Label>
              <Input value={service.priceRange || ""} onChange={e => updateService(service.id, "priceRange", e.target.value)} placeholder="$500 - $1500" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea value={service.description || ""} onChange={e => updateService(service.id, "description", e.target.value)} placeholder="Provide guided..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Duration</Label>
              <Input value={service.duration || ""} onChange={e => updateService(service.id, "duration", e.target.value)} placeholder="3 days" />
            </div>
            <div className="space-y-2">
              <Label>Unique Benefit</Label>
              <Input value={service.uniqueBenefit || ""} onChange={e => updateService(service.id, "uniqueBenefit", e.target.value)} placeholder="Local expert guide" />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addService} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Another Service
      </Button>
      <NavigationButtons onNext={onSubmit} isValid={localServices?.some(s => (s.name || "").trim() !== "")} />
    </div>
  )
}
