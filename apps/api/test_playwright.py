from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/dashboard/projects/new")
        
        # Step 1: Business Form
        page.fill("input#name", "Playwright Business")
        page.fill("input#category", "Testing")
        page.fill("input#location", "Remote")
        page.click("button:has-text('Next Step')")
        
        # Step 2: Brand Form
        page.fill("textarea#mission", "This is a test mission statement that is long enough.")
        page.fill("textarea#vision", "This is a test vision statement that is long enough.")
        page.fill("textarea#usp", "This is a test unique selling proposition.")
        page.fill("input#voice", "Professional")
        page.click("button:has-text('Next Step')")
        
        # Step 3: Audience Form
        page.fill("textarea#customerTypes", "Playwright testers")
        page.fill("textarea#ageGroups", "20-50")
        page.fill("textarea#budgetRange", "Free")
        page.fill("textarea#preferences", "Fast tests")
        page.fill("textarea#painPoints", "Slow tests")
        page.fill("textarea#goals", "Ship code")
        page.click("button:has-text('Next Step')")
        
        # Step 4: Services
        page.fill("input[placeholder='e.g., General Consulting']", "E2E Testing")
        page.click("button:has-text('Next Step')")
        
        # Step 5: Competitors
        page.fill("input[placeholder='https://...']", "cypress.io")
        page.click("button:has-text('Next Step')")
        
        # Step 6: SEO
        page.fill("textarea#primaryKeywords", "testing, playwright")
        page.fill("textarea#serviceAreas", "Global")
        page.fill("input#languages", "English")
        page.click("button:has-text('Next Step')")
        
        # Step 7: Review
        page.click("button:has-text('Complete Setup')")
        
        # Wait for either success or error alert
        page.wait_for_timeout(3000)
        browser.close()

run()
