'use client'

import Comment from '@/components/Comment'
import MainLayout from '@/components/MainLayout'
import Nutrient from '@/components/Nutrient'
import { Meal, MealItem, MealItemAnalysis, User } from '@repo/database'
import {
  IconBookmark,
  IconChevronLeft,
  IconChevronRight,
  IconHeart,
  IconShare,
} from '@tabler/icons-react'
import Image from 'next/image'
import { useState } from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(relativeTime)

interface BoardDetailPageProps {
  user: User
  meal: Meal & {
    mealItems: (MealItem & { mealItemAnalysis: MealItemAnalysis | null })[]
  }
  imageUrls: string[]
}

export default function BoardDetailPageLayout({
  user,
  meal,
  imageUrls,
}: BoardDetailPageProps) {
  const imageLength = 5
  const [index, setIndex] = useState(0)
  const moveIndex = (offset: number) => {
    if (0 <= index + offset && index + offset < imageLength)
      setIndex(index + offset)
    else if (0 > index + offset) setIndex(0)
    else setIndex(imageLength - 1)
  }

  const totalCarboHydrates = meal.mealItems.reduce(
    (acc, mealItem) => acc + (mealItem.mealItemAnalysis?.carbohydrate ?? 0),
    0
  )
  const totalProtein = meal.mealItems.reduce(
    (acc, mealItem) => acc + (mealItem.mealItemAnalysis?.protein ?? 0),
    0
  )
  const totalFat = meal.mealItems.reduce(
    (acc, mealItem) => acc + (mealItem.mealItemAnalysis?.fat ?? 0),
    0
  )
  const totalSugar = meal.mealItems.reduce(
    (acc, mealItem) => acc + (mealItem.mealItemAnalysis?.sugar ?? 0),
    0
  )

  return (
    <MainLayout>
      <div className="container mx-auto flex items-start gap-5 px-32 py-16">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              moveIndex(-1)
            }}
          >
            <IconChevronLeft />
          </button>
          <div className="flex flex-row overflow-hidden" style={{ width: 512 }}>
            <div
              className="flex"
              style={{
                transform: `translateX(-${index * 512}px)`,
                transition: 'ease-in-out 250ms',
              }}
            >
              {imageUrls.map((imageUrl, index) => (
                <Image
                  key={index}
                  src={imageUrl}
                  alt=""
                  width={512}
                  height={512}
                  className="w-[512px] h-[512px] aspect-square object-cover rounded-2xl border"
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              moveIndex(1)
            }}
          >
            <IconChevronRight />
          </button>
        </div>
        <div className="flex flex-col flex-grow gap-6 p-6 rounded-xl border shadow-black/10">
          <div className="flex items-center gap-3">
            <Image
              className="rounded-full"
              alt="profile Image"
              src={user.profile ?? ''}
              width={32}
              height={32}
            />
            <div className="text-xl">{user.name}</div>
            <div className="text-base text-gray-500">
              {dayjs(meal.createdAt).fromNow()} 게시
            </div>
          </div>

          <div>
            <Nutrient
              carbs={totalCarboHydrates}
              protein={totalProtein}
              fat={totalFat}
              sugars={totalSugar}
            />
          </div>
          <div className="flex flex-row py-5 border rounded-lg justify-evenly ">
            <button type="button">
              <IconHeart />
            </button>
            <button type="button">
              <IconBookmark />
            </button>
            <button type="button">
              <IconShare />
            </button>
          </div>
          <div className="text-lg">댓글 1개</div>
          <div className="flex flex-col gap-5">
            <Comment
              profileImage="https://picsum.photos/200/200?random=2"
              username="황부연"
              content="멋사 해커톤 화이팅!"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              className="grow px-3 py-2 border rounded-xl bg-white"
              placeholder="댓글 입력..."
            />
            <button
              type="button"
              className="bg-primary-600 text-sm text-white rounded-xl px-4 py-2"
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
