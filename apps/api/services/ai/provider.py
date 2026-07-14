"""
AI Provider Interface
Abstract base class for AI Generation implementations.
"""
from abc import ABC, abstractmethod
from typing import AsyncGenerator

class AIProvider(ABC):
    @abstractmethod
    async def generate_stream(self, prompt: str, context: str) -> AsyncGenerator[str, None]:
        """
        Generates content from the LLM and streams the response.
        """
        pass
