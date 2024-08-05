'use client'

import Button from '@/components/Button'
import MainLayout from '@/components/MainLayout'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import { Fragment } from 'react'
import { User, Meal, MealItem } from '@repo/database'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/lib/firebase/firebaseClient'

interface MyPageLayoutProps {
  user: User
  meals: (Meal & { mealItems: MealItem[] })[]
  imageUrls: Record<string, string>
}

export default function MyPageLayout({
  user,
  meals,
  imageUrls,
}: MyPageLayoutProps) {
  return (
    <MainLayout>
      <div className="container mx-auto px-36 py-12">
        <div className="flex justify-between gap-8 pb-8">
          <div className="flex gap-12 items-center">
            <Image
              src="https://picsum.photos/500/500"
              alt="profile"
              width={160}
              height={160}
              className="rounded-full"
            />
            <div>
              <div className="text-3xl font-semibold pb-4">{user.name}</div>
              <div className="flex gap-4 pb-4">
                <div className="grow text-lg font-light text-black/60">
                  게시글 <span className="font-medium">100</span>
                </div>
                <div className="grow text-lg font-light text-black/60">
                  팔로워 <span className="font-medium">200</span>
                </div>
                <div className="grow text-lg font-light text-black/60">
                  팔로잉 <span className="font-medium">200</span>
                </div>
              </div>

              <div className="text font-light pb-4">자기소개 문구입니다.</div>
            </div>
          </div>
          <div className="">
            <Button variant="outlined" className="w-32 h-12">
              프로필 수정
            </Button>
          </div>
        </div>

        <TabGroup>
          <TabList className="flex gap-4 text-lg items-start my-4 border-b border-primary-200">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx(
                    'px-3 py-3 font-semibold outline-none',
                    selected && 'border-b-2 border-primary-600'
                  )}
                >
                  식사 기록
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx(
                    'px-3 py-3 font-semibold outline-none',
                    selected && 'border-b-2 border-primary-600'
                  )}
                >
                  게시글
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx(
                    'px-3 py-3 font-semibold outline-none',
                    selected && 'border-b-2 border-primary-600'
                  )}
                >
                  영양정보
                </button>
              )}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="">
                {meals.map((meal) => {
                  return (
                    <div key={meal.mealId} className="flex gap-4 py-4">
                      {meal.date.toLocaleDateString()}
                    </div>
                  )
                })}
              </div>
            </TabPanel>
            <TabPanel>Content 2</TabPanel>
            <TabPanel>Content 3</TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </MainLayout>
  )
}
