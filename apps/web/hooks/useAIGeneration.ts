import { useState, useRef } from "react"
import { env } from "@/config/env"
import { useAuth } from "@clerk/nextjs"

export function useAIGeneration() {
  const [content, setContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const { getToken } = useAuth()

  const generate = async (businessContext: string, prompt: string, module: string) => {
    setContent("")
    setError(null)
    setIsGenerating(true)
    
    abortControllerRef.current = new AbortController()

    try {
      const token = await getToken()
      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/generate`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "x-workspace-id": "default"
        },
        body: JSON.stringify({ businessContext, prompt, module }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error("Failed to connect to AI engine.")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      
      if (!reader) throw new Error("No reader stream")

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        
        // Attempt to parse JSON error from chunk
        try {
          const parsed = JSON.parse(chunk)
          if (parsed && parsed.success === false && parsed.error) {
            throw new Error(parsed.error)
          }
        } catch (e) {
          // If it's a JSON.parse error, it's just normal text content
          if (e instanceof SyntaxError) {
            setContent(prev => prev + chunk)
          } else {
            throw e
          }
        }
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        setError("Generation cancelled.")
      } else {
        setError(err.message || "An unexpected error occurred.")
      }
    } finally {
      setIsGenerating(false)
      abortControllerRef.current = null
    }
  }

  const cancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }

  return { content, isGenerating, error, generate, cancel }
}
