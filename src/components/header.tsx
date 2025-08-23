import Link from 'next/link'
import Image from 'next/image'
import { shadow } from '@/styles/utils'
import { Button } from './ui/button'
import DarkModeToggle from './DarkModeToggle'
import LogoutButton from './LogoutButton'

function Header() {
  const user = 1;
  return (
    <header className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-8"
    style={{
      boxShadow: shadow
    }}
    >
        <Link href="/" className="flex items-end gap-2">
            <Image src="/NoteBuddy-transparent.png" alt="logo" width={60} height={60} className="rounded-full" priority/>
            <h1 className="flex flex-col pb-1 text-2xl font-bold leading-6">
              Ask My <span>Note</span>
            </h1>
        </Link>
        <div className="flex gap-4">
          {user ? (
            <LogoutButton />
          ) : (
            <>
              <Button asChild>
                <Link href="/signup">
                  Sign Up
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
          <DarkModeToggle />
        </div>

    </header>
  )
}

export default Header