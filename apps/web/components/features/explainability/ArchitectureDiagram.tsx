export function ArchitectureDiagram() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-muted/10 rounded-xl border border-dashed shadow-inner">
      <h3 className="font-semibold mb-8 text-xl">System Architecture Overview</h3>
      
      <div className="w-full max-w-3xl space-y-4 font-mono text-sm relative">
        <div className="bg-blue-500/10 border-2 border-blue-500/30 p-6 rounded-xl text-center shadow-md">
          <div className="font-bold text-blue-500 text-lg">Frontend (Next.js App Router)</div>
          <div className="text-xs font-normal mt-2 text-muted-foreground">React Server Components, TanStack Query, Framer Motion</div>
        </div>
        
        <div className="flex justify-center py-2">
          <div className="px-4 py-1 bg-muted rounded-full text-xs font-semibold text-muted-foreground">HTTP / Server-Sent Events (SSE)</div>
        </div>
        
        <div className="bg-green-500/10 border-2 border-green-500/30 p-6 rounded-xl text-center shadow-md">
          <div className="font-bold text-green-500 text-lg">Backend API (FastAPI)</div>
          <div className="text-xs font-normal mt-2 text-muted-foreground">Python, Pydantic Schemas, Dependency Injection, Service Layer</div>
        </div>
        
        <div className="flex justify-between px-16 py-2">
          <div className="px-4 py-1 bg-muted rounded-full text-xs font-semibold text-muted-foreground">SQLAlchemy ORM</div>
          <div className="px-4 py-1 bg-muted rounded-full text-xs font-semibold text-muted-foreground">gRPC / REST (SDK)</div>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-purple-500/10 border-2 border-purple-500/30 p-6 rounded-xl text-center shadow-md">
            <div className="font-bold text-purple-500 text-lg">Database (PostgreSQL)</div>
            <div className="text-xs font-normal mt-2 text-muted-foreground">Persistent Storage, UUIDs, Schema Relationships</div>
          </div>
          <div className="bg-amber-500/10 border-2 border-amber-500/30 p-6 rounded-xl text-center shadow-md">
            <div className="font-bold text-amber-500 text-lg">LLM (Gemini 1.5 Pro)</div>
            <div className="text-xs font-normal mt-2 text-muted-foreground">google-generativeai asynchronous streaming</div>
          </div>
        </div>
      </div>
    </div>
  )
}
