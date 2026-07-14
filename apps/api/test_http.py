import requests
import json

payload = {
    "name": "My Business",
    "description": "Tech",
    "status": "completed",
    "business_profile": {
        "name": "My Business",
        "category": "Tech",
        "location": "NYC",
        "website": "abc.com",
        "phone": "123",
        "email": "abc@abc.com"
    },
    "brand_profile": {
        "mission": "Win",
        "vision": "Win more",
        "usp": "Fast",
        "story": "Once upon a time",
        "voice": "Professional"
    },
    "audience_profile": {
        "customerTypes": "B2B",
        "ageGroups": "20-50",
        "budgetRange": "100-200",
        "preferences": "Quality",
        "painPoints": "Slow",
        "goals": "Scale"
    },
    "seo_profile": {
        "primaryKeywords": "tech",
        "secondaryKeywords": "fast",
        "serviceAreas": "USA",
        "languages": "EN"
    },
    "services": [
        {
            "id": "123",
            "name": "Consulting",
            "description": "IT",
            "priceRange": "$100",
            "duration": "1 week",
            "uniqueBenefit": "Speed"
        }
    ],
    "competitors": [
        {
            "id": "456",
            "website": "rival.com",
            "strengths": "Big",
            "weaknesses": "Slow"
        }
    ]
}

headers = {
    "x-workspace-id": "default",
    "Authorization": "Bearer mock_token"
}

resp = requests.post("http://localhost:8000/api/v1/projects", json=payload, headers=headers)
print(resp.status_code)
print(resp.text)
