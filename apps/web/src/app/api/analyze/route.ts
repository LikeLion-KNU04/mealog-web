import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@repo/database'
import { getServerSession } from 'next-auth'
import { storage } from '@/lib/firebase/firebaseClient'
import { getBytes, ref } from 'firebase/storage'
import axios, { AxiosError } from 'axios'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const mealItemId = searchParams.get('mealItemId')

  if (!mealItemId) {
    return NextResponse.json(
      { error: 'mealItemId is required' },
      { status: 400 }
    )
  }

  const session = await getServerSession()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const mealItem = await prisma.mealItem.findUnique({
    where: {
      mealItemId,
      meal: {
        user: {
          email: session.user.email,
        },
      },
    },
    include: {
      mealItemAnalysis: true,
    },
  })

  if (!mealItem) {
    return NextResponse.json({ error: 'mealItem not found' }, { status: 404 })
  }

  if (mealItem.mealItemAnalysis) {
    return NextResponse.json(
      { error: 'mealItemAnalysis already exists' },
      { status: 400 }
    )
  }

  const reference = ref(storage, `images/${mealItem.imageName}`)
  const bytes = await getBytes(reference)

  const file = new File([bytes], mealItem.imageName)

  const formData = new FormData()
  formData.append('file', file)

  try {
    var r = await axios.post(`${process.env.AI_API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (_e) {
    const e = _e as AxiosError

    return NextResponse.json(
      { message: 'Failed to analyze', error: e.response?.data },
      { status: 500 }
    )
  }

  const analysisData =
    typeof r.data === 'string'
      ? JSON.parse(r.data.replace(/NaN/g, '0.0'))
      : r.data

  const analysisResult = analysisData.result.result[0]

  if (!analysisResult) {
    return NextResponse.json({ message: 'No analysis result' }, { status: 400 })
  }

  const mealItemAnalysis = await prisma.mealItemAnalysis.create({
    data: {
      mealItemId: mealItem.mealItemId,
      classId: analysisResult.cls,
      className: analysisResult.class,
      confidence: analysisResult.confidence,
      amount: analysisResult.nut.food_amount,
      kcal: analysisResult.nut.food_kcal,
      carbohydrate: analysisResult.nut.food_carbohydrate,
      sugar: analysisResult.nut.food_sugar,
      fat: analysisResult.nut.food_fat,
      protein: analysisResult.nut.food_protein,
      calcium: analysisResult.nut.food_calcium,
      phosphorus: analysisResult.nut.food_phosphorus,
      natrium: analysisResult.nut.food_natrium,
      kalium: analysisResult.nut.food_kalium,
      magnesium: analysisResult.nut.food_magnesium,
      iron: analysisResult.nut.food_iron,
      zinc: analysisResult.nut.food_zinc,
      cholesterol: analysisResult.nut.food_cholesterol,
      transfat: analysisResult.nut.food_transfat,
    },
  })

  return NextResponse.json({ message: 'OK', data: mealItemAnalysis })
}
