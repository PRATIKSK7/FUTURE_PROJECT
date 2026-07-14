import { AnalyzedBusiness, AnalyzedBrand, AnalyzedAudience, AnalyzedServices, AnalyzedSEO, AnalyzedCompetitors } from "./types"

export function analyzeBusiness(data: any): AnalyzedBusiness {
  const name = data?.name || "Unknown Business";
  const category = data?.category || "Uncategorized";
  return {
    summary: `${name} is a ${category} operating in ${data?.location || 'various locations'}.`,
    category,
    primaryGoals: ["Increase bookings", "Build local trust"],
    usp: data?.usp || "Standard service provider",
    strengths: [category, "Local expertise"],
    weaknesses: ["Needs digital presence expansion"],
    keywords: [name, category, data?.location].filter(Boolean) as string[]
  }
}

export function analyzeBrand(data: any): AnalyzedBrand {
  return {
    identity: data?.mission || "Core mission undefined",
    personality: data?.voice || "Professional",
    voice: data?.voice || "Professional",
    tone: "Authoritative yet approachable",
    trustSignals: ["Years of experience", "Verified service"],
    customerPromise: "Delivering exceptional travel experiences."
  }
}

export function analyzeAudience(data: any): AnalyzedAudience {
  const types = (data?.customerTypes || "").split(",").map((s: string) => s.trim()).filter(Boolean);
  return {
    personas: types.length > 0 ? types : ["General Travelers"],
    painPoints: (data?.painPoints || "").split(",").map((s: string) => s.trim()).filter(Boolean),
    goals: (data?.goals || "").split(",").map((s: string) => s.trim()).filter(Boolean),
    motivation: "Seeking hassle-free and memorable experiences.",
    travelStyle: "Varied (Based on budget)",
    budgetLevel: data?.budgetRange || "Standard",
    demographics: data?.ageGroups || "All ages"
  }
}

export function analyzeServices(services: any[]): AnalyzedServices {
  const tags = services.map(s => s.name).filter(Boolean);
  const premium = services.filter(s => s.priceRange?.includes("1000") || s.priceRange?.includes("2000")).map(s => s.name).filter(Boolean);
  return {
    categories: tags,
    hierarchy: { core: tags },
    premiumServices: premium,
    tags: tags
  }
}

export function analyzeSEO(data: any): AnalyzedSEO {
  const primary = (data?.primaryKeywords || "").split(",").map((s: string) => s.trim()).filter(Boolean);
  const secondary = (data?.secondaryKeywords || "").split(",").map((s: string) => s.trim()).filter(Boolean);
  const areas = (data?.serviceAreas || "").split(",").map((s: string) => s.trim()).filter(Boolean);
  
  return {
    primaryKeywords: primary,
    secondaryKeywords: secondary,
    localKeywords: areas,
    intentKeywords: ["book", "best", "top", "guide"],
    contentOpportunities: ["Destination Guides", "Travel Tips"]
  }
}

export function analyzeCompetitors(competitors: any[]): AnalyzedCompetitors {
  return {
    competitorsList: competitors,
    marketPosition: "Emerging/Competitive",
    differentiators: competitors.map(c => c.weaknesses).filter(Boolean)
  }
}
