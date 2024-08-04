'use client'

import { introImg, logoPrimary } from '@/assets'
import Button from '@/components/Button'
import MainLayout from '@/components/MainLayout'
import Image from 'next/image'
import Link from 'next/link'

export function IntroPage() {
  return (
    <MainLayout>
      <div className="h-screen flex flex-col justify-center bg-primary-100">
        <div className="container mx-auto px-24 flex justify-between items-center">
          <div className="">
            <div className="text-4xl font-light text-primary-600 pb-6">
              모두의 건강한 식사를 위한
            </div>
            <div className="flex gap-6 items-center pb-12">
              <div className="text-5xl font-extrabold text-primary-600">
                영양 분석 및 식단 추천 서비스
              </div>
              <div>
                <Image src={logoPrimary} alt="logo" height={80} />
              </div>
            </div>

            <Link href="/login">
              <Button type="button" className="text-xl px-8">
                시작하기
              </Button>
            </Link>
          </div>
          <div className="flex w-1/3">
            <Image src={introImg} alt="intro" width={520} className="w-full" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-36"></div>
    </MainLayout>
  )
}
