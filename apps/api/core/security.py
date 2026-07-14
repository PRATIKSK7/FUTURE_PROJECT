"""
Authorization Module
Handles Workspace RBAC (Role-Based Access Control)
"""
from fastapi import Depends, HTTPException, Header
from sqlalchemy.orm import Session
from core.dependencies import get_db
from database.models import User, WorkspaceMember
from core.auth import get_current_user

def require_workspace_access(
    x_workspace_id: str = Header("default", description="The ID of the active workspace"),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> str:
    """
    Validates that the current user has access to the requested workspace.
    If workspace is 'default', resolves to the user's primary workspace.
    Returns the resolved workspace_id.
    """
    if x_workspace_id == "default":
        membership = db.query(WorkspaceMember).filter(WorkspaceMember.user_id == user.id).first()
        if not membership:
            raise HTTPException(status_code=403, detail="No workspaces found for this user.")
        return membership.workspace_id

    membership = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == user.id,
        WorkspaceMember.workspace_id == x_workspace_id
    ).first()

    if not membership:
        raise HTTPException(
            status_code=403,
            detail="You do not have access to this workspace."
        )

    return x_workspace_id
