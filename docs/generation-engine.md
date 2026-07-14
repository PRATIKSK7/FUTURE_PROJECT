# AI Generation Engine

The Generation Engine is the interactive workspace where the prompt engineering meets the user interface.

## Resizable Workspace
The UI is divided into a three-pane layout using `react-resizable-panels`:
1. **Prompt Engine (Left, 35%):** Displays available modules, token estimates, and the real-time compiled prompt preview.
2. **Document Editor (Center, 45%):** The main canvas where the AI streams its response. Users can live-edit the generated markdown blocks.
3. **Quality Sidebar (Right, 20%):** A specialized panel that analyzes the generated text for SEO score, readability, and CTA strength.

## Streaming Architecture
- Leverages the Vercel AI SDK to handle streaming responses from the backend Next.js API route.
- As chunks arrive, they are parsed by a custom markdown tokenizer (`parseSections`) to split the document into editable `SectionCards`.
- The user can interrupt the generation at any time using the "Stop Generation" action.
