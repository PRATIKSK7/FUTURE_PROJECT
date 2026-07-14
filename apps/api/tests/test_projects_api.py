import pytest
from database.models import Project

def test_get_projects_empty(client):
    response = client.get("/api/v1/projects", headers={"x-workspace-id": "test_ws_1"})
    assert response.status_code == 200
    assert response.json() == []

def test_create_project(client, db_session):
    payload = {"name": "Test Project", "description": "Automated Testing"}
    response = client.post("/api/v1/projects", json=payload, headers={"x-workspace-id": "test_ws_1"})
    
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Project"
    assert "id" in data
    
    # Verify persistence
    db_project = db_session.query(Project).filter_by(id=data["id"]).first()
    assert db_project is not None
    assert db_project.workspace_id == "test_ws_1"

def test_security_workspace_isolation(client):
    # Attempt to access with a workspace ID the user doesn't own
    response = client.get("/api/v1/projects", headers={"x-workspace-id": "malicious_ws_999"})
    
    # Since we mocked get_current_user, but security.py checks db for WorkspaceMember...
    # It should fail with 403 Forbidden.
    assert response.status_code == 403
    assert "access to this workspace" in response.json()["detail"]
