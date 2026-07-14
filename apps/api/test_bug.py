from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from core.dependencies import get_db
from database.connection import Base
from database.models import User, Workspace, WorkspaceMember
from schemas.project import ProjectCreate, BusinessProfileSchema, BrandProfileSchema, AudienceProfileSchema, SEOProfileSchema, ServiceSchema, CompetitorSchema
from services.projects.service import ProjectService
import logging

engine = create_engine("sqlite:///./copycraft.db")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

service = ProjectService(db)

payload = ProjectCreate(
    name="My Business",
    description="Tech",
    status="completed",
    business_profile=BusinessProfileSchema(name="My Business", category="Tech", location="NYC", website="abc.com"),
    brand_profile=BrandProfileSchema(mission="Win", vision="Win more", usp="Fast", voice="Professional"),
    audience_profile=AudienceProfileSchema(customer_types="B2B", age_groups="20-50"),
    seo_profile=SEOProfileSchema(primary_keywords="tech, fast", service_areas="USA"),
    services=[ServiceSchema(name="Consulting", description="IT", price_range="$100")],
    competitors=[CompetitorSchema(website="rival.com", strengths="Big", weaknesses="Slow")]
)

try:
    project = service.create_project(payload, workspace_id="default")
    print(project.id)
except Exception as e:
    import traceback
    traceback.print_exc()

