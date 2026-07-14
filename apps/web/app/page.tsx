import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, FileText, ChevronRight, BarChart3, Brain } from "lucide-react";

export default async function RootPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/projects");
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "linear-gradient(135deg, #0B1220 0%, #111827 50%, #0B1220 100%)" }}>
      {/* Header */}
      <header className="px-6 h-20 flex items-center border-b border-white/5 backdrop-blur-xl sticky top-0 z-50">
        <Link className="flex items-center gap-3" href="#">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">CopyCraft AI</span>
        </Link>
        <nav className="ml-auto flex gap-6 items-center">
          <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl transition-all border border-white/10" href="/sign-in">
            Sign In
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-32 lg:py-48 flex justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-slate-400">
                <Sparkles className="h-4 w-4 text-blue-400" />
                Powered by Google Gemini 2.5
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter max-w-4xl leading-[0.9]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-400">
                  Enterprise{" "}
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                  Prompt Engineering
                </span>
              </h1>
              
              <p className="mx-auto max-w-[700px] text-slate-400 text-lg md:text-xl leading-relaxed">
                Transform your business context into high-converting copy in seconds. 
                Advanced contextual prompting. Zero hallucinations. Enterprise-grade output.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  className="inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:scale-105 gap-2"
                  href="/sign-up"
                >
                  Start Building Free <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  className="inline-flex h-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 px-8 text-base font-bold text-white transition-all hover:bg-white/10 gap-2"
                  href="#features"
                >
                  See Features <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section id="features" className="w-full py-32 flex justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Everything you need</h2>
              <p className="text-slate-400 text-lg max-w-[600px] mx-auto">
                A complete prompt engineering platform for agencies and freelancers.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Brain, title: "Context Engine", desc: "Upload your brand guidelines and target audience. We build prompts that never hallucinate.", gradient: "from-blue-500 to-cyan-500" },
                { icon: Zap, title: "Google Gemini", desc: "Lightning fast streaming generation powered by the latest Gemini 2.5 models.", gradient: "from-purple-500 to-pink-500" },
                { icon: Shield, title: "Enterprise Export", desc: "Export to clean Markdown, semantic HTML, or rich text with one click.", gradient: "from-emerald-500 to-teal-500" },
                { icon: FileText, title: "Draft Management", desc: "Save, version, and track all your generated content across projects.", gradient: "from-amber-500 to-orange-500" },
                { icon: BarChart3, title: "Analytics", desc: "Monitor generation counts, token usage, and prompt performance in real time.", gradient: "from-rose-500 to-red-500" },
                { icon: Sparkles, title: "AI Insights", desc: "Quality scores, SEO analysis, and brand consistency checks on every output.", gradient: "from-indigo-500 to-violet-500" },
              ].map((feature, i) => (
                <div key={i} className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all hover:bg-white/10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-slate-500">© 2026 CopyCraft AI. All rights reserved. v1.0.0</span>
          </div>
          <nav className="flex gap-6">
            <Link className="text-sm text-slate-500 hover:text-white transition-colors" href="#">Terms</Link>
            <Link className="text-sm text-slate-500 hover:text-white transition-colors" href="#">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
