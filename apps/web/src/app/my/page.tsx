import { getServerSession } from 'next-auth'
import MyPageLayout from './page.layout'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@repo/database'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/lib/firebase/firebaseClient'

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

  const imageUrls: Record<string, string> = {}

  for (const meal of meals) {
    for (const mealItem of meal.mealItems) {
      if (mealItem.imageName) {
        imageUrls[mealItem.imageName] = await getDownloadURL(
          ref(storage, `images/${mealItem.imageName}`)
        )
      }
    }
  }

  return <MyPageLayout user={user} meals={meals} imageUrls={imageUrls} />
}
