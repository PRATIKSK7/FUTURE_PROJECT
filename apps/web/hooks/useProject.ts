import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@clerk/nextjs"
import { env } from "@/config/env"

// Centralized helper to attach Clerk JWT and Workspace ID
async function getAuthHeaders(getToken: (options?: any) => Promise<string | null>, workspaceId: string, skipCache = false) {
  const token = await getToken({ skipCache })
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "x-workspace-id": workspaceId
  }
}

// Wrapper for fetch that automatically retries on 401 Unauthorized with a fresh token
async function fetchWithAuth(url: string, options: RequestInit, getToken: (options?: any) => Promise<string | null>, workspaceId: string) {
  let headers = await getAuthHeaders(getToken, workspaceId)
  let res = await fetch(url, { ...options, headers })
  
  if (res.status === 401) {
    // Token might be expired/invalid, force a fresh token fetch
    console.log("401 Unauthorized encountered. Fetching fresh token and retrying...")
    headers = await getAuthHeaders(getToken, workspaceId, true)
    res = await fetch(url, { ...options, headers })
  }
  return res
}

export function useProjects(search = "", workspaceId: string = "default") {
  const { getToken } = useAuth()
  
  return useQuery({
    queryKey: ['projects', search, workspaceId],
    queryFn: async () => {
      const res = await fetchWithAuth(`${env.NEXT_PUBLIC_API_URL}/api/v1/projects?workspace_id=${workspaceId}&search=${encodeURIComponent(search)}`, {}, getToken, workspaceId)
      if (!res.ok) throw new Error("Failed to fetch projects")
      const data = await res.json()
      console.log("FETCHED PROJECTS:", JSON.stringify(data, null, 2))
      return data
    },
    enabled: !!workspaceId
  })
}

export function useProject(id: string, workspaceId: string = "default") {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['projects', id, workspaceId],
    queryFn: async () => {
      const res = await fetchWithAuth(`${env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`, {}, getToken, workspaceId)
      if (!res.ok) throw new Error("Failed to fetch project")
      return res.json()
    },
    enabled: !!id && !!workspaceId
  })
}

export function useCreateProject(workspaceId: string = "default") {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetchWithAuth(`${env.NEXT_PUBLIC_API_URL}/api/v1/projects`, {
        method: "POST",
        body: JSON.stringify(payload)
      }, getToken, workspaceId)
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || "Failed to create project")
      }
      return res.json()
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
  })
}

export function useUpdateProject(id: string, workspaceId: string = "default") {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetchWithAuth(`${env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
      }, getToken, workspaceId)
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || "Failed to update project")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', id] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()
  const workspaceId = "default"
  
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetchWithAuth(`${env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`, {
        method: "DELETE",
      }, getToken, workspaceId)
      if (!res.ok) throw new Error("Failed to delete project")
      return true
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
  })
}

export function useCloneProject() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()
  const workspaceId = "default"
  
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetchWithAuth(`${env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}/clone`, {
        method: "POST",
      }, getToken, workspaceId)
      if (!res.ok) throw new Error("Failed to clone project")
      return res.json()
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
  })
}

export function useSaveDraft(projectId: string, workspaceId: string = "default") {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (payload: { module_name: string; content: string; metrics?: any }) => {
      const res = await fetchWithAuth(`${env.NEXT_PUBLIC_API_URL}/api/v1/projects/${projectId}/content`, {
        method: "POST",
        body: JSON.stringify(payload)
      }, getToken, workspaceId)
      
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || "Failed to save draft")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generated_content', projectId] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })
}

export function useGeneratedContent(projectId: string, workspaceId: string = "default") {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['generated_content', projectId, workspaceId],
    queryFn: async () => {
      const res = await fetchWithAuth(`${env.NEXT_PUBLIC_API_URL}/api/v1/projects/${projectId}/content`, {}, getToken, workspaceId)
      if (!res.ok) throw new Error("Failed to fetch generated content")
      return res.json()
    },
    enabled: !!projectId && !!workspaceId
  })
}
