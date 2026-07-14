import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 bg-muted/20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">Create your Account</h2>
          <p className="text-muted-foreground mt-2">Join CopyCraft AI today</p>
        </div>
        <SignUp 
          appearance={{ 
            elements: { 
              rootBox: "mx-auto w-full",
              card: "shadow-xl border bg-card rounded-xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden"
            } 
          }} 
          routing="path" 
          path="/sign-up" 
          signInUrl="/sign-in" 
          fallbackRedirectUrl="/projects"
        />
      </div>
    </div>
  )
}
