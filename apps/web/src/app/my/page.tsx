import { getServerSession } from 'next-auth'
import MyPageLayout from './page.layout'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@repo/database'

const prisma = new PrismaClient()

export default async function MyPage() {
  const session = await getServerSession()

  if (!session?.user) {
    return redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email ?? undefined,
    },
  })

  if (!user) {
    return redirect('/login')
  }

  const meals = await prisma.meal.findMany({
    where: {
      userId: user.userId,
    },
    include: {
      mealItems: true,
    },
  })

  return <MyPageLayout session={session} user={user} meals={meals} />
}
