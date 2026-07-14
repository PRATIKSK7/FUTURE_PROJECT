"""
Router Registration Module
Aggregates all API routers into a single APIRouter.
Belongs in apps/api/routers/
"""
from fastapi import APIRouter
from routers.health import router as health_router
from routers.generate import router as generate_router
from routers.projects import router as projects_router

api_router = APIRouter()

# Include individual feature routers here
api_router.include_router(health_router, tags=["Health"])
api_router.include_router(generate_router, prefix="/generate", tags=["AI Generation"])
api_router.include_router(projects_router)
