# Google Gemini Integration

CopyCraft AI uses the state-of-the-art Google Gemini LLM for all text generation tasks.

## Setup
The application connects to Gemini using the official `@google/genai` SDK alongside the `ai` (Vercel AI SDK) for standardized streaming.

## Prompts & Safety
- **System Instructions:** Gemini is configured with a strict system instruction to act as an elite copywriter.
- **Temperature & Top-K:** Generation is tuned for creativity but restrained enough to maintain brand consistency (e.g., Temperature: 0.7).
- **Safety Settings:** Default safety thresholds are applied to prevent the generation of harmful or inappropriate content.

## Implementation Details
The backend route `/api/generate` receives the `systemPrompt` and `userMessage`. It initiates a `streamText` request to `gemini-2.5-pro` (or `gemini-2.5-flash` depending on the complexity of the module) and returns a streaming `Response` object to the client, minimizing Time-To-First-Token (TTFT).
