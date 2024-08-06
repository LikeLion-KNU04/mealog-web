import MainLayout from '@/components/MainLayout'
import ProductCard from '@/components/ProductCard'

export default function MarketPage() {
  return (
    <MainLayout>
      <div className="container mx-auto flex flex-col items-stretch gap-6 px-32 py-8">
        <div className="text-4xl font-bold">밀로그 마켓</div>
        <div className="text-gray-400 text-gl">
          사용자를 위해 건강한 식단을 판매합니다.
        </div>
        <div className="grid grid-cols-4 gap-6">
          <ProductCard
            productImage={'/0.jpeg'}
            productId={1}
            productDetail="It's time to wake up!"
            productName="체크오 아르타민"
            productPrice={12000}
          />
          <ProductCard
            productImage={'/1.webp'}
            productId={1}
            productDetail="뉴질랜드산, 2000mg"
            productName="비타민C 보충제"
            productPrice={12000}
          />
          <ProductCard
            productImage={'/2.webp'}
            productId={1}
            productDetail="미국산"
            productName="초코맛 단백질 쉐이크"
            productPrice={35000}
          />
          <ProductCard
            productImage={'/3.webp'}
            productId={1}
            productDetail="캐나다산"
            productName="저칼로리 에너지바"
            productPrice={3000}
          />
          <ProductCard
            productImage={'/4.webp'}
            productId={1}
            productDetail="독일산"
            productName="멀티비타민 젤리"
            productPrice={15000}
          />
          <ProductCard
            productImage={'/5.webp'}
            productId={1}
            productDetail="국산"
            productName="저당고단백 닭가슴살 도시락"
            productPrice={8500}
          />
        </div>
      </div>
    </MainLayout>
  )
}
