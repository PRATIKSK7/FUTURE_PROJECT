import logging
import time
from typing import Callable
from fastapi import Request, Response

# Structured Logging Setup
logger = logging.getLogger("copycraft.api")
logger.setLevel(logging.INFO)

# Placeholder for Error Tracking (e.g., Sentry)
def capture_exception(e: Exception, context: dict = None):
    """
    Placeholder for third-party error tracking integration.
    Do not implement external SDKs until Phase 2.
    """
    logger.error(f"Captured Exception: {str(e)}", extra={"context": context})

# Placeholder for Performance Monitoring (e.g., Datadog, New Relic)
async def performance_monitoring_middleware(request: Request, call_next: Callable) -> Response:
    """
    Middleware placeholder to track Request Latency for observability platforms.
    """
    start_time = time.time()
    
    try:
        response = await call_next(request)
        process_time = time.time() - start_time
        # In the future, send process_time to APM platform here
        logger.info(f"Request: {request.method} {request.url.path} - Latency: {process_time:.4f}s")
        return response
    except Exception as e:
        process_time = time.time() - start_time
        logger.error(f"Request Failed: {request.method} {request.url.path} - Latency: {process_time:.4f}s")
        capture_exception(e, context={"path": request.url.path})
        raise e
