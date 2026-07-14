import { CheckCircle } from "lucide-react"

const POINTS = [
  { title: "Prompt Chaining", desc: "The platform doesn't use a single generic prompt. It dynamically chains Context -> Rules -> Templates to generate highly specific, hallucination-free output." },
  { title: "Context Engineering", desc: "Data collected from the wizard is normalized and structured before hitting the LLM, demonstrating advanced RAG and Context preparation concepts." },
  { title: "Validation Engine", desc: "Before any API call is made, the Prompt Validator scores the context and token length, demonstrating enterprise safety measures." },
  { title: "AI Streaming", desc: "Uses Server-Sent Events (SSE) bridging FastAPI and Next.js for a low-latency, typewriter-like UX instead of long blocking requests." },
  { title: "State Management Architecture", desc: "Demonstrates complex local state management using Zustand for the wizard, elegantly synchronizing with a React Query + PostgreSQL backend layer." }
]

export function RecruiterMode() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black mb-4 text-amber-500">Why This Project Stands Out</h2>
        <p className="text-muted-foreground">A guide for technical interviewers and engineering managers reviewing this platform.</p>
      </div>

      <div className="space-y-6">
        {POINTS.map((point, idx) => (
          <div key={idx} className="flex gap-4 p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CheckCircle className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-lg mb-2">{point.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{point.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
