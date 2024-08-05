import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import { PrismaClient } from '@repo/database'
import MealPageLayout from './page.layout'

const prisma = new PrismaClient()

export default async function MealPage({
  params,
}: {
  params: { mealId: string }
}) {
  const { mealId } = params
  const session = await getServerSession()

  if (!session?.user) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
  })

  if (!user) {
    redirect('/login')
  }

  const meal = await prisma.meal.findUnique({
    where: { mealId, userId: user.userId },
  })

  if (!meal) {
    return notFound()
  }

  const mealItems = await prisma.mealItem.findMany({
    where: { mealId },
  })

  return <MealPageLayout meal={meal} mealItems={mealItems} />
}
