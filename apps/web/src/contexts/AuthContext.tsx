'use client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

interface Props {
  session: Session | null
  children: React.ReactNode
}

export default function AuthContext({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
