"use client"

import { useBusinessStore } from "@/lib/business-store"
import { Stepper } from "./Stepper"
import { BusinessForm } from "./forms/BusinessForm"
import { BrandForm } from "./forms/BrandForm"
import { AudienceForm } from "./forms/AudienceForm"
import { ServicesManager } from "./forms/ServicesManager"
import { CompetitorManager } from "./forms/CompetitorManager"
import { SEOForm } from "./forms/SEOForm"
import { ReviewScreen } from "./ReviewScreen"
import { Card, CardContent } from "@/components/ui/card"
import { Save, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function BusinessWizard() {
  const { step } = useBusinessStore()

  const renderStep = () => {
    switch (step) {
      case 1: return <BusinessForm />
      case 2: return <BrandForm />
      case 3: return <AudienceForm />
      case 4: return <ServicesManager />
      case 5: return <CompetitorManager />
      case 6: return <SEOForm />
      case 7: return <ReviewScreen />
      default: return <BusinessForm />
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Business Information"
      case 2: return "Brand Identity"
      case 3: return "Target Audience"
      case 4: return "Business Services"
      case 5: return "Competitors"
      case 6: return "SEO Information"
      case 7: return "Final Review"
      default: return ""
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 p-6 glass-panel rounded-2xl border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12">
          <Sparkles className="h-24 w-24 text-primary" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight text-white mb-2">Create Business Profile</h2>
          <p className="text-muted-foreground text-lg">Define the context for the AI Prompt Engine.</p>
        </div>
        <div className="flex flex-col md:items-end gap-2 relative z-10">
          <div className="flex items-center text-xs text-primary font-medium gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            <Save className="h-3.5 w-3.5" /> Auto-saving to local state
          </div>
          <button 
            onClick={() => useBusinessStore.getState().resetStore()}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors px-2"
          >
            Clear Draft
          </button>
        </div>
      </motion.div>

      <div className="bg-transparent border-none">
        <div className="p-0">
          <Stepper />
          <div className="mt-8 relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="glass rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-10"
              >
                <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
                    {step}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{getStepTitle()}</h3>
                </div>
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
