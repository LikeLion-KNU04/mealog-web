import MainLayout from "@/components/MainLayout";
import ProductCard from "@/components/ProductCard";

export default function MarketPage() {
    return (
        <MainLayout>

            <div className="flex flex-col items-stretch gap-6 px-32 py-8">
                <div className="text-4xl font-bold">
                    밀로그 마켓
                </div>
                <div className="text-gray-400 text-gl">
                    사용자를 위해 건강한 식단을 판매합니다.
                </div>
                <div className="grid grid-cols-4 gap-6">
                    <ProductCard productImage={""} productId={1} productDetail="영양 만점 도시락!" productName="저당고단백 닭가슴살 도시락" productPrice={10000} />
                    <ProductCard productImage={""} productId={1} productDetail="영양 만점 도시락!" productName="저당고단백 닭가슴살 도시락" productPrice={10000} />
                    <ProductCard productImage={""} productId={1} productDetail="영양 만점 도시락!" productName="저당고단백 닭가슴살 도시락" productPrice={10000} />
                    <ProductCard productImage={""} productId={1} productDetail="영양 만점 도시락!" productName="저당고단백 닭가슴살 도시락" productPrice={10000} />
                    <ProductCard productImage={""} productId={1} productDetail="영양 만점 도시락!" productName="저당고단백 닭가슴살 도시락" productPrice={10000} />
                    <ProductCard productImage={""} productId={1} productDetail="영양 만점 도시락!" productName="저당고단백 닭가슴살 도시락" productPrice={10000} />
                </div>
            </div>


        </MainLayout>
    )
}