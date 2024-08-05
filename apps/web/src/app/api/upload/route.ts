import { NextRequest, NextResponse } from 'next/server'
import { uploadSchema } from './schema'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from '@/lib/firebase/firebaseClient'
import { PrismaClient } from '@repo/database'
import { getServerSession } from 'next-auth'
import axios from 'axios'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const session = await getServerSession()

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
  })

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const formData = await request.formData()

  const { data, error } = uploadSchema.safeParse(formData)

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }

  const { date, type, images } = data

  if (images.length === 0) {
    return NextResponse.json(
      { message: '이미지를 업로드해주세요.' },
      { status: 400 }
    )
  }

  const fileNames: string[] = []

  images.forEach(async (image) => {
    const fileExtension = image.name.split('.').pop()
    const fileName = `${v4()}.${fileExtension}`
    const fileRef = ref(storage, `images/${fileName}`)
    fileNames.push(fileName)

    console.log(fileName)

    await uploadBytes(fileRef, image)
  })

  const meal = await prisma.meal.create({
    data: {
      userId: user.userId,
      date: new Date(date),
      type,
    },
  })

  const items = await prisma.mealItem.createMany({
    data: fileNames.map((fileName) => ({
      mealId: meal.mealId,
      imageName: fileName,
    })),
  })

  return NextResponse.json({ message: 'OK', data: meal })
}
