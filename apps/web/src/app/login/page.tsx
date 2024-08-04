import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import LoginPageLayout from './page.layout'
import { PrismaClient } from '@repo/database'

const prisma = new PrismaClient()

export default async function LoginPage() {
  const session = await getServerSession()

  if (session?.user) {
    let user = await prisma.user.findUnique({
      where: {
        email: session.user.email!,
      },
    })

    if (!user) {
      return redirect('/register')
    }

    return redirect('/')
  }

  return <LoginPageLayout />
}
