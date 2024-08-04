'use client'

import Footer from './Footer'
import MainNavbar from './MainNavbar'

interface LayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <MainNavbar />

      <div className="h-16" />

      {children}

      <Footer />
    </>
  )
}
