import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  productImage: string
  productId: number
  productName: string
  productPrice: number
  productDetail: string
}

export default function ProductCard({
  productImage,
  productId,
  productName,
  productPrice,
  productDetail,
  ...props
}: ProductCardProps) {
  return (
    <div {...props} className="flex flex-col w-full">
      <Link href={'/market/' + productId}>
        <Image
          className="w-full object-cover aspect-square"
          src={productImage}
          alt="product Image"
          width={200}
          height={200}
        />
      </Link>
      <div className="text-base text-gray-500">{productDetail}</div>
      <Link href={'/market/' + productId}>
        <div className="text-lg">{productName}</div>
      </Link>
      <div className="text-xl">
        <b>{productPrice.toLocaleString('ko-KR')}</b>원
      </div>
    </div>
  )
}
