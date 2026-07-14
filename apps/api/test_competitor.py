import requests

payload = {
    "name": "My Business",
    "description": "Tech",
    "status": "completed",
    "business_profile": {"name": "Test"},
    "competitors": [{"website": "example.com", "strengths": "Fast"}]
}

headers = {"x-workspace-id": "default", "Authorization": "Bearer mock_token"}
resp = requests.post("http://localhost:8000/api/v1/projects", json=payload, headers=headers)
print("Status:", resp.status_code)
print("Response:", resp.text)
