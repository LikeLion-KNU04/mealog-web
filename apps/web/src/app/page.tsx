'use client'

import { useSession } from 'next-auth/react'
import { IntroPage } from './intro.page'
import DashboardPage from './dashboard.page'

export default function MainPage() {
  const { data: session } = useSession() //세션 정보를 가져옴
  console.log(session?.user?.image)

  if (!session?.user) {
    return <IntroPage />
  } else {
    return <DashboardPage />
  }
}
