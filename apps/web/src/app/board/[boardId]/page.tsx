import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import BoardDetailPageLayout from './page.layout'
import { PrismaClient } from '@repo/database'
import { storage } from '@/lib/firebase/firebaseClient'
import { getDownloadURL, ref } from 'firebase/storage'

const prisma = new PrismaClient()

export default async function BoardDetailPage({
  params,
}: {
  params: { boardId: string }
}) {
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

  const meal = await prisma.meal.findUnique({
    where: {
      mealId: params.boardId,
      isPublic: true,
    },
    include: {
      mealItems: {
        include: {
          mealItemAnalysis: true,
        },
      },
    },
  })

  if (!meal) {
    return notFound()
  }

  const imageUrls = await Promise.all(
    meal.mealItems.map((mealItem) => {
      const mealImageRef = ref(storage, `images/${mealItem.imageName}`)
      return getDownloadURL(mealImageRef)
    })
  )

  return <BoardDetailPageLayout user={user} meal={meal} imageUrls={imageUrls} />
}
