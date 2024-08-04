import SessionGuard from '@/components/common/SessionGuard'
import RegisterFormLayout from './page.layout'

export default function RegisterFormPage() {
  return (
    <SessionGuard>
      <RegisterFormLayout />
    </SessionGuard>
  )
}
