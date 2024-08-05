'use client'

import MainLayout from '@/components/MainLayout'
import { storage } from '@/lib/firebase/firebaseClient'
import { Meal, MealItem, MealItemAnalysis } from '@repo/database'
import { getDownloadURL, ref } from 'firebase/storage'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface MealPageLayoutProps {
  meal: Meal
  mealItems: (MealItem & { mealItemAnalysis: MealItemAnalysis | null })[]
  imageUrls: string[]
}

export default function MealPageLayout({
  meal,
  mealItems,
  imageUrls,
}: MealPageLayoutProps) {
  let typeStr = ''

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

  return (
    <MainLayout>
      <div className="container mx-auto px-36 py-24">
        <div className="text-3xl text-primary-800 font-bold pb-4">
          {meal.date.toLocaleDateString()} {typeStr}
        </div>
        <div className="flex gap-4">
          <div className="grow text-lg text-black/60">
            {mealItems.length}개의 음식
          </div>
        </div>

        <hr className="my-4" />

        <div className="text-2xl text-primary-800 font-semibold py-6">
          식품별 분석 정보
        </div>

        <div className="flex flex-col gap-6">
          {mealItems.map((mealItem, index) => {
            let { mealItemAnalysis } = mealItem

            return (
              <div key={index} className="flex gap-12 items-center">
                <Image
                  src={imageUrls[index]}
                  alt=""
                  width={200}
                  height={200}
                  className="object-cover w-48 aspect-square border rounded-xl"
                />
                {mealItemAnalysis ? (
                  <div className="w-full">
                    <div className="flex gap-4 items-center pb-2 border-b">
                      <div className="text-xl font-semibold">
                        {mealItemAnalysis?.className}
                      </div>
                      <div className="text-sm text-gray-500">
                        정확도 {(mealItemAnalysis?.confidence * 100).toFixed(2)}
                        %
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4 w-full py-6">
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">칼로리</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.kcal.toFixed(2)} kcal
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">탄수화물</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.carbohydrate.toFixed(2)} g
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">당류</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.sugar.toFixed(2)} g
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">지방</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.fat.toFixed(2)} g
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">단백질</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.protein.toFixed(2)} g
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">칼슘</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.calcium.toFixed(2)} mg
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">인</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.phosphorus.toFixed(2)} mg
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">나트륨</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.natrium.toFixed(2)} mg
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">칼륨</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.kalium.toFixed(2)} mg
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">마그네슘</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.magnesium.toFixed(2)} mg
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">철분</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.iron.toFixed(2)} mg
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">아연</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.zinc.toFixed(2)} mg
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">콜레스테롤</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.cholesterol.toFixed(2)} mg
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-black/60 text-sm">트랜스지방</div>
                        <div className="font-medium">
                          {mealItemAnalysis?.transfat.toFixed(2)} g
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <div className="text-xl font-bold">인식 실패</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </MainLayout>
  )
}
