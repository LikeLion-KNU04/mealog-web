'use client'

import Button from '@/components/Button'
import MainLayout from '@/components/MainLayout'
import { Radio, RadioGroup } from '@headlessui/react'
import {
  IconArrowRight,
  IconCircle,
  IconCircleCheck,
  IconUpload,
  IconX,
} from '@tabler/icons-react'
import axios from 'axios'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface UploadFormState {
  date: Date
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'etc'
  images: File[]
}

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { register, watch, control, setValue, handleSubmit } =
    useForm<UploadFormState>({
      defaultValues: {
        images: [],
      },
    })

  const [dragOver, setDragOver] = useState<boolean>(false)

  const { images } = watch()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files) {
      setValue('images', [...images, ...Array.from(files)])
    }
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)

    if (e.dataTransfer) {
      const file = e.dataTransfer.files[0]

      if (file) {
        const fileName = file.name
        const fileNameSplit = fileName.split('.')
        const fileExtension = fileNameSplit[fileNameSplit.length - 1]
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
          setValue('images', [...images, file])
        } else {
          toast.error('이미지 파일만 업로드 가능합니다.')
        }
      }
    }
  }

  const onSubmit: SubmitHandler<UploadFormState> = (data) => {
    if (data.images.length === 0) {
      toast.error('이미지를 업로드해주세요.')
      return
    }

    const formData = new FormData()

    formData.append('date', data.date.toISOString())
    formData.append('type', data.type)
    data.images.forEach((image) => {
      formData.append('images', image)
    })

    axios
      .post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('분석이 완료되었습니다.')
        } else {
          toast.error('분석에 실패했습니다.')
        }
      })
  }

  return (
    <MainLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto px-36 py-16">
          <div className="pb-12">
            <div className="text-primary-800 text-3xl font-semibold flex items-center gap-2 pb-4">
              <IconUpload size={28} />
              <span>식사 사진 업로드</span>
            </div>

            <div className="text-gray-500 font-regular">
              식사 사진을 업로드하면 AI가 음식을 인식, 영양 정보를 분석하여
              사용자 맞춤 건강 식단을 추천받을 수 있습니다! 게시판에도 나의
              식단을 공유해보세요.
            </div>
          </div>

          <div className="flex gap-6 py-6 mb-6 border bg-white rounded-xl px-6">
            <div>
              <div className="font-bold pb-3 text-gray-700">식사 일자</div>
              <input
                type="date"
                className="w-64 border border-gray-300 rounded-xl px-3 py-1"
                {...register('date', {
                  required: true,
                  valueAsDate: true,
                })}
              />
            </div>

            <div>
              <div className="font-bold pb-3 text-gray-700">식사 시간</div>
              <Controller
                control={control}
                name="type"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <RadioGroup {...field} className="flex gap-2 py-1">
                    {[
                      ['아침', 'breakfast'],
                      ['점심', 'lunch'],
                      ['저녁', 'dinner'],
                      ['간식', 'snack'],
                      ['기타', 'etc'],
                    ].map(([label, value]) => (
                      <Radio
                        key={value}
                        value={value}
                        as="button"
                        type="button"
                      >
                        {({ checked }) => (
                          <div
                            className={clsx(
                              'flex items-center gap-1 transition-all duration-200',
                              checked
                                ? 'text-primary-700 font-semibold'
                                : 'text-gray-400'
                            )}
                          >
                            {checked ? <IconCircleCheck /> : <IconCircle />}
                            <span>{label}</span>
                          </div>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          <div className="flex items-center pb-6 gap-12">
            <button
              type="button"
              className={clsx(
                'w-full h-full py-24 rounded-xl flex flex-col justify-center items-center bg-gray-100 text-gray-500',
                dragOver &&
                  'border border-primary-500 bg-primary-200 transition-colors duration-200'
              )}
              onClick={() => inputRef.current?.click()}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="pointer-events-none">
                <div className="text-2xl font-semibold pb-4">
                  드래그 앤 드롭하여 식사 사진 업로드
                </div>
                <div className="text-xl">또는 클릭하여 직접 업로드</div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-6 gap-4 pb-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="col-span-1 aspect-square border relative bg-gray-100 rounded-xl"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="object-cover w-full h-full rounded-xl"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setValue(
                      'images',
                      images.filter((_, i) => i !== index)
                    )
                  }}
                >
                  <IconX size={24} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end py-6">
            <Button type="submit" className="flex items-center gap-2 text-lg">
              <IconArrowRight />
              <span>분석하기</span>
            </Button>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          className="hidden"
          multiple
          onChange={handleFileSelect}
        />
      </form>
    </MainLayout>
  )
}
