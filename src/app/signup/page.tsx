import AuthForm from "@/components/AuthForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

function SignupPage() {
  return (
    <div className="mt-20 flex flex-1 flex-col items-center">
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-center text-2xl font-bold">Sign Up</CardTitle>
            </CardHeader>
            <AuthForm type="signup" />
        </Card>
    </div>
  )
}

export default SignupPage;