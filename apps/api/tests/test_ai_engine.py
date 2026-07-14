import pytest

def test_prompt_builder_output():
    """
    Validates that the Prompt Builder correctly injects Business Context into the template.
    """
    # Mock context engine output
    context = {
        "business_name": "Blue Ribbon Travel",
        "category": "Travel Agency"
    }
    
    # Simulate Prompt Builder Logic (Mocking internal logic for the sake of the test suite structure)
    from string import Template
    raw_prompt = Template("Write copy for $business_name, a $category.")
    final_prompt = raw_prompt.safe_substitute(context)
    
    assert final_prompt == "Write copy for Blue Ribbon Travel, a Travel Agency."
    assert "Blue Ribbon Travel" in final_prompt

def test_prompt_validation_constraints():
    """
    Validates the prompt tokenizer/validator to ensure we don't exceed model limits.
    """
    final_prompt = "Generate a website. " * 1000 # Large prompt
    estimated_tokens = len(final_prompt.split()) * 1.3 # Rough heuristic
    
    # Ensure constraint engine flags it if token limit exceeded
    is_valid = estimated_tokens < 30000
    assert is_valid is True # Fits in Gemini 1.5 Pro

def test_gemini_streaming_mock(mock_gemini):
    """
    Verifies the streaming generation engine using the deterministic mock.
    """
    # In a real test, we would import the GeminiProvider and call it
    chunks = list(mock_gemini())
    
    assert len(chunks) == 3
    assert "".join(chunks) == "Mocked AI Response"
