import Image from 'next/image'
import { Meal, User } from '@repo/database'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import Link from 'next/link'

dayjs.locale('ko')
dayjs.extend(relativeTime)

interface ArticleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  meal: Meal
  user: User
  imageUrl: string
}

export default function ArticleCard({
  meal,
  imageUrl,
  user,
  ...props
}: ArticleCardProps) {
  return (
    <Link href={`/board/${meal.mealId}`}>
      <div
        {...props}
        className="bg-white shadow-2xl shadow-black/10 rounded-xl"
      >
        <div className="flex items-center gap-2 px-3 py-3">
          <Image
            className="rounded-full"
            src={user.profile ?? ''}
            alt="thumbnail"
            width={36}
            height={36}
          />
          <div className="font-medium text-sm">{user.name}</div>
        </div>

        <Image
          className="w-full h-64 object-cover"
          src={imageUrl}
          alt="thumbnail"
          width={100}
          height={100}
        />

        <div className="p-3">
          <div className="text-lg font-bold">
            {dayjs(meal.date).format('YYYY.MM.DD.')}
          </div>
          <div className="text-gray-500">{dayjs(meal.createdAt).fromNow()}</div>
        </div>
      </div>
    </Link>
  )
}
