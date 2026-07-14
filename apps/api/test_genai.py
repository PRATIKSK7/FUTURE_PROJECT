import sys
from google import genai
from google.genai.errors import APIError

print("genai imported")
try:
    client = genai.Client(api_key="your_api_key_here")
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents='Tell me a joke.'
    )
    print(response.text)
except Exception as e:
    print(type(e))
    print(repr(e))
    if hasattr(e, 'code'): print("code:", e.code)
    if hasattr(e, 'message'): print("message:", e.message)
    if hasattr(e, 'status'): print("status:", e.status)
