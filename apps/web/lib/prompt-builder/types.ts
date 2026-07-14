export interface PromptContext {
  business: any;
  brand: any;
  audience: any;
  services: any[];
  competitors: any[];
  seo: any;
}

export interface PromptTemplate {
  id: string;
  name: string;
  systemRole: string;
  objective: string;
  constraints: string[];
  outputFormat: string;
  examples: string;
}

export interface GeneratedPrompt extends PromptTemplate {
  contextString: string;
  fullPrompt: string;
  estimatedTokens: number;
}

export interface ValidationResult {
  score: number;
  warnings: string[];
  errors: string[];
  missingContext: string[];
  tokenStatus: "Optimal" | "Too Long" | "Too Short";
}
