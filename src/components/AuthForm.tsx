"use client"

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { loginAction, signUpAction } from "@/actions/users";

type AuthFormProps = {
    type: 'login' | 'signup'
}

function AuthForm({ type }: AuthFormProps) {
    const isLogin = type === 'login';
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            let errorMessage;
            if (isLogin) {
                errorMessage = (await loginAction(email, password)).errorMessage;
            } else {
                errorMessage = (await signUpAction(email, password)).errorMessage;
            }
    
            if (!errorMessage) {
                router.replace(`/?whatToast=${type}`);
            } else {
                toast.error("Error", {
                    description: errorMessage,
                });
            }
        })
    }

    return (
        <form action={handleSubmit}>
            <CardContent className="grid gap-4 w-full items-center">
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                    type="email" id="email" name="email" placeholder="Enter your email" required disabled={isPending}/>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                    type="password" id="password" name="password" placeholder="Enter your password" required disabled={isPending}/>
                </div>

            </CardContent>
            <CardFooter className="mt-4 flex flex-col gap-6">
                <Button className="w-full">
                    {isPending ? <Loader2 className="animate-spin" /> : isLogin ? "Login" : "Sign Up"}
                </Button>
                <p className="text-xs text-muted-foreground">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <Link href={isLogin ? "/signup" : "/login"} className={`text-primary hover:underline ml-2 ${isPending ? "pointer-events-none" : ""}`}>
                        {isLogin ? "Sign Up" : "Login"}
                    </Link>
                </p>
            </CardFooter>
        </form>
    )
}

export default AuthForm