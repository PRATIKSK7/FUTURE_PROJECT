/*
API Client
Centralized fetching logic to communicate with the FastAPI backend.
Belongs in apps/web/lib/
*/
import { env } from "@/config/env";

export const apiClient = {
  async getHealth() {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/health`);
    if (!res.ok) throw new Error("API health check failed");
    return res.json();
  }
};
