"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { logoutAction } from '@/actions/users'

function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);


    const handleLogout = async () => {
        setLoading(true)
        try {
            const { errorMessage } = await logoutAction();

            if (!errorMessage) {
                router.push(`/?toastType=logOut`);
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