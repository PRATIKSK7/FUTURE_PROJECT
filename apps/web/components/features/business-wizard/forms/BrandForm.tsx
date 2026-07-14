import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { brandIdentitySchema } from "@/lib/validations/business"
import { useBusinessStore } from "@/lib/business-store"
import { NavigationButtons } from "../NavigationButtons"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function BrandForm() {
  const { brandIdentity, updateData, nextStep } = useBusinessStore()
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(brandIdentitySchema),
    defaultValues: brandIdentity,
    mode: "onChange"
  })

  const onSubmit = (data: any) => {
    updateData("brandIdentity", data)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="mission">Mission Statement *</Label>
        <Textarea id="mission" {...register("mission")} placeholder="To provide..." />
        {errors.mission && <p className="text-sm text-destructive">{errors.mission.message as string}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="vision">Vision *</Label>
        <Textarea id="vision" {...register("vision")} placeholder="To be the leading..." />
        {errors.vision && <p className="text-sm text-destructive">{errors.vision.message as string}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="usp">Unique Selling Proposition (USP) *</Label>
        <Textarea id="usp" {...register("usp")} placeholder="What makes you different?" />
        {errors.usp && <p className="text-sm text-destructive">{errors.usp.message as string}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="voice">Brand Voice *</Label>
        <Input id="voice" {...register("voice")} placeholder="e.g., Professional, Luxury, Playful" />
        {errors.voice && <p className="text-sm text-destructive">{errors.voice.message as string}</p>}
      </div>
      <NavigationButtons isValid={isValid} onNext={handleSubmit(onSubmit, (errs) => console.log(errs))} />
    </form>
  )
}
