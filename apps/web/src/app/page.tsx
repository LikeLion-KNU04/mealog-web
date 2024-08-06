import { IntroPage } from './intro.page'
import DashboardPage from './dashboard.page'
import { PrismaClient } from '@repo/database'
import { getServerSession } from 'next-auth'

const prisma = new PrismaClient()

export default async function MainPage() {
  const session = await getServerSession() //세션 정보를 가져옴
  console.log(session?.user?.image)

  if (session?.user) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email ?? undefined },
    })

    if (!user) return <IntroPage />

    const meals = await prisma.meal.findMany({
      where: { userId: user.userId },
      include: {
        mealItems: {
          include: {
            mealItemAnalysis: true,
          },
        },
      },
    })

    return <DashboardPage session={session} user={user} meals={meals} />
  }

  return <IntroPage />
}
