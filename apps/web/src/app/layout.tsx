import type { Metadata } from 'next'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'
import AuthContext from '@/context/AuthContext'
import { getServerSession } from 'next-auth'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Mealog',
  description: '밀로그',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()

  return (
    <html lang="ko">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <AuthContext session={session}>
          <NextTopLoader color="#61967E" showSpinner={false} />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
