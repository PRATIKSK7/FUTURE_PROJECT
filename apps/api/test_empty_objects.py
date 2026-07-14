import requests

payload = {
    "name": "My Business",
    "description": "Tech",
    "status": "completed",
    "business_profile": {"name": "Test"},
    "brand_profile": {},
    "audience_profile": {},
    "seo_profile": {},
    "services": [{
        "id": "1",
        "name": "",
        "description": "",
        "priceRange": "",
        "duration": "",
        "uniqueBenefit": ""
    }],
    "competitors": []
}

headers = {"x-workspace-id": "default", "Authorization": "Bearer mock_token"}
resp = requests.post("http://localhost:8000/api/v1/projects", json=payload, headers=headers)
print("Status:", resp.status_code)
print("Response:", resp.text)
