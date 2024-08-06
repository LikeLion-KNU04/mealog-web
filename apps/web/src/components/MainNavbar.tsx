'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IconSearch, IconBell } from '@tabler/icons-react'
import { usePathname, useRouter } from 'next/navigation'
import { logo } from '@/assets'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import toast from 'react-hot-toast'

export default function MainNavbar() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="fixed border-b border-black/[7%] top-0 inset-x-0 h-16 bg-white z-[999]">
      <div className="container px-36 mx-auto flex h-full justify-between items-center">
        <div className="flex h-full items-center gap-4">
          <Link href="/">
            <Image priority src={logo} alt="" height={32} />
          </Link>

          <div className="flex h-full pt-5 gap-6 px-2 text-[15px]">
            <NavLink href="/board" name="게시판" />
            <NavLink href="/upload" name="식사 분석" />
            <NavLink href="/market" name="마켓" />
          </div>
        </div>

        <div className="flex h-full items-center gap-5 px-2 text-sm">
          <div className="flex gap-4 items-center text-black/75"></div>
          <div className="h-4 border-r border-black/20" />
          {session?.user ? (
            <Popover className="relative flex items-center">
              <PopoverButton className="outline-none">
                <Image
                  src={session.user.image ?? ''}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full w-10 h-10"
                />
              </PopoverButton>
              <PopoverPanel
                anchor="bottom"
                className="mt-2 bg-white border p-1 rounded-xl flex flex-col items-start z-[999]"
              >
                <Link
                  href="/my"
                  className="hover:bg-gray-100 transition-all duration-200 rounded-lg px-3 py-2 w-full"
                >
                  마이페이지
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    signOut({
                      redirect: false,
                    }).then(() => {
                      router.push('/')
                      if (window.location.pathname === '/') {
                        window.location.reload()
                      }
                      toast.success('로그아웃 되었습니다.', {
                        duration: 3000,
                      })
                    })
                  }
                  className="text-left text-red-500 hover:bg-red-50 transition-all duration-200 rounded-lg px-3 py-2 w-full"
                >
                  로그아웃
                </button>
              </PopoverPanel>
            </Popover>
          ) : (
            <div className="flex items-center gap-5">
              <Link href="/login">로그인</Link>
              <Link href="/login">
                <button
                  type="button"
                  className="bg-primary-600 text-white rounded-xl px-3.5 py-1.5"
                >
                  회원가입
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface NavLinkProps {
  href: string
  name: string
  exact?: boolean
}

export function NavLink({ href, name, exact = false }: NavLinkProps) {
  const pathname = usePathname()

  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <div
      className={clsx(
        isActive ? 'border-b-2 border-primary-600 font-bold' : 'font-medium'
      )}
    >
      <Link
        href={href}
        className={clsx(
          isActive
            ? 'text-primary-600'
            : 'hover:text-primary-600 transition-all duration-200'
        )}
      >
        {name}
      </Link>
    </div>
  )
}
