import React from "react"
import { Button } from "@/components/ui/button"
import { useBusinessStore } from "@/lib/business-store"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"

interface NavigationButtonsProps {
  isValid?: boolean;
  onNext?: () => void;
  isSubmitting?: boolean;
}

export const NavigationButtons = React.memo(function NavigationButtons({ 
  isValid = true, 
  onNext, 
  isSubmitting = false 
}: NavigationButtonsProps) {
  const { step, nextStep, prevStep } = useBusinessStore()

  const handleNext = () => {
    if (onNext) onNext()
    else nextStep()
  }

  return (
    <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-6 transition-all">
      <Button 
        type="button" 
        variant="ghost" 
        onClick={prevStep} 
        disabled={step === 1 || isSubmitting}
        className="gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
        aria-label="Go to previous step"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
      </Button>
      
      {step < 7 ? (
        <Button 
          type="button" 
          onClick={handleNext} 
          disabled={!isValid || isSubmitting}
          className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 rounded-xl shadow-lg shadow-primary/30 transition-all"
          aria-label="Proceed to next step"
        >
          Next Step <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={handleNext} 
          disabled={isSubmitting}
          className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white border-0 rounded-xl shadow-lg shadow-emerald-500/30 transition-all"
          aria-label="Complete setup and save profile"
        >
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Complete Setup
        </Button>
      )}
    </div>
  )
})
