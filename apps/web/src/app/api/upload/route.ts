import { NextRequest, NextResponse } from 'next/server'
import { uploadSchema } from './schema'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from '@/lib/firebase/firebaseClient'
import { PrismaClient } from '@repo/database'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
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
      date: new Date(date),
      type,
    },
  })

  const items = await prisma.mealItem.createMany({
    data: fileNames.map((fileName) => ({
      mealId: meal.mealId,
      imageUrl: `images/${fileName}`,
    })),
  })

  return NextResponse.json({ message: 'OK', data: meal })
}
