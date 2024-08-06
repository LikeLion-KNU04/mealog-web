'use client'

import { bannerImg, logoWhite } from '@/assets'
import MainLayout from '@/components/MainLayout'
import {
  IconArrowRight,
  IconCell,
  IconMilk,
  IconPizza,
  IconPlant,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { Line } from 'react-chartjs-2'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { User, Meal, MealItem, MealItemAnalysis } from '@repo/database'
import { Session } from 'next-auth'
import clsx from 'clsx'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface DashboardPageProps {
  session: Session
  user: User
  meals: (Meal & {
    mealItems: (MealItem & { mealItemAnalysis: MealItemAnalysis | null })[]
  })[]
}

export default function DashboardPage({
  session,
  user,
  meals,
}: DashboardPageProps) {
  const uploadedToday = meals.filter(
    (meal) => meal.date.toDateString() === new Date().toDateString()
  )

  const mealsWeek = meals.filter(
    (meal) =>
      meal.date >= new Date(new Date().setDate(new Date().getDate() - 7))
  )

  let totalCarbohydrate = 0
  let totalProtein = 0
  let totalFat = 0
  let totalSugar = 0

  mealsWeek.forEach((meal) => {
    meal.mealItems.forEach((mealItem) => {
      if (mealItem.mealItemAnalysis) {
        totalCarbohydrate += mealItem.mealItemAnalysis.carbohydrate
        totalProtein += mealItem.mealItemAnalysis.protein
        totalFat += mealItem.mealItemAnalysis.fat
        totalSugar += mealItem.mealItemAnalysis.sugar
      }
    })
  })

  const weeklyAverageCarbohydrate = totalCarbohydrate / mealsWeek.length
  const weeklyAverageProtein = totalProtein / mealsWeek.length
  const weeklyAverageFat = totalFat / mealsWeek.length
  const weeklyAverageSugar = totalSugar / mealsWeek.length

  return (
    <MainLayout>
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          className="object-cover brightness-50 blur-sm scale-105"
          src={bannerImg}
          alt="random"
          fill
        />
        <div className="absolute container mx-auto px-36 inset-0 flex items-center">
          <div className="text-white tracking-tight">
            <div className="font-light text-3xl pb-3">
              모두의 건강한 식사를 위한
            </div>
            <div className="flex items-center gap-4">
              <div className="font-bold text-4xl">
                AI 기반 영양 분석 및 식단 추천 서비스
              </div>
              <Image src={logoWhite} alt="logo" width={120} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-36 py-16 flex gap-24">
        <div className="w-1/5">
          <Image
            className="rounded-full"
            src={session?.user?.image ?? ''}
            alt="random"
            width={120}
            height={120}
          />
          <div className="text-2xl font-bold py-6">{user.name}</div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-4">
              <div className="text-gray-600">분석한 식사 개수</div>
              <div className="font-medium">{meals.length}개</div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="text-gray-600">내 평균 영양점수</div>
              <div className="font-medium text-primary-600 flex items-center gap-2">
                <IconPlant size={20} strokeWidth={1.25} />
                <span>89.9</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grow">
          <div
            className={clsx(
              'flex gap-4 justify-between items-center rounded-xl px-6 py-5 mb-8',
              uploadedToday.length
                ? 'bg-primary-100 text-primary-700'
                : 'bg-zinc-100'
            )}
          >
            <div>
              <div className="text-xl font-bold pb-2">
                {uploadedToday.length
                  ? '오늘 음식 사진을 올렸습니다!'
                  : '오늘 음식 사진을 올리지 않았어요'}
              </div>
              <div className="text-sm text-zinc-500">
                음식 사진을 올리고 영양 분석 및 식단 추천을 받아보세요!
              </div>
            </div>

            <Link href="/upload">
              <button className="px-3 py-2 rounded-xl flex gap-2 items-center hover:bg-black/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <span>분석하기</span>
                <IconArrowRight size={20} strokeWidth={1.25} />
              </button>
            </Link>
          </div>

          <div className="text-2xl font-bold py-3">
            {user.name}님의 일평균 영양 현황
          </div>

          <div className="grid grid-cols-4 gap-4 py-3 mb-6">
            <div className="rounded-xl bg-gray-100 p-6">
              <div className="text-xl font-bold pb-3 flex items-center gap-2">
                <IconCell />
                <span>탄수화물</span>
              </div>
              <div className="w-full bg-primary-200 my-1">
                <div
                  className="bg-primary-600 h-1"
                  style={{
                    width: `${mealsWeek.length ? Math.min((weeklyAverageCarbohydrate / 130) * 100, 100) : 0}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-600">
                  {mealsWeek.length
                    ? Math.round(weeklyAverageCarbohydrate * 10) / 10
                    : '-'}{' '}
                  g
                </span>
                <span className="text-gray-500">권장량 130g</span>
              </div>
            </div>

            <div className="rounded-xl bg-gray-100 p-6">
              <div className="text-xl font-bold pb-3 flex items-center gap-2">
                <IconMilk />
                <span>단백질</span>
              </div>
              <div className="w-full bg-primary-200 my-1">
                <div
                  className="bg-primary-600 h-1"
                  style={{
                    width: `${mealsWeek.length ? Math.min((weeklyAverageProtein / 130) * 100, 100) : 0}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-600">
                  {mealsWeek.length
                    ? Math.round(weeklyAverageProtein * 10) / 10
                    : '-'}{' '}
                  g
                </span>
                <span className="text-gray-500">권장량 130g</span>
              </div>
            </div>

            <div className="rounded-xl bg-gray-100 p-6">
              <div className="text-xl font-bold pb-3 flex items-center gap-2">
                <IconMilk />
                <span>당류</span>
              </div>
              <div className="w-full bg-primary-200 my-1">
                <div
                  className="bg-primary-600 h-1"
                  style={{
                    width: `${mealsWeek.length ? Math.min((weeklyAverageSugar / 130) * 100, 100) : 0}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-600">
                  {mealsWeek.length
                    ? Math.round(weeklyAverageSugar * 10) / 10
                    : '-'}{' '}
                  g
                </span>
                <span className="text-gray-500">권장량 130g</span>
              </div>
            </div>

            <div className="rounded-xl bg-gray-100 p-6">
              <div className="text-xl font-bold pb-3 flex items-center gap-2">
                <IconPizza />
                <span>지방</span>
              </div>
              <div className="w-full bg-primary-200 my-1">
                <div
                  className="bg-primary-600 h-1"
                  style={{
                    width: `${mealsWeek.length ? Math.min((weeklyAverageFat / 130) * 100, 100) : 0}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-600">
                  {mealsWeek.length
                    ? Math.round(weeklyAverageFat * 10) / 10
                    : '-'}{' '}
                  g
                </span>
                <span className="text-gray-500">권장량 130g</span>
              </div>
            </div>
          </div>

          <div className="text-2xl font-bold py-3">
            {user.name}님의 영양섭취량
          </div>

          <div className="pb-12">
            <Line
              data={{
                labels: [
                  '07/26',
                  '07/27',
                  '07/28',
                  '07/29',
                  '07/30',
                  '07/31',
                  '08/01',
                ],
                datasets: [
                  {
                    label: '탄수화물',
                    data: [122, 134, 147, 152, 169, 171, 184],
                    fill: false,
                    borderColor: 'rgb(54, 162, 235)',
                  },
                  {
                    label: '단백질',
                    data: [56, 71, 65, 43, 55, 89, 74],
                    fill: false,
                    borderColor: 'rgb(118, 192, 75)',
                  },
                  {
                    label: '지방',
                    data: [54, 75, 24, 65, 66, 85, 67],
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                  },
                ],
              }}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (item) =>
                        `${item.dataset.label}: ${item.formattedValue}g`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
