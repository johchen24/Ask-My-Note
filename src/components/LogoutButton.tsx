"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    /**
     * Handles the logout UX flow using Sonner toasts.
     * - Shows a success toast when there is no error message
     * - Shows an error toast when an error message is present
     * Networking/auth will be wired later; this only manages UI feedback.
     */
    const handleLogout = async () => {
        setLoading(true)
        try {
            // Placeholder for the actual logout call wiring
            // const { errorMessage } = await logOutAction()
            await new Promise((resolve) => setTimeout(resolve, 200))
            const errorMessage: string | null = null;

            if (!errorMessage) {
                // Success toast with concise description
                toast.success("Logged out", {
                    description: "You have been logged out successfully",
                })
            } else {
                // Error toast reflecting the failure reason
                toast.error("Error", {
                    description: errorMessage,
                })
            }
        } catch {
            // Defensive: unexpected failure path
            toast.error("Error", { description: "Unexpected error during logout" })
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button
            className="w-24"
            onClick={handleLogout}
            disabled={loading}
        >
            {loading ? <Loader2 className="animate-spin"/> : "Logout"}
        </Button>
    )
}

export default LogoutButton