import { GeneratedPrompt, ValidationResult } from "./types"

export function validatePrompt(prompt: GeneratedPrompt): ValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  const missingContext: string[] = [];
  let score = 100;

  if (prompt.contextString.includes('N/A')) {
    score -= 20;
    warnings.push("Prompt contains empty or missing context variables (N/A).");
    missingContext.push("Business Profile incomplete");
  }

  if (prompt.estimatedTokens < 50) {
    score -= 10;
    warnings.push("Prompt is unusually short and may lack detail.");
  } else if (prompt.estimatedTokens > 2000) {
    score -= 10;
    warnings.push("Prompt is very long, risking LLM attention loss.");
  }

  if (!prompt.fullPrompt.includes('[CONSTRAINTS]')) {
    score -= 30;
    errors.push("Missing Constraints section.");
  }

  let tokenStatus: "Optimal" | "Too Long" | "Too Short" = "Optimal";
  if (prompt.estimatedTokens > 2000) tokenStatus = "Too Long";
  if (prompt.estimatedTokens < 50) tokenStatus = "Too Short";

  return {
    score: Math.max(0, score),
    warnings,
    errors,
    missingContext,
    tokenStatus
  }
}
