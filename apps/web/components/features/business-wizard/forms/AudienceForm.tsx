import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { targetAudienceSchema } from "@/lib/validations/business"
import { useBusinessStore } from "@/lib/business-store"
import { NavigationButtons } from "../NavigationButtons"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function AudienceForm() {
  const { targetAudience, updateData, nextStep } = useBusinessStore()
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(targetAudienceSchema),
    defaultValues: targetAudience,
    mode: "onChange"
  })

  const onSubmit = (data: any) => {
    updateData("targetAudience", data)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customerTypes">Customer Types *</Label>
        <Textarea id="customerTypes" {...register("customerTypes")} placeholder="e.g., Families, Couples, Solo Travelers" />
        {errors.customerTypes && <p className="text-sm text-destructive">{errors.customerTypes.message as string}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ageGroups">Age Groups *</Label>
          <Textarea id="ageGroups" {...register("ageGroups")} placeholder="25-45" />
          {errors.ageGroups && <p className="text-sm text-destructive">{errors.ageGroups.message as string}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="budgetRange">Budget Range *</Label>
          <Textarea id="budgetRange" {...register("budgetRange")} placeholder="$2000 - $5000 per trip" />
          {errors.budgetRange && <p className="text-sm text-destructive">{errors.budgetRange.message as string}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferences">Customer Preferences *</Label>
        <Textarea id="preferences" {...register("preferences")} placeholder="What do they prefer?" />
        {errors.preferences && <p className="text-sm text-destructive">{errors.preferences.message as string}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="painPoints">Customer Pain Points *</Label>
        <Textarea id="painPoints" {...register("painPoints")} placeholder="What problems do they face?" />
        {errors.painPoints && <p className="text-sm text-destructive">{errors.painPoints.message as string}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="goals">Customer Goals *</Label>
        <Textarea id="goals" {...register("goals")} placeholder="What do they want to achieve?" />
        {errors.goals && <p className="text-sm text-destructive">{errors.goals.message as string}</p>}
      </div>
      <NavigationButtons isValid={isValid} onNext={handleSubmit(onSubmit, (errs) => console.log(errs))} />
    </form>
  )
}
