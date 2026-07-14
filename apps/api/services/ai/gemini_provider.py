"""
Gemini Provider Implementation
Connects to Google's Gemini API for streaming generation using the new google-genai SDK.
"""
import logging
import json
from typing import AsyncGenerator
from .provider import AIProvider
from .exceptions import AIProviderError
from core.config import get_settings
from google import genai
from google.genai.errors import APIError

logger = logging.getLogger(__name__)

class GeminiProvider(AIProvider):
    def __init__(self):
        settings = get_settings()
        self.api_key = settings.GEMINI_API_KEY
        if not self.api_key:
            raise RuntimeError("Missing GEMINI_API_KEY. Please configure your .env file.")
        
        self.client = genai.Client(api_key=self.api_key)
        self.model_name = settings.GEMINI_MODEL

    async def generate_stream(self, prompt: str, context: str) -> AsyncGenerator[str, None]:
        full_prompt = f"System Context:\n{context}\n\nTask:\n{prompt}"
        
        try:
            logger.info(f"Generating content using {self.model_name} with google-genai SDK")
            
            import asyncio
            max_retries = 3
            for attempt in range(max_retries):
                try:
                    response_stream = await self.client.aio.models.generate_content_stream(
                        model=self.model_name,
                        contents=full_prompt
                    )
                    async for chunk in response_stream:
                        if chunk.text:
                            yield chunk.text
                    break # Success, exit retry loop
                except Exception as e:
                    if attempt < max_retries - 1 and (isinstance(e, APIError) and getattr(e, 'code', 500) >= 500 or "429" in str(e)):
                        logger.warning(f"Gemini generation failed (attempt {attempt + 1}), retrying: {e}")
                        await asyncio.sleep(2 ** attempt) # Exponential backoff
                    else:
                        raise e
        except APIError as e:
            logger.error(f"Gemini APIError - Code: {e.code}, Message: {e.message}", exc_info=True)
            yield json.dumps({
                "success": False,
                "provider": "Google Gemini",
                "status": getattr(e, 'code', 400),
                "code": "API_KEY_INVALID" if "API_KEY_INVALID" in str(e.message) else "API_ERROR",
                "message": "Authentication with Google Gemini failed." if "API_KEY_INVALID" in str(e.message) else str(e.message),
                "details": "Verify SDK compatibility, endpoint, and API key configuration."
            })
        except Exception as e:
            error_str = str(e)
            logger.error(f"Gemini API Error: {error_str}", exc_info=True)
            yield f"\n\n[Generation Failed: {error_str}]"
