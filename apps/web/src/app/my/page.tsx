import UserGuard from '@/components/common/UserGuard'
import MyPageLayout from './page.layout'

export default function MyPage() {
  return (
    <UserGuard>
      <MyPageLayout />
    </UserGuard>
  )
}
