"""
AI Provider Exceptions
Custom exceptions for AI Generation failures.
"""

class AIProviderError(Exception):
    """Base exception for AI provider errors."""
    pass

class AIRateLimitError(AIProviderError):
    """Exception for rate limiting."""
    pass

class AIConnectionError(AIProviderError):
    """Exception for connection failures."""
    pass
