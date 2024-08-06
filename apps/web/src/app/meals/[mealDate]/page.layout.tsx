'use client'

import MainLayout from '@/components/MainLayout'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Meal, MealItem, MealItemAnalysis, User } from '@repo/database'
import { IconChevronDown } from '@tabler/icons-react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import Image from 'next/image'
import 'dayjs/locale/ko'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@/components/Button'
dayjs.locale('ko')

interface MealPageLayoutProps {
  user: User
  mealDate: string
  meals: (Meal & {
    mealItems: (MealItem & { mealItemAnalysis: MealItemAnalysis | null })[]
  })[]
  imageUrls: Record<string, string[]>
}

export default function MealPageLayout({
  user,
  mealDate,
  meals,
  imageUrls,
}: MealPageLayoutProps) {
  let typeStr = ''

  const [totalScore, setTotalScore] = useState(0)
  const [scoreLoaded, setScoreLoaded] = useState(false)

  const handlePublish = (mealId: string) => {
    axios.post('/api/articles', {
      mealId,
    })
  }

  useEffect(() => {
    const nutrientData = {
      kcal: 0,
      carbohydrate: 0,
      sugar: 0,
      fat: 0,
      protein: 0,
      calcium: 0,
      phosphorus: 0,
      natrium: 0,
      kalium: 0,
      magnesium: 0,
      iron: 0,
      zinc: 0,
      cholesterol: 0,
      transfat: 0,
    }

    for (let meal of meals) {
      for (let mealItem of meal.mealItems) {
        for (let k of Object.keys(nutrientData) as Array<
          keyof typeof nutrientData
        >) {
          nutrientData[k] += mealItem.mealItemAnalysis?.[k] ?? 0
        }
      }
    }

    axios
      .post(`http://mealog.kro.kr:5000/score`, {
        user_info: {
          gender: user.gender === 'male' ? 1 : 0,
          age:
            new Date().getFullYear() - new Date(user.birthDate).getFullYear(),
          height: user.height,
          weight: user.weight,
          activity: 2,
        },
        daily_nutrient: nutrientData,
      })
      .then((r) => {
        setTotalScore(80)
      })
  }, [])

  let barColor = ''

  if (totalScore < 50) {
    barColor = 'bg-red-600'
  } else if (totalScore < 80) {
    barColor = 'bg-amber-600'
  } else {
    barColor = 'bg-primary-600'
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-36 py-24 min-h-screen">
        <div className="text-primary-800 pb-8 border-b mb-8 flex justify-between">
          <div className="text-4xl font-bold">
            {dayjs(mealDate).format('YYYY년 MM월 DD일')}
          </div>
        </div>

        <div className="flex gap-8 w-full">
          <div className="">
            <div className="text-2xl font-semibold pb-4">이날의 영양 총평</div>

            <div>
              <div className="w-full bg-gray-200 rounded-xl">
                <div
                  className={clsx('h-2 rounded-xl', barColor)}
                  style={{
                    width: `${totalScore}%`,
                  }}
                />
              </div>
              <div className="">
                총 영양 점수: {Math.round(totalScore * 100) / 100}점
              </div>
            </div>
          </div>
          <div className="grow">
            <div className="text-2xl font-semibold pb-4">이날의 식사들</div>

            <div className="flex flex-col items-start gap-2">
              {meals.map((meal) => {
                switch (meal.type) {
                  case 'breakfast':
                    typeStr = '아침'
                    break
                  case 'lunch':
                    typeStr = '점심'
                    break
                  case 'dinner':
                    typeStr = '저녁'
                    break
                }

                const { mealItems } = meal
                return (
                  <Disclosure
                    as="div"
                    className="bg-gray-100 w-full rounded-xl"
                  >
                    {({ open }) => (
                      <>
                        <DisclosureButton className="px-6 py-4 flex justify-between w-full">
                          <div className="text-left">
                            <div className="text-xl text-primary-800 font-bold pb-2">
                              {typeStr}
                            </div>
                            <div className="flex gap-4">
                              <div className="text-sm grow text-black/60">
                                {mealItems.length}개의 음식
                              </div>
                            </div>
                          </div>
                          <div>
                            <IconChevronDown
                              className={clsx(
                                open ? 'rotate-90' : '',
                                'transition-all duration-200'
                              )}
                              size={28}
                            />
                          </div>
                        </DisclosureButton>

                        <DisclosurePanel
                          transition
                          className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 pb-6 px-6"
                        >
                          <div className="text-xl text-primary-800 font-semibold px-4 pb-4">
                            식품별 분석 정보
                          </div>

                          <div className="flex flex-col gap-6 px-4">
                            {mealItems.map((mealItem, index) => {
                              let { mealItemAnalysis } = mealItem

                              return (
                                <div
                                  key={index}
                                  className="flex gap-12 items-center"
                                >
                                  <Image
                                    src={imageUrls[meal.mealId][index]}
                                    alt=""
                                    width={200}
                                    height={200}
                                    className="object-cover w-48 aspect-square border rounded-xl"
                                  />
                                  {mealItemAnalysis ? (
                                    <div className="w-full">
                                      <div className="flex gap-4 items-center">
                                        <div className="text-xl font-semibold">
                                          {mealItemAnalysis?.className}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          정확도{' '}
                                          {(
                                            mealItemAnalysis?.confidence * 100
                                          ).toFixed(2)}
                                          %
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-7 gap-4 w-full py-6">
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            칼로리
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.kcal.toFixed(2)}{' '}
                                            kcal
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            탄수화물
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.carbohydrate.toFixed(
                                              2
                                            )}{' '}
                                            g
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            당류
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.sugar.toFixed(2)}{' '}
                                            g
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            지방
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.fat.toFixed(2)} g
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            단백질
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.protein.toFixed(
                                              2
                                            )}{' '}
                                            g
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            칼슘
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.calcium.toFixed(
                                              2
                                            )}{' '}
                                            mg
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            인
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.phosphorus.toFixed(
                                              2
                                            )}{' '}
                                            mg
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            나트륨
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.natrium.toFixed(
                                              2
                                            )}{' '}
                                            mg
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            칼륨
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.kalium.toFixed(
                                              2
                                            )}{' '}
                                            mg
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            마그네슘
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.magnesium.toFixed(
                                              2
                                            )}{' '}
                                            mg
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            철분
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.iron.toFixed(2)}{' '}
                                            mg
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            아연
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.zinc.toFixed(2)}{' '}
                                            mg
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            콜레스테롤
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.cholesterol.toFixed(
                                              2
                                            )}{' '}
                                            mg
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          <div className="text-black/60 text-sm">
                                            트랜스지방
                                          </div>
                                          <div className="font-medium">
                                            {mealItemAnalysis?.transfat.toFixed(
                                              2
                                            )}{' '}
                                            g
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="">
                                      <div className="text-xl font-bold">
                                        인식 실패
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>

                          <div className="flex justify-end pt-6">
                            <Button
                              className="text-sm"
                              onClick={() => {
                                if (
                                  confirm(
                                    '이 식사를 게시할까요? 모든 사용자가 볼 수 있습니다.'
                                  )
                                ) {
                                  handlePublish(meal.mealId)
                                }
                              }}
                            >
                              게시글로 등록하기
                            </Button>
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
