'use client'

import MainLayout from '@/components/MainLayout'
import { Meal, MealItem } from '@repo/database'
import { IconFileAnalytics, IconUpload } from '@tabler/icons-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

interface AnalyzePageLayoutProps {
  mealId: string
  meal: Meal
  mealItems: MealItem[]
}

export default function AnalyzePageLayout({
  mealId,
  meal,
  mealItems,
}: AnalyzePageLayoutProps) {
  const router = useRouter()
  const [successCount, setSuccessCount] = useState(0)

  const totalCount = mealItems.length

  useEffect(() => {
    ;(async () => {
      for (let mealItem of mealItems) {
        try {
          await axios.post(`/api/analyze?mealItemId=${mealItem.mealItemId}`)
        } catch (error) {
          console.error(error)
        } finally {
          setSuccessCount((count) => count + 1)
        }
      }

      toast.success('분석이 완료되었습니다!')
      setTimeout(
        () => router.push(`/meals/${dayjs(meal.date).format('YYYY-MM-DD')}`),
        2000
      )
    })()
  }, [mealItems])

  console.log(mealItems)
  const progress = (successCount / totalCount) * 100
  console.log(progress)

  return (
    <MainLayout>
      <div className="container mx-auto px-36">
        <div className="h-screen flex flex-col justify-center items-center pb-12">
          <div className="text-primary-800 text-4xl font-extrabold flex items-center gap-2 pb-4">
            <IconFileAnalytics size={36} className="animate-bounce" />
            <span>AI 분석 중입니다...</span>
          </div>

          <div className="text-gray-500 font-regular pb-12">
            업로드하신 사진을 AI가 살펴보고 영양 정보를 분석하고 있어요, 조금만
            기다려주세요!
          </div>

          <div className="w-2/3 bg-gray-200 my-4">
            <div
              className="bg-primary-700 h-1 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-primary-700 font-regular pb-12">
            {successCount} / {totalCount} 개의 사진 분석 완료
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
