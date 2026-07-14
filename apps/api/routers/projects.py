"""
Projects Router
REST endpoints for managing CopyCraft AI projects.
Protected by workspace RBAC.
"""
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from typing import List

from core.dependencies import get_db
from core.security import require_workspace_access
from schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from services.projects.service import ProjectService

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("", response_model=List[ProjectResponse])
def get_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    search: str = None,
    workspace_id: str = Depends(require_workspace_access),
    db: Session = Depends(get_db)
):
    service = ProjectService(db)
    return service.get_projects(workspace_id=workspace_id, skip=skip, limit=limit, search=search)

import logging

logger = logging.getLogger(__name__)

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    payload: ProjectCreate, 
    workspace_id: str = Depends(require_workspace_access),
    db: Session = Depends(get_db)
):
    logger.info(f"Incoming POST /projects from workspace {workspace_id}")
    logger.info(f"Payload: {payload.model_dump()}")
    
    service = ProjectService(db)
    project = service.create_project(payload, workspace_id=workspace_id)
    
    logger.info(f"Successfully created project {project.id}")
    return project

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(
    project_id: str, 
    workspace_id: str = Depends(require_workspace_access),
    db: Session = Depends(get_db)
):
    service = ProjectService(db)
    return service.get_project(project_id, workspace_id=workspace_id)

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: str, 
    payload: ProjectUpdate, 
    workspace_id: str = Depends(require_workspace_access),
    db: Session = Depends(get_db)
):
    service = ProjectService(db)
    return service.update_project(project_id, payload, workspace_id=workspace_id)

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    project_id: str, 
    workspace_id: str = Depends(require_workspace_access),
    db: Session = Depends(get_db)
):
    service = ProjectService(db)
    service.delete_project(project_id, workspace_id=workspace_id)

@router.post("/{project_id}/clone", response_model=ProjectResponse)
def clone_project(
    project_id: str, 
    workspace_id: str = Depends(require_workspace_access),
    db: Session = Depends(get_db)
):
    service = ProjectService(db)
    return service.clone_project(project_id, workspace_id=workspace_id)

from schemas.project import GeneratedContentSchema, ContentCreate

@router.post("/{project_id}/content", response_model=GeneratedContentSchema)
def save_content(
    project_id: str,
    payload: ContentCreate,
    workspace_id: str = Depends(require_workspace_access),
    db: Session = Depends(get_db)
):
    service = ProjectService(db)
    # Ensure project exists and user has access
    service.get_project(project_id, workspace_id)
    doc = service.repo.save_generated_content(
        project_id=project_id,
        module_name=payload.module_name,
        content=payload.content,
        metrics=payload.metrics
    )
    return GeneratedContentSchema.model_validate(doc)

@router.get("/{project_id}/content", response_model=List[GeneratedContentSchema])
def get_content(
    project_id: str,
    workspace_id: str = Depends(require_workspace_access),
    db: Session = Depends(get_db)
):
    service = ProjectService(db)
    service.get_project(project_id, workspace_id)
    docs = service.repo.get_generated_content(project_id)
    return [GeneratedContentSchema.model_validate(d) for d in docs]
