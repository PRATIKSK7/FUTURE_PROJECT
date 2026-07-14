"""
Custom Logging Module
Configures structured logging for the FastAPI application.
Belongs in apps/api/core/
"""
import logging
import sys

def setup_logger(name: str = "copycraft") -> logging.Logger:
    """Configures and returns a standard logger."""
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        formatter = logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        
    return logger

logger = setup_logger()
