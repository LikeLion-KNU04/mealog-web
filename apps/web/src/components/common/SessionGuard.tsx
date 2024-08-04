import { PrismaClient } from '@repo/database'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SessionGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session?.user) {
    return redirect('/login')
  }

  return <>{children}</>
}
