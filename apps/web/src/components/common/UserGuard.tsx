import { PrismaClient } from '@repo/database'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export default async function UserGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session?.user) {
    return redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  })

  if (!user) {
    return redirect('/register')
  }

  return <>{children}</>
}
