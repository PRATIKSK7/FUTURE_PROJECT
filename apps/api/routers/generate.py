"""
Generation Router
Handles AI generation endpoints using StreamingResponse.
"""
from core.security import require_workspace_access
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from services.ai.gemini_provider import GeminiProvider
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class GenerateRequest(BaseModel):
    businessContext: str
    prompt: str
    module: str

@router.post("")
async def generate_content(
    request: GenerateRequest,
    workspace_id: str = Depends(require_workspace_access)
):
    provider = GeminiProvider()
    
    async def event_generator():
        try:
            async for chunk in provider.generate_stream(request.prompt, request.businessContext):
                yield chunk
        except Exception as e:
            logger.error(f"Generation error: {e}")
            yield f"Error: Generation failed due to internal issue."

    return StreamingResponse(event_generator(), media_type="text/plain")
