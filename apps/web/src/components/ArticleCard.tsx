import Image from 'next/image'

interface ArticleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  date: string
}

export default function ArticleCard({
  title,
  description,
  ...props
}: ArticleCardProps) {
  return (
    <div {...props} className="bg-white shadow-2xl shadow-black/10 rounded-xl">
      <div className="flex items-center gap-2 px-3 py-3">
        <Image
          className="rounded-full"
          src="https://picsum.photos/200/200"
          alt="thumbnail"
          width={36}
          height={36}
        />
        <div className="font-medium text-sm">username</div>
      </div>

      <Image
        className="w-full h-64 object-cover"
        src={`https://picsum.photos/500/500?random=${Math.random()}`}
        alt="thumbnail"
        width={100}
        height={100}
      />

      <div className="p-3">
        <div className="text-lg font-bold">{title}</div>
        <div className="text-gray-500">{description}</div>
      </div>
    </div>
  )
}
