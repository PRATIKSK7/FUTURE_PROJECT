"""
Authentication Module
Validates Clerk JWT tokens and resolves the current User.
"""
import os
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from core.dependencies import get_db
from database.models import User, Workspace, WorkspaceMember

security = HTTPBearer()

# Retrieve settings properly instead of os.getenv
from core.config import get_settings

def get_clerk_issuer() -> str:
    return get_settings().CLERK_ISSUER_URL

def verify_clerk_token(token: str) -> dict:
    """
    Implements Clerk's recommended JWT verification flow using JWKS.
    Gracefully falls back to mock payload if real credentials are not provided in the environment.
    """
    if not token or token == "undefined" or token == "null":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    issuer = get_clerk_issuer()
        
    try:
        jwks_url = f"{issuer}/.well-known/jwks.json"
        # Fetch dynamic public keys from Clerk
        jwks_client = jwt.PyJWKClient(jwks_url)
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        
        # Log unverified claims for audit
        import logging
        logger = logging.getLogger(__name__)
        try:
            unverified_payload = jwt.decode(token, options={"verify_signature": False})
            logger.info(f"Auth Audit - JWT issuer: {unverified_payload.get('iss')}")
            logger.info(f"Auth Audit - JWT audience: {unverified_payload.get('aud')}")
            logger.info(f"Auth Audit - JWT expiration: {unverified_payload.get('exp')}")
        except Exception:
            logger.info("Auth Audit - Failed to decode unverified JWT for logging")
        
        # Cryptographically verify the token signature
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={"verify_aud": False}
        )
        logger.info("Auth Audit - Verification result: SUCCESS")
        return payload
    except Exception as e:
        import logging
        logger = logging.getLogger(__name__)
        logger.info(f"Auth Audit - Verification result: FAILED ({str(e)})")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token validation failed: {str(e)}"
        )

from fastapi import Request

def get_current_user(
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    token = credentials.credentials
    auth_header = request.headers.get("Authorization")
    
    import logging
    logger = logging.getLogger(__name__)
    
    logger.info(f"Auth Audit - URL: {request.url}")
    logger.info(f"Auth Audit - Authorization header present: {'yes' if auth_header else 'no'}")
    
    payload = verify_clerk_token(token)
    user_id = payload.get("sub")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = db.query(User).filter(User.id == user_id).first()
    
    # Auto-provision new users and their default Personal Workspace
    if not user:
        user = User(
            id=user_id,
            email=payload.get("email", f"{user_id}@unknown.copycraft.ai"),
            name="Demo User"
        )
        db.add(user)
        
        # Auto-create personal workspace as requested
        workspace = Workspace(name="Personal Workspace")
        db.add(workspace)
        db.flush()
        
        member = WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="Owner")
        db.add(member)
        db.commit()
        db.refresh(user)

    return user
