import requests

# create first
payload = {
    "name": "My Business",
    "description": "Tech",
    "business_profile": {"name": "My Business"}
}
headers = {"x-workspace-id": "default", "Authorization": "Bearer mock_token"}
resp = requests.post("http://localhost:8000/api/v1/projects", json=payload, headers=headers)
print("Create:", resp.status_code)
pid = resp.json()["id"]

# update
payload_update = {
    "name": "My Business Updated",
    "description": "Tech",
    "status": "completed",
    "business_profile": {"name": "My Business Updated"},
    "brand_profile": {"mission": "Win"},
    "services": [{"name": "Consulting"}],
    "competitors": [{"website": "rival.com"}]
}
resp2 = requests.put(f"http://localhost:8000/api/v1/projects/{pid}", json=payload_update, headers=headers)
print("Update:", resp2.status_code)
print(resp2.text)
