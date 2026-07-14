from core.database import SessionLocal
from schemas.project import ProjectResponse
from database.models import Project

db = SessionLocal()
projects = db.query(Project).all()
for p in projects:
    resp = ProjectResponse.model_validate(p)
    print(f"Project: {resp.name}")
    print(f"Generated Content: {len(resp.generated_content)}")
