import { Select } from '@headlessui/react'
import { useFormContext } from 'react-hook-form'
import { RegisterFormState } from './page.layout'
import { useSession } from 'next-auth/react'

export function RegisterForm1() {
  const { register } = useFormContext<RegisterFormState>()

  const { data: session } = useSession()
  return (
    <>
      <div className="pb-4">
        <div className="text-3xl font-semibold pb-4">기본정보를 알려주세요</div>
        <div className="text-gray-800 font-light break-keep">
          기본적인 사용자 정보를 알려주세요!
        </div>
      </div>

      <hr className="mt-4 mb-8" />

      <div className="pb-6">
        <div className="pb-2 text-lg font-bold">이름</div>
        <input
          type="text"
          placeholder="홍길동"
          className="w-64 border border-gray-300 rounded-xl px-4 py-2"
          {...register('name', {
            required: '이름을 입력해주세요',
          })}
        />
      </div>

      <div className="pb-6">
        <div className="pb-2 text-lg font-bold">이메일</div>
        <input
          type="text"
          placeholder="email@example.com"
          className="w-64 border border-gray-300 rounded-xl px-4 py-2 disabled:text-gray-400"
          readOnly
          disabled
          value={session?.user?.email ?? ''}
        />
      </div>

      <div className="pb-6">
        <div className="pb-2 text-lg font-bold">성별</div>
        <Select
          className="border border-gray-300 rounded-xl px-4 py-2 flex items-center gap-2"
          {...register('gender', {
            required: '성별을 선택해주세요',
          })}
        >
          <option value="">선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </Select>
      </div>

      <div className="pb-6">
        <div className="pb-2 text-lg font-bold">생년월일</div>
        <input
          type="date"
          className="w-64 border border-gray-300 rounded-xl px-4 py-2"
          {...register('birthDate', {
            valueAsDate: true,
            required: '생년월일을 입력해주세요',
          })}
        />
      </div>
    </>
  )
}

export function RegisterForm2() {
  const { register, watch } = useFormContext<RegisterFormState>()

  const { name } = watch()

  return (
    <>
      <div className="pb-4">
        <div className="text-3xl font-semibold pb-4">
          {name}님의 신체정보를 알아볼게요
        </div>
        <div className="text-gray-800 font-light break-keep">
          영양 상황 분석을 위해 기본적인 신체 정보를 알려주세요
        </div>
      </div>

      <hr className="mt-4 mb-8" />

      <div className="pb-6">
        <div className="pb-2 text-lg font-bold">키(cm)</div>
        <input
          type="number"
          placeholder="172"
          className="w-64 border border-gray-300 rounded-xl px-4 py-2"
          {...register('height', {
            valueAsNumber: true,
          })}
        />
      </div>

      <div className="pb-6">
        <div className="pb-2 text-lg font-bold">몸무게(kg)</div>
        <input
          type="number"
          placeholder="65"
          className="w-64 border border-gray-300 rounded-xl px-4 py-2"
          {...register('weight', {
            valueAsNumber: true,
          })}
        />
      </div>
    </>
  )
}
