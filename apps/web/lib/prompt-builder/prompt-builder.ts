import { buildContext, formatContextString } from "./context-builder"
import { promptTemplates } from "./templates"
import { GeneratedPrompt } from "./types"

export function generatePrompts(project?: any): GeneratedPrompt[] {
  const context = buildContext(project);
  const contextString = formatContextString(context);

  return promptTemplates.map(template => {
    const fullPrompt = `
[SYSTEM ROLE]
${template.systemRole}

[OBJECTIVE]
${template.objective}

[CONTEXT]
${contextString}

[CONSTRAINTS]
${template.constraints.map(c => `- ${c}`).join('\n')}

[OUTPUT FORMAT]
${template.outputFormat}

[EXAMPLES]
${template.examples}
`.trim();

    // Rough estimation: 1 word ≈ 1.3 tokens
    const estimatedTokens = Math.ceil(fullPrompt.split(/\s+/).length * 1.3);

    return {
      ...template,
      contextString,
      fullPrompt,
      estimatedTokens
    }
  });
}
