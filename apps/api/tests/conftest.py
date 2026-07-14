import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

# Assuming main app is in apps/api/main.py and models are in apps/api/database/models.py
# If main.py doesn't exist locally, we mock it. For this code, we rely on the core dependencies.
from database.connection import Base
from core.dependencies import get_db
from core.auth import get_current_user
from database.models import User, Workspace, WorkspaceMember

# Setup SQLite in-memory DB for deterministic tests
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db_session():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    
    # Seed deterministic test data
    test_user = User(id="test_user_1", email="test@copycraft.ai", name="Test User")
    test_workspace = Workspace(id="test_ws_1", name="Test Workspace")
    db.add(test_user)
    db.add(test_workspace)
    db.flush()
    db.add(WorkspaceMember(workspace_id=test_workspace.id, user_id=test_user.id, role="Owner"))
    db.commit()
    
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(db_session):
    # To mock FastAPI TestClient, we'd import the app. 
    # Since we might not have main.py in this slice, we will write unit tests using the services/routers directly, or mock the app.
    from fastapi import FastAPI
    from routers import projects
    
    app = FastAPI()
    app.include_router(projects.router, prefix="/api/v1")
    
    # Override dependencies
    app.dependency_overrides[get_db] = lambda: db_session
    
    # Mock Clerk authentication
    app.dependency_overrides[get_current_user] = lambda: db_session.query(User).filter_by(id="test_user_1").first()
    
    with TestClient(app) as test_client:
        yield test_client

@pytest.fixture
def mock_gemini(mocker):
    """Mocks the Gemini API streaming response for AI Testing"""
    mock_response = mocker.patch("services.ai.gemini_provider.GeminiProvider.generate_stream")
    mock_response.return_value = ["Mocked ", "AI ", "Response"]
    return mock_response
