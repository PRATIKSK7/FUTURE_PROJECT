import { useBusinessStore } from "@/lib/business-store"
import { PromptContext } from "./types"

export function buildContext(project?: any): PromptContext {
  // If project is provided from the backend, use its profiles
  if (project) {
    return {
      business: project.business_profile || {},
      brand: project.brand_profile || {},
      audience: project.audience_profile || {},
      services: project.services || [],
      competitors: project.competitors || [],
      seo: project.seo_profile || {}
    }
  }

  // Fallback to Zustand store for preview during creation (if ever needed)
  const state = useBusinessStore.getState();
  return {
    business: state.businessInfo || {},
    brand: state.brandIdentity || {},
    audience: state.targetAudience || {},
    services: state.services || [],
    competitors: state.competitors || [],
    seo: state.seoInfo || {}
  }
}

export function formatContextString(context: PromptContext): string {
  return `
--- BUSINESS PROFILE ---
Business Name: ${context.business.name || 'N/A'}
Category: ${context.business.category || 'N/A'}
Location: ${context.business.location || 'N/A'}
Website: ${context.business.website || 'N/A'}

--- BRAND IDENTITY ---
Mission: ${context.brand.mission || 'N/A'}
Vision: ${context.brand.vision || 'N/A'}
Unique Selling Proposition (USP): ${context.brand.usp || 'N/A'}
Tone of Voice: ${context.brand.voice || 'N/A'}

--- TARGET AUDIENCE ---
Primary Customer Types: ${context.audience.customerTypes || 'N/A'}
Age Groups: ${context.audience.ageGroups || 'N/A'}
Budget Range: ${context.audience.budgetRange || 'N/A'}
Customer Preferences: ${context.audience.preferences || 'N/A'}
Pain Points: ${context.audience.painPoints || 'N/A'}
Goals & Desires: ${context.audience.goals || 'N/A'}

--- SEO & DISCOVERABILITY ---
Primary Keywords: ${context.seo.primaryKeywords || 'N/A'}
Secondary Keywords: ${context.seo.secondaryKeywords || 'N/A'}
Target Service Areas: ${context.seo.serviceAreas || 'N/A'}

--- SERVICES OFFERED ---
${context.services && context.services.length > 0 ? context.services.map(s => `- ${s.name}: ${s.description} (Price: ${s.price_range || s.priceRange || 'N/A'})`).join('\n') : 'N/A'}

--- COMPETITOR CONTEXT ---
${context.competitors && context.competitors.length > 0 ? context.competitors.map(c => `- ${c.name}: Strengths (${c.strengths}), Weaknesses (${c.weaknesses})`).join('\n') : 'None specified'}
`.trim();
}
