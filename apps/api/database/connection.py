"""
Database Connection Module
Configures the SQLAlchemy engine and session factory.
Belongs in apps/api/database/
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from core.config import get_settings

settings = get_settings()

# Engine establishes the connection pool
engine = create_engine(
    settings.DATABASE_URL, 
    pool_pre_ping=True,
    echo=(settings.ENVIRONMENT == "development")
)

# SessionLocal is the factory for creating database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for SQLAlchemy models
Base = declarative_base()
