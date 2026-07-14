import requests

payload = {
    "businessContext": "Test Business",
    "prompt": "Write a slogan",
    "module": "Slogans"
}

resp = requests.post("http://localhost:8000/api/v1/generate", json=payload)
print("Status:", resp.status_code)
print("Response:", resp.text)
