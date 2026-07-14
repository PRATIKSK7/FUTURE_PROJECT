# Prompt Engineering in CopyCraft AI

This document details the internal intelligence layer that drives CopyCraft AI's high-quality LLM outputs. 

## 1. Prompt Philosophy
Standard chatbot interfaces rely on "zero-shot" or highly variable user inputs. CopyCraft AI rejects this in favor of **Deterministic Prompting**. The user never types a direct command to the LLM. Instead, the user provides structured business data, and our engine dynamically constructs the prompt using heavily tested templates.

## 2. Context Injection
Before reaching the Prompt Builder, raw data passes through the **Context Intelligence Engine**.

**Example Flow (Blue Ribbon Travel):**
1. *Raw Input*: "we sell flights to hawaii and luxury resorts"
2. *Context Engine*: Normalizes to `{"category": "Luxury Travel", "keywords": ["Hawaii flights", "luxury resorts"]}`
3. *Injection*: The structured JSON is safely substituted into the Prompt Template.

## 3. Prompt Chaining
CopyCraft AI breaks massive generation tasks into smaller, chained prompts to prevent LLM hallucination and "lazy" generation.

**Chain Sequence:**
1. **Structure Prompt**: "Define the H1, H2s, and layout for a Luxury Travel homepage."
2. **Content Prompt**: "Write the hero copy for the H1 defined previously, emphasizing Hawaii."
3. **SEO Prompt**: "Generate meta descriptions based on the hero copy."

## 4. Prompt Validation & Token Management
Before any prompt is dispatched to the Gemini API, it runs through the **Prompt Validator**.
- **Token Estimation**: We use a heuristic (`word_count * 1.3`) to estimate tokens.
- **Constraint Checks**: If a prompt exceeds Gemini 1.5 Pro's context window thresholds (or our predefined budget constraints), the generation is blocked and an error is returned.

## 5. Explainability
We believe Prompt Engineering should not be a black box. The **Explainability Dashboard** allows users to inspect exactly how their business profile was transformed into the final prompt dispatched to the LLM. This builds trust and demonstrates the platform's enterprise value.
