from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List, Optional
from .repository import ProjectRepository
from schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse

class ProjectService:
    def __init__(self, db: Session):
        self.repo = ProjectRepository(db)

    def get_projects(self, workspace_id: str, skip: int = 0, limit: int = 100, search: str = None) -> List[ProjectResponse]:
        projects = self.repo.get_all(workspace_id=workspace_id, skip=skip, limit=limit, search=search)
        return [ProjectResponse.model_validate(p) for p in projects]

    def get_project(self, project_id: str, workspace_id: str) -> ProjectResponse:
        project = self.repo.get_by_id(project_id, workspace_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found or access denied")
        return ProjectResponse.model_validate(project)

    def create_project(self, payload: ProjectCreate, workspace_id: str) -> ProjectResponse:
        project = self.repo.create(name=payload.name, description=payload.description, workspace_id=workspace_id, status=payload.status)
        
        if payload.business_profile:
            self.repo.set_business_profile(project.id, payload.business_profile.model_dump(exclude_unset=True))
        if payload.brand_profile:
            self.repo.set_brand_profile(project.id, payload.brand_profile.model_dump(exclude_unset=True))
        if payload.audience_profile:
            self.repo.set_audience_profile(project.id, payload.audience_profile.model_dump(exclude_unset=True))
        if payload.seo_profile:
            self.repo.set_seo_profile(project.id, payload.seo_profile.model_dump(exclude_unset=True))
        if payload.services is not None:
            self.repo.set_services(project.id, payload.services)
        if payload.competitors is not None:
            self.repo.set_competitors(project.id, payload.competitors)
            
        project = self.repo.get_by_id(project.id, workspace_id)
        return ProjectResponse.model_validate(project)

    def update_project(self, project_id: str, payload: ProjectUpdate, workspace_id: str) -> ProjectResponse:
        project = self.repo.get_by_id(project_id, workspace_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found or access denied")
        
        if payload.name:
            project.name = payload.name
        if payload.description:
            project.description = payload.description
        if payload.status:
            project.status = payload.status
        
        self.repo.update(project)

        if payload.business_profile:
            self.repo.set_business_profile(project_id, payload.business_profile.model_dump(exclude_unset=True))
        if payload.brand_profile:
            self.repo.set_brand_profile(project_id, payload.brand_profile.model_dump(exclude_unset=True))
        if payload.audience_profile:
            self.repo.set_audience_profile(project_id, payload.audience_profile.model_dump(exclude_unset=True))
        if payload.seo_profile:
            self.repo.set_seo_profile(project_id, payload.seo_profile.model_dump(exclude_unset=True))
        if payload.services is not None:
            self.repo.set_services(project_id, payload.services)
        if payload.competitors is not None:
            self.repo.set_competitors(project_id, payload.competitors)
            
        # Refresh to get latest relationships
        project = self.repo.get_by_id(project_id, workspace_id)
        return ProjectResponse.model_validate(project)

    def delete_project(self, project_id: str, workspace_id: str):
        project = self.repo.get_by_id(project_id, workspace_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found or access denied")
        self.repo.delete(project)

    def clone_project(self, project_id: str, workspace_id: str) -> ProjectResponse:
        original = self.repo.get_by_id(project_id, workspace_id)
        if not original:
            raise HTTPException(status_code=404, detail="Project not found or access denied")
        
        # Create new project
        cloned = self.repo.create(
            name=f"{original.name} (Copy)", 
            description=original.description, 
            workspace_id=workspace_id, 
            status="Draft"
        )
        
        # Copy profiles
        if original.business_profile:
            data = {k: getattr(original.business_profile, k) for k in original.business_profile.__table__.columns.keys() if k not in ["id", "project_id", "created_at", "updated_at"]}
            self.repo.set_business_profile(cloned.id, data)
            
        if original.brand_profile:
            data = {k: getattr(original.brand_profile, k) for k in original.brand_profile.__table__.columns.keys() if k not in ["id", "project_id", "created_at", "updated_at"]}
            self.repo.set_brand_profile(cloned.id, data)
            
        if original.audience_profile:
            data = {k: getattr(original.audience_profile, k) for k in original.audience_profile.__table__.columns.keys() if k not in ["id", "project_id", "created_at", "updated_at"]}
            self.repo.set_audience_profile(cloned.id, data)
            
        if original.seo_profile:
            data = {k: getattr(original.seo_profile, k) for k in original.seo_profile.__table__.columns.keys() if k not in ["id", "project_id", "created_at", "updated_at"]}
            self.repo.set_seo_profile(cloned.id, data)
            
        # Copy services
        if original.services:
            self.repo.set_services(cloned.id, original.services)
            
        # Copy competitors
        if original.competitors:
            self.repo.set_competitors(cloned.id, original.competitors)
            
        # Do not copy generated content for a clone
        
        cloned = self.repo.get_by_id(cloned.id, workspace_id)
        return ProjectResponse.model_validate(cloned)
