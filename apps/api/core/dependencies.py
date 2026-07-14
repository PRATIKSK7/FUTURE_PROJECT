"""
Dependency Injection Module
Provides shared dependencies like database sessions to route handlers.
Belongs in apps/api/core/
"""
from typing import Generator
from sqlalchemy.orm import Session
from database.connection import SessionLocal

def get_db() -> Generator[Session, None, None]:
    """
    Yields a database session and ensures it is closed after the request.
    Use as a FastAPI Depends().
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
