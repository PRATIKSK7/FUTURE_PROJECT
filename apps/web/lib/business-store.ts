import { create } from 'zustand'

export interface Service {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  duration: string;
  uniqueBenefit: string;
}

export interface Competitor {
  id: string;
  website: string;
  strengths: string;
  weaknesses: string;
}

interface BusinessState {
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;
  
  businessInfo: any;
  brandIdentity: any;
  targetAudience: any;
  services: Service[];
  competitors: Competitor[];
  seoInfo: any;

  updateData: (section: keyof Omit<BusinessState, 'step' | 'setStep' | 'nextStep' | 'prevStep' | 'updateData' | 'activeProjectId' | 'setActiveProjectId'>, data: any) => void;
  resetStore: () => void;
}

import { persist } from 'zustand/middleware'

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set) => ({
      step: 1,
      setStep: (step) => set({ step }),
      nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 7) })),
      prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
      
      activeProjectId: null,
      setActiveProjectId: (id) => set({ activeProjectId: id }),
      
      businessInfo: {},
      brandIdentity: {},
      targetAudience: {},
      services: [{
        id: "1",
        name: "",
        description: "",
        priceRange: "",
        duration: "",
        uniqueBenefit: ""
      }],
      competitors: [],
      seoInfo: {},

      updateData: (section, data) => set((state) => ({ [section]: data })),
      
      resetStore: () => set({
        step: 1,
        activeProjectId: null,
        businessInfo: {},
        brandIdentity: {},
        targetAudience: {},
        services: [{ id: "1", name: "", description: "", priceRange: "", duration: "", uniqueBenefit: "" }],
        competitors: [],
        seoInfo: {}
      })
    }),
    {
      name: 'copycraft-active-project-storage',
    }
  )
)
