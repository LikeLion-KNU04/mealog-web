import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import { PrismaClient } from '@repo/database'
import MealPageLayout from './page.layout'
import { storage } from '@/lib/firebase/firebaseClient'
import { ref, getDownloadURL } from 'firebase/storage'

const prisma = new PrismaClient()

export default async function MealPage({
  params,
}: {
  params: { mealDate: string }
}) {
  const { mealDate } = params
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

  const meals = await prisma.meal.findMany({
    where: { userId: user.userId, date: new Date(mealDate) },
    include: {
      mealItems: {
        include: {
          mealItemAnalysis: true,
        },
      },
    },
  })

  if (!meals.length) {
    return notFound()
  }

  const imageUrls: Record<string, string[]> = {}

  for (let meal of meals) {
    const mealImages = await Promise.all(
      meal.mealItems.map(async (mealItem) => {
        const imageUrl = await getDownloadURL(
          ref(storage, `images/${mealItem.imageName}`)
        )

        return imageUrl
      })
    )

    imageUrls[meal.mealId] = mealImages
  }

  return (
    <MealPageLayout
      user={user}
      mealDate={mealDate}
      meals={meals}
      imageUrls={imageUrls}
    />
  )
}
