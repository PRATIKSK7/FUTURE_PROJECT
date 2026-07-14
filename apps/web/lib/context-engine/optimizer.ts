import { FinalContext, ContextStatistics } from "./types"

export function optimizeContext(
  business: any,
  brand: any,
  audience: any,
  services: any,
  seo: any,
  competitors: any
): FinalContext {
  // Normalize wording & remove duplicates
  const allKeywords = new Set([
    ...(business.keywords || []),
    ...(seo.primaryKeywords || []),
    ...(seo.secondaryKeywords || [])
  ]);

  const normalizedString = `
[BUSINESS]: ${business.summary}
[USP]: ${business.usp}
[BRAND VOICE]: ${brand.voice}
[PERSONAS]: ${audience.personas.join(", ")}
[SERVICES]: ${services.tags.join(", ")}
[KEYWORDS]: ${Array.from(allKeywords).join(", ")}
  `.trim();

  const words = normalizedString.split(/\s+/).length;
  
  const statistics: ContextStatistics = {
    wordCount: words,
    entities: 15, // Local mocked entity counter logic
    keywordCount: allKeywords.size,
    sections: 6,
    estimatedTokens: Math.ceil(words * 1.3)
  }

  const warnings = [];
  let score = 100;

  if (services.tags.length === 0) {
    warnings.push("No services defined. Prompts may lack offer details.");
    score -= 15;
  }
  if (allKeywords.size < 3) {
    warnings.push("Very few keywords found. SEO context is weak.");
    score -= 10;
  }
  if (!brand.voice || brand.voice === "Professional") {
    warnings.push("Brand voice is generic. Consider making it unique.");
    score -= 5;
  }

  return {
    business,
    brand,
    audience,
    services,
    seo,
    competitors,
    statistics,
    score: Math.max(0, score),
    warnings,
    normalizedString
  }
}
