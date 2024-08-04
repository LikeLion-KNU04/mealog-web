'use client'

import Button from '@/components/Button'
import MainLayout from '@/components/MainLayout'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import { Fragment } from 'react'

export default function MyPageLayout() {
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
              <div className="text-3xl font-semibold pb-4">사용자 이름</div>
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
                  댓글
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
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 9 }).map((_, index) => (
                  <Image
                    key={index}
                    className="w-full rounded-2xl"
                    src={`https://picsum.photos/200/200?random=${index}`}
                    alt="post"
                    width={160}
                    height={160}
                  />
                ))}
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
