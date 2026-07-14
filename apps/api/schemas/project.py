from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from typing import List, Optional, Any
from datetime import datetime

class BaseSchemaConfig(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)

class ServiceSchema(BaseSchemaConfig):
    id: Optional[str] = None
    name: str
    description: Optional[str] = None
    price_range: Optional[str] = None

from pydantic import Field

class CompetitorSchema(BaseSchemaConfig):
    id: Optional[str] = None
    name: str = Field(alias='website')
    strengths: Optional[str] = None
    weaknesses: Optional[str] = None

class BusinessProfileSchema(BaseSchemaConfig):
    name: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    contact_email: Optional[str] = None
    email: Optional[str] = None

class BrandProfileSchema(BaseSchemaConfig):
    mission: Optional[str] = None
    vision: Optional[str] = None
    usp: Optional[str] = None
    voice: Optional[str] = None

class AudienceProfileSchema(BaseSchemaConfig):
    customer_types: Optional[str] = None
    pain_points: Optional[str] = None
    goals: Optional[str] = None
    budget_range: Optional[str] = None
    age_groups: Optional[str] = None
    preferences: Optional[str] = None

class SEOProfileSchema(BaseSchemaConfig):
    primary_keywords: Optional[str] = None
    secondary_keywords: Optional[str] = None
    service_areas: Optional[str] = None
    languages: Optional[str] = None

class GeneratedContentSchema(BaseSchemaConfig):
    id: Optional[str] = None
    module_name: str
    content: str
    metrics: Optional[Any] = None
    created_at: Optional[datetime] = None

class ContentCreate(BaseModel):
    module_name: str
    content: str
    metrics: Optional[Any] = None

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    status: Optional[str] = "Draft"
    business_profile: Optional[BusinessProfileSchema] = None
    brand_profile: Optional[BrandProfileSchema] = None
    audience_profile: Optional[AudienceProfileSchema] = None
    seo_profile: Optional[SEOProfileSchema] = None
    services: Optional[List[ServiceSchema]] = None
    competitors: Optional[List[CompetitorSchema]] = None

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    business_profile: Optional[BusinessProfileSchema] = None
    brand_profile: Optional[BrandProfileSchema] = None
    audience_profile: Optional[AudienceProfileSchema] = None
    seo_profile: Optional[SEOProfileSchema] = None
    services: Optional[List[ServiceSchema]] = None
    competitors: Optional[List[CompetitorSchema]] = None

class ProjectResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: datetime
    business_profile: Optional[BusinessProfileSchema] = None
    brand_profile: Optional[BrandProfileSchema] = None
    audience_profile: Optional[AudienceProfileSchema] = None
    seo_profile: Optional[SEOProfileSchema] = None
    services: List[ServiceSchema] = []
    competitors: List[CompetitorSchema] = []
    generated_content: List[GeneratedContentSchema] = []

    model_config = ConfigDict(from_attributes=True)
