import { useBusinessStore } from "@/lib/business-store"
import { analyzeBusiness, analyzeBrand, analyzeAudience, analyzeServices, analyzeSEO, analyzeCompetitors } from "./analyzers"
import { optimizeContext } from "./optimizer"
import { FinalContext } from "./types"

export function runContextEngine(): FinalContext {
  const state = useBusinessStore.getState();
  
  const b = analyzeBusiness(state.businessInfo);
  const br = analyzeBrand(state.brandIdentity);
  const a = analyzeAudience(state.targetAudience);
  const s = analyzeServices(state.services);
  const seo = analyzeSEO(state.seoInfo);
  const c = analyzeCompetitors(state.competitors);

  return optimizeContext(b, br, a, s, seo, c);
}
