export interface AnalyzedBusiness {
  summary: string;
  category: string;
  primaryGoals: string[];
  usp: string;
  strengths: string[];
  weaknesses: string[];
  keywords: string[];
}

export interface AnalyzedBrand {
  identity: string;
  personality: string;
  voice: string;
  tone: string;
  trustSignals: string[];
  customerPromise: string;
}

export interface AnalyzedAudience {
  personas: string[];
  painPoints: string[];
  goals: string[];
  motivation: string;
  travelStyle: string;
  budgetLevel: string;
  demographics: string;
}

export interface AnalyzedServices {
  categories: string[];
  hierarchy: Record<string, any>;
  premiumServices: string[];
  tags: string[];
}

export interface AnalyzedSEO {
  primaryKeywords: string[];
  secondaryKeywords: string[];
  localKeywords: string[];
  intentKeywords: string[];
  contentOpportunities: string[];
}

export interface AnalyzedCompetitors {
  competitorsList: any[];
  marketPosition: string;
  differentiators: string[];
}

export interface ContextStatistics {
  wordCount: number;
  entities: number;
  keywordCount: number;
  sections: number;
  estimatedTokens: number;
}

export interface FinalContext {
  business: AnalyzedBusiness;
  brand: AnalyzedBrand;
  audience: AnalyzedAudience;
  services: AnalyzedServices;
  seo: AnalyzedSEO;
  competitors: AnalyzedCompetitors;
  statistics: ContextStatistics;
  score: number;
  warnings: string[];
  normalizedString: string;
}
