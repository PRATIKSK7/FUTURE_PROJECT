# Prompt Engineering Flow

At the core of CopyCraft AI is a sophisticated Prompt Engineering pipeline designed to extract the most accurate and high-converting copy from the Gemini model.

## 1. Context Aggregation
Before any prompt is generated, the `Context Engine` pulls all available data for the currently active project/business. 
- Target Audience
- Value Proposition
- Brand Voice guidelines
- Competitor Information

This data is normalized into a structured context block.

## 2. Module Selection
The user selects a "Prompt Module" (e.g., SEO Blog Post, Website Homepage, Email Sequence). Each module contains:
- A base prompt template
- Specific formatting instructions (e.g., Markdown, specific JSON structures)
- Role definitions ("Act as an expert copywriter...")

## 3. The Compilation Phase
The `Prompt Builder` merges the normalized business context with the selected module template. 
```text
[SYSTEM ROLE]
You are a world-class copywriter...

[BUSINESS CONTEXT]
Target Audience: {audience}
Brand Voice: {voice}
...

[TASK]
Write a high-converting {module_name} based strictly on the above context.
```

## 4. Execution & Streaming
The compiled prompt is dispatched to the Gemini API. The response is streamed back to the client in real-time, parsed for markdown structure, and rendered into the interactive Document Workspace.
