from sqlalchemy import Column, String, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from database.connection import Base
from database.mixins import UUIDMixin, TimestampMixin, SoftDeleteMixin

class User(Base, TimestampMixin):
    __tablename__ = 'users'
    id = Column(String(255), primary_key=True) # Clerk User ID
    email = Column(String(255), unique=True, nullable=False)
    name = Column(String(255), nullable=True)
    image_url = Column(String(1024), nullable=True)
    
    workspace_memberships = relationship("WorkspaceMember", back_populates="user", cascade="all, delete-orphan")

class Workspace(Base, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = 'workspaces'
    name = Column(String(255), nullable=False)
    
    members = relationship("WorkspaceMember", back_populates="workspace", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="workspace", cascade="all, delete-orphan")

class WorkspaceMember(Base, UUIDMixin, TimestampMixin):
    __tablename__ = 'workspace_members'
    workspace_id = Column(String(36), ForeignKey('workspaces.id'), nullable=False)
    user_id = Column(String(255), ForeignKey('users.id'), nullable=False)
    role = Column(String(50), default="Owner") # Owner, Editor, Viewer
    
    workspace = relationship("Workspace", back_populates="members")
    user = relationship("User", back_populates="workspace_memberships")

class Project(Base, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = 'projects'
    workspace_id = Column(String(36), ForeignKey('workspaces.id'), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(50), default="Draft")
    
    workspace = relationship("Workspace", back_populates="projects")
    
    business_profile = relationship("BusinessProfile", back_populates="project", uselist=False, cascade="all, delete-orphan")
    brand_profile = relationship("BrandProfile", back_populates="project", uselist=False, cascade="all, delete-orphan")
    audience_profile = relationship("AudienceProfile", back_populates="project", uselist=False, cascade="all, delete-orphan")
    seo_profile = relationship("SEOProfile", back_populates="project", uselist=False, cascade="all, delete-orphan")
    services = relationship("Service", back_populates="project", cascade="all, delete-orphan")
    competitors = relationship("Competitor", back_populates="project", cascade="all, delete-orphan")
    generated_content = relationship("GeneratedContent", back_populates="project", cascade="all, delete-orphan")

class BusinessProfile(Base, UUIDMixin, TimestampMixin):
    __tablename__ = 'business_profiles'
    project_id = Column(String(36), ForeignKey('projects.id'), unique=True, nullable=False)
    name = Column(String(255), nullable=True)
    category = Column(String(100), nullable=True)
    location = Column(String(255), nullable=True)
    website = Column(String(255), nullable=True)
    contact_email = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    project = relationship("Project", back_populates="business_profile")

class BrandProfile(Base, UUIDMixin, TimestampMixin):
    __tablename__ = 'brand_profiles'
    project_id = Column(String(36), ForeignKey('projects.id'), unique=True, nullable=False)
    mission = Column(Text, nullable=True)
    vision = Column(Text, nullable=True)
    usp = Column(Text, nullable=True)
    voice = Column(String(100), nullable=True)
    project = relationship("Project", back_populates="brand_profile")

class AudienceProfile(Base, UUIDMixin, TimestampMixin):
    __tablename__ = 'audience_profiles'
    project_id = Column(String(36), ForeignKey('projects.id'), unique=True, nullable=False)
    customer_types = Column(Text, nullable=True)
    pain_points = Column(Text, nullable=True)
    goals = Column(Text, nullable=True)
    budget_range = Column(String(100), nullable=True)
    age_groups = Column(String(100), nullable=True)
    preferences = Column(Text, nullable=True)
    project = relationship("Project", back_populates="audience_profile")

class SEOProfile(Base, UUIDMixin, TimestampMixin):
    __tablename__ = 'seo_profiles'
    project_id = Column(String(36), ForeignKey('projects.id'), unique=True, nullable=False)
    primary_keywords = Column(Text, nullable=True)
    secondary_keywords = Column(Text, nullable=True)
    service_areas = Column(Text, nullable=True)
    languages = Column(String(255), nullable=True)
    project = relationship("Project", back_populates="seo_profile")

class Service(Base, UUIDMixin, TimestampMixin):
    __tablename__ = 'services'
    project_id = Column(String(36), ForeignKey('projects.id'), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    price_range = Column(String(100), nullable=True)
    project = relationship("Project", back_populates="services")

class Competitor(Base, UUIDMixin, TimestampMixin):
    __tablename__ = 'competitors'
    project_id = Column(String(36), ForeignKey('projects.id'), nullable=False)
    name = Column(String(255), nullable=False)
    strengths = Column(Text, nullable=True)
    weaknesses = Column(Text, nullable=True)
    project = relationship("Project", back_populates="competitors")

class GeneratedContent(Base, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = 'generated_content'
    project_id = Column(String(36), ForeignKey('projects.id'), nullable=False)
    module_name = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    metrics = Column(JSON, nullable=True)
    project = relationship("Project", back_populates="generated_content")
