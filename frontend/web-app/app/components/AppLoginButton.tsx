'use client'

import { Button } from 'flowbite-react'
import { signIn } from 'next-auth/react'

export default function AppLoginButton() {
  return (
    <Button
        outline
        onClick={() => signIn('id-server', {redirectTo: '/'})}
        >Login
    </Button>
  )
}
