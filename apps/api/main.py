"""
Application Factory and Entry Point
Creates and configures the FastAPI application instance.
Belongs in apps/api/
"""
from fastapi import FastAPI
from core.config import get_settings
from core.logger import logger
from core.middleware import register_middleware
from routers import api_router

settings = get_settings()

def create_app() -> FastAPI:
    """Application factory for FastAPI."""
    logger.info("Initializing CopyCraft AI API...")
    
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        description="Enterprise API for CopyCraft AI Website Content Generation"
    )
    
    if not settings.GEMINI_API_KEY:
        raise RuntimeError("Missing GEMINI_API_KEY. Please configure your .env file.")
    
    # Auto-create database tables
    logger.info("Verifying database models...")
    from database.connection import engine, Base
    import database.models  # Required for declarative_base to map tables
    Base.metadata.create_all(bind=engine)
    
    # Configure Middleware
    register_middleware(app)
    
    # Register Routers
    app.include_router(api_router, prefix=settings.API_V1_STR)
    
    return app

app = create_app()
