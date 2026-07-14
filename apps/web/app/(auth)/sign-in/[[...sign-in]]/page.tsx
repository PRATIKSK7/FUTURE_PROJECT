import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 bg-muted/20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">Welcome to CopyCraft AI</h2>
          <p className="text-muted-foreground mt-2">Sign in to your enterprise workspace</p>
        </div>
        <SignIn 
          appearance={{ 
            elements: { 
              rootBox: "mx-auto w-full",
              card: "shadow-xl border bg-card rounded-xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden"
            } 
          }} 
          routing="path" 
          path="/sign-in" 
          signUpUrl="/sign-up" 
        />
      </div>
    </div>
  )
}
