import { useBusinessStore } from "@/lib/business-store"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const steps = [
  "Business Info",
  "Brand Identity",
  "Target Audience",
  "Services",
  "Competitors",
  "SEO",
  "Review"
]

export function Stepper() {
  const { step } = useBusinessStore()

  return (
    <div className="mb-8 pt-4">
      <div className="flex items-center justify-between relative z-10">
        {steps.map((label, index) => {
          const stepNumber = index + 1
          const isActive = step === stepNumber
          const isCompleted = step > stepNumber

          return (
            <div key={label} className="flex flex-col items-center relative group">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  backgroundColor: isCompleted ? "hsl(var(--primary))" : isActive ? "hsl(var(--background))" : "rgba(255,255,255,0.05)",
                  borderColor: isCompleted || isActive ? "hsl(var(--primary))" : "rgba(255,255,255,0.1)",
                }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 relative z-20",
                  isActive ? "shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "",
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5 text-white" />
                ) : (
                  <span className={cn(
                    "font-bold text-sm",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {stepNumber}
                  </span>
                )}
              </motion.div>
              <span className={cn(
                "mt-3 text-[11px] uppercase tracking-wider font-bold hidden sm:block absolute top-12 whitespace-nowrap transition-colors duration-300",
                isActive ? "text-primary" : isCompleted ? "text-white" : "text-muted-foreground"
              )}>
                {label}
              </span>
            </div>
          )
        })}
      </div>
      <div className="relative -mt-5 h-1.5 w-full bg-white/5 rounded-full overflow-hidden z-0">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          initial={false}
          animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}
