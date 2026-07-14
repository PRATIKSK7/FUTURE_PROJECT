from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_
from typing import List, Optional
from database.models import Project, BusinessProfile, BrandProfile, AudienceProfile, SEOProfile, Service, Competitor, GeneratedContent

class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, workspace_id: str, skip: int = 0, limit: int = 100, search: str = None) -> List[Project]:
        query = self.db.query(Project).options(joinedload(Project.generated_content)).filter(Project.is_deleted == False, Project.workspace_id == workspace_id)
        if search:
            query = query.filter(or_(Project.name.ilike(f"%{search}%"), Project.description.ilike(f"%{search}%")))
        return query.order_by(Project.updated_at.desc()).offset(skip).limit(limit).all()

    def get_by_id(self, project_id: str, workspace_id: str) -> Optional[Project]:
        return self.db.query(Project).options(joinedload(Project.generated_content)).filter(
            Project.id == project_id, 
            Project.is_deleted == False, 
            Project.workspace_id == workspace_id
        ).first()

    def create(self, name: str, workspace_id: str, description: str = None, status: str = "Draft") -> Project:
        project = Project(name=name, description=description, workspace_id=workspace_id, status=status)
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def update(self, project: Project) -> Project:
        self.db.commit()
        self.db.refresh(project)
        return project

    def delete(self, project: Project):
        project.soft_delete()
        self.db.commit()

    # Helpers for child entities
    def set_business_profile(self, project_id: str, data: dict):
        profile = self.db.query(BusinessProfile).filter_by(project_id=project_id).first()
        if not profile:
            profile = BusinessProfile(project_id=project_id, **data)
            self.db.add(profile)
        else:
            for k, v in data.items():
                setattr(profile, k, v)
        self.db.commit()
    
    def set_brand_profile(self, project_id: str, data: dict):
        profile = self.db.query(BrandProfile).filter_by(project_id=project_id).first()
        if not profile:
            profile = BrandProfile(project_id=project_id, **data)
            self.db.add(profile)
        else:
            for k, v in data.items():
                setattr(profile, k, v)
        self.db.commit()
        
    def set_audience_profile(self, project_id: str, data: dict):
        profile = self.db.query(AudienceProfile).filter_by(project_id=project_id).first()
        if not profile:
            profile = AudienceProfile(project_id=project_id, **data)
            self.db.add(profile)
        else:
            for k, v in data.items():
                setattr(profile, k, v)
        self.db.commit()
        
    def set_seo_profile(self, project_id: str, data: dict):
        profile = self.db.query(SEOProfile).filter_by(project_id=project_id).first()
        if not profile:
            profile = SEOProfile(project_id=project_id, **data)
            self.db.add(profile)
        else:
            for k, v in data.items():
                setattr(profile, k, v)
        self.db.commit()

    def set_services(self, project_id: str, services: list):
        self.db.query(Service).filter_by(project_id=project_id).delete()
        for s in services:
            self.db.add(Service(project_id=project_id, name=s.name, description=s.description, price_range=s.price_range))
        self.db.commit()

    def set_competitors(self, project_id: str, competitors: list):
        self.db.query(Competitor).filter_by(project_id=project_id).delete()
        for c in competitors:
            self.db.add(Competitor(project_id=project_id, name=c.name, strengths=c.strengths, weaknesses=c.weaknesses))
        self.db.commit()

    def save_generated_content(self, project_id: str, module_name: str, content: str, metrics: dict = None) -> GeneratedContent:
        doc = GeneratedContent(project_id=project_id, module_name=module_name, content=content, metrics=metrics)
        self.db.add(doc)
        self.db.commit()
        self.db.refresh(doc)
        return doc
        
    def get_generated_content(self, project_id: str) -> List[GeneratedContent]:
        return self.db.query(GeneratedContent).filter(GeneratedContent.project_id == project_id, GeneratedContent.is_deleted == False).all()
