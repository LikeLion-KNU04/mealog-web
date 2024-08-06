'use client'

import { IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { RegisterForm1, RegisterForm2 } from './page.component'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { redirect, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export interface RegisterFormState {
  name: string
  gender: string
  birthDate: Date
  height: number
  weight: number
}

const MAX_STEP = 2

export default function RegisterFormLayout() {
  const [step, setStep] = useState(1)
  const router = useRouter()

  const methods = useForm<RegisterFormState>({})

  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<RegisterFormState> = (data) => {
    if (step === MAX_STEP) {
      axios.post('/api/members', data).then((res) => {
        toast.success('성공적으로 회원가입 처리되었습니다!', {
          duration: 3000,
        })
        setTimeout(() => {
          window.location.assign('/')
        }, 1000)
      })
    }
  }

  return (
    <div className="h-screen">
      <div className="fixed top-0 right-0 p-5">
        <Link href="/login" className="text-gray-500">
          <IconX size={36} />
        </Link>
      </div>
      <div className="container flex flex-col max-w-screen-md h-full px-24 mx-auto py-12">
        <div className="text-primary-500">
          단계 {step}/{MAX_STEP}
        </div>
        <div className="bg-gray-200 h-1 mb-12">
          <div
            className="h-1 bg-primary-600 transition-all duration-300 ease-in-out"
            style={{
              width: `${(step / MAX_STEP) * 100}%`,
            }}
          />
        </div>

        <FormProvider {...methods}>
          <form
            className="h-full flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {[RegisterForm1, RegisterForm2].map((Children, index) => {
                return (
                  step === index + 1 && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: 'easeInOut',
                      }}
                    >
                      <Children />
                    </motion.div>
                  )
                )
              })}
            </AnimatePresence>

            <div className="py-6 flex gap-4 mt-auto">
              {step > 1 && (
                <button
                  type="button"
                  className="w-full px-6 py-2 border border-primary-600 hover:border-primary-500 transition-all duration-200 text-primary-600 rounded-xl"
                  onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                >
                  이전으로
                </button>
              )}
              {step < MAX_STEP ? (
                <button
                  type="button"
                  className="w-full px-6 py-2 bg-primary-600 hover:bg-primary-500 transition-all duration-200 text-white rounded-xl"
                  onClick={() =>
                    setStep((prev) => Math.min(MAX_STEP, prev + 1))
                  }
                >
                  다음으로
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-primary-600 hover:bg-primary-500 transition-all duration-200 text-white rounded-xl"
                >
                  가입하기
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
