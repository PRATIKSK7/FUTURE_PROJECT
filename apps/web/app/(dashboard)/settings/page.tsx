import { UserProfile } from "@clerk/nextjs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

export default function SettingsPage() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your workspace preferences and account security.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UserProfile appearance={{ elements: { rootBox: "w-full shadow-none", cardBox: "shadow-none border w-full" } }} />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Appearance</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Toggle application theme</span>
              <ThemeToggle />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">API Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Gemini API Key is managed securely at the environment level by your administrator.
              </p>
              <div className="p-3 bg-muted/50 rounded-md text-xs font-mono break-all border">
                Status: CONNECTED (gemini-1.5-pro)
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
