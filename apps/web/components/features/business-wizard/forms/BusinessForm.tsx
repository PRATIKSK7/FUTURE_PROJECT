import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { businessInfoSchema } from "@/lib/validations/business"
import { useBusinessStore } from "@/lib/business-store"
import { NavigationButtons } from "../NavigationButtons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function BusinessForm() {
  const { businessInfo, updateData, nextStep } = useBusinessStore()
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: businessInfo,
    mode: "onChange"
  })

  const onSubmit = (data: any) => {
    updateData("businessInfo", data)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Business Name *</Label>
          <Input id="name" {...register("name")} placeholder="Blue Ribbon Travel" />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message as string}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Business Category *</Label>
          <Input id="category" {...register("category")} placeholder="Travel Agency" />
          {errors.category && <p className="text-sm text-destructive">{errors.category.message as string}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input id="location" {...register("location")} placeholder="Queens, NY" />
          {errors.location && <p className="text-sm text-destructive">{errors.location.message as string}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" {...register("website")} placeholder="https://..." />
          {errors.website && <p className="text-sm text-destructive">{errors.website.message as string}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} placeholder="+1..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} placeholder="hello@..." />
        </div>
      </div>
      <NavigationButtons isValid={isValid} onNext={handleSubmit(onSubmit, (errs) => console.log(errs))} />
    </form>
  )
}
