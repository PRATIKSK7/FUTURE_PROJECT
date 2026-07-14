import { Button } from "@/components/ui/button"
import { Download, Copy, Save, FileCode2, Loader2, Check } from "lucide-react"
import { useState } from "react"
import { marked } from "marked"

export function EditorToolbar({ 
  isGenerating, 
  hasUnsavedChanges, 
  onSave,
  isSaving = false,
  content = ""
}: { 
  isGenerating: boolean, 
  hasUnsavedChanges: boolean,
  onSave?: () => void,
  isSaving?: boolean,
  content?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy", err)
    }
  }

  const handleDownloadMarkdown = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `copycraft-export-${new Date().getTime()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadHTML = async () => {
    const htmlContent = await marked.parse(content)
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>CopyCraft Export</title>
<style>
  body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; }
  h1, h2, h3 { color: #111; }
  code { background: #f4f4f4; padding: 2px 5px; border-radius: 4px; }
  pre { background: #f4f4f4; padding: 15px; border-radius: 8px; overflow-x: auto; }
</style>
</head>
<body>
${htmlContent}
</body>
</html>`
    const blob = new Blob([fullHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `copycraft-export-${new Date().getTime()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10 glass-panel sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <h3 className="font-bold text-sm flex items-center gap-2 text-white">
          <FileCode2 className="h-4 w-4 text-primary" /> AI Document Editor
        </h3>
        {hasUnsavedChanges && (
          <span className="text-[10px] uppercase tracking-wider bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full font-bold border border-amber-500/20">
            Unsaved
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs gap-1.5" onClick={handleCopy} disabled={!content || isGenerating}>
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />} 
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button variant="ghost" size="sm" className="h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs gap-1.5" onClick={handleDownloadMarkdown} disabled={!content || isGenerating}>
          <Download className="h-3.5 w-3.5" /> .md
        </Button>
        <Button variant="ghost" size="sm" className="h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs gap-1.5" onClick={handleDownloadHTML} disabled={!content || isGenerating}>
          <Download className="h-3.5 w-3.5" /> .html
        </Button>
        <Button 
          size="sm" 
          className="h-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 rounded-lg text-xs gap-1.5 shadow-lg shadow-primary/20" 
          disabled={isGenerating || isSaving || !content || !hasUnsavedChanges}
          onClick={onSave}
        >
          {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          {isSaving ? "Saving..." : "Save Draft"}
        </Button>
      </div>
    </div>
  )
}
