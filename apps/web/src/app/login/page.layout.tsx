'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  appleLogoWhite,
  googleLogo,
  kakaoLogo,
  logo,
  naverLogoWhite,
} from '@/assets'
import { signIn } from 'next-auth/react'

export default function LoginPageLayout() {
  return (
    <>
      <div className="bg-primary-300">
        <div className="container max-w-screen-xl h-screen mx-auto px-24 py-24">
          <div className="flex items-center gap-24 h-full">
            <div className="w-1/2">
              <Image src={logo} alt="logo" />
              <div className="py-8 text-2xl font-light">
                모두의 건강한 식사를 위한 영양 분석 및 식단 추천 서비스
              </div>

              <div>로그인하여 건강한 식습관 관리를 시작하세요!</div>
            </div>
            <div className="w-1/2 p-12 h-full bg-white/50 rounded-xl shadow-xl">
              <div className="flex justify-center">
                <Image src={logo} alt="logo" className="w-24" />
              </div>

              <div className="py-12 flex flex-col w-full gap-2">
                <button
                  type="button"
                  className="px-6 py-3 bg-white border rounded-xl flex items-center gap-4"
                  onClick={() => signIn('google')}
                >
                  <Image src={googleLogo} alt="" width={24} height={24} />
                  <div className="text-center w-full">구글 계정으로 로그인</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
