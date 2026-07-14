import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { seoInfoSchema } from "@/lib/validations/business"
import { useBusinessStore } from "@/lib/business-store"
import { NavigationButtons } from "../NavigationButtons"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function SEOForm() {
  const { seoInfo, updateData, nextStep } = useBusinessStore()
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(seoInfoSchema),
    defaultValues: seoInfo,
    mode: "onChange"
  })

  const onSubmit = (data: any) => {
    updateData("seoInfo", data)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="primaryKeywords">Primary Keywords *</Label>
        <Textarea id="primaryKeywords" {...register("primaryKeywords")} placeholder="travel agency queens, local tour guide" />
        {errors.primaryKeywords && <p className="text-sm text-destructive">{errors.primaryKeywords.message as string}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="secondaryKeywords">Secondary Keywords</Label>
        <Textarea id="secondaryKeywords" {...register("secondaryKeywords")} placeholder="best flights, visa assistance" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="serviceAreas">Service Areas *</Label>
        <Input id="serviceAreas" {...register("serviceAreas")} placeholder="Queens, Brooklyn, Manhattan" />
        {errors.serviceAreas && <p className="text-sm text-destructive">{errors.serviceAreas.message as string}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="languages">Languages *</Label>
        <Input id="languages" {...register("languages")} placeholder="English, Spanish" />
        {errors.languages && <p className="text-sm text-destructive">{errors.languages.message as string}</p>}
      </div>
      <NavigationButtons isValid={isValid} onNext={handleSubmit(onSubmit, (errs) => console.log(errs))} />
    </form>
  )
}
