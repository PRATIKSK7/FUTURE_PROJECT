"""
Health Check Router
Provides a simple endpoint to verify API uptime.
Belongs in apps/api/routers/
"""
from fastapi import APIRouter

router = APIRouter()

@router.get("/health", response_model=dict)
def health_check():
    """
    Returns the status of the API.
    Used by load balancers and deployment platforms.
    """
    return {"status": "ok"}
