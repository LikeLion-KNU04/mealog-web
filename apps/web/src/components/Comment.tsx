import Image from 'next/image'

interface CommentProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string
  profileImage: string
  content: string
}

export default function Comment({
  username,
  profileImage,
  content,
  ...props
}: CommentProps) {
  return (
    <div {...props} className="flex flex-row items-start gap-2">
      <Image
        className="rounded-full"
        src={profileImage}
        alt="user Profile"
        width={48}
        height={48}
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold">{username}</div>
          <div className="text-sm text-gray-500">3분 전</div>
        </div>
        <div className="text-base">{content}</div>
      </div>
    </div>
  )
}
