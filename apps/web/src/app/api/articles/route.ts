import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@repo/database'
import { articlePostSchema } from './schema'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const session = await getServerSession()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const body = await request.json()

  const parse = articlePostSchema.safeParse(body)

  if (!parse.success) {
    return NextResponse.json({ error: parse.error }, { status: 400 })
  }

  await prisma.meal.update({
    where: {
      mealId: parse.data.mealId,
    },
    data: {
      isPublic: true,
    },
  })

  return NextResponse.json({ message: 'OK' })
}
