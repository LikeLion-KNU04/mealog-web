import { PrismaClient } from '@repo/database'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { memberPostSchema } from './schema'

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

  if (user) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const body = await request.json()

  const parse = memberPostSchema.safeParse(body)

  if (!parse.success) {
    return NextResponse.json({ error: parse.error }, { status: 400 })
  }

  const { data } = parse

  user = await prisma.user.create({
    data: {
      email: session.user.email!,
      name: data.name,
      birthDate: new Date(data.birthDate),
      gender: data.gender,
      height: data.height,
      weight: data.weight,
    },
  })

  return NextResponse.json(user)
}
