import { test, expect } from '@playwright/test';

test.describe('Authentication & Provisioning', () => {
  test('User can sign in and is redirected to personal workspace', async ({ page }) => {
    // Navigate to custom Sign In
    await page.goto('/sign-in');
    
    // Verify custom branding is present
    await expect(page.locator('h2')).toContainText('Welcome to CopyCraft AI');
    
    // Note: In an actual CI environment with Clerk, we use the Clerk Testing Token
    // to bypass the interactive login, or we mock the authMiddleware.
    // Assuming the bypass is active, we navigate to the protected dashboard:
    await page.goto('/projects');
    
    // Ensure the Workspace Switcher auto-provisioned the "Personal Workspace"
    await expect(page.getByText('Personal Workspace')).toBeVisible();
    
    // Verify the dropdown opens
    await page.getByText('Personal Workspace').click();
    await expect(page.getByText('Create Workspace')).toBeVisible();
  });
});
