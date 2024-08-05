"use client"
import MainLayout from "@/components/MainLayout";
import MarketDetail from "@/components/MarketDetail";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ProductPage() {
    const router = usePathname();
    return (
        <MainLayout>
            <div>
                <div className="flex items-start justify-center gap-32 p-8">
                    <Image
                        src="https://picsum.photos/512/512"
                        alt="product Image"
                        width={512}
                        height={512}
                    />
                    <div className="flex flex-col w-1/3 gap-5">
                        <div>
                            <div className="text-4xl font-bold">
                                저당고단백 도시락
                            </div>
                            <div className="text-lg text-gray-500">
                                영양 만점 도시락!
                            </div>
                        </div>
                        <MarketDetail
                            amount={1}
                            price={10000}
                            weight={100}
                            calorie={300}
                            carbs={200}
                            protein={100}
                            fat={12}
                            origin={"국내산"}
                        />
                        <div className="flex items-center justify-between p-4 bg-gray-200">
                            <div>
                                저당고단백 도시락
                            </div>
                            <input
                                className="w-16 p-2"
                                type="number"
                                defaultValue={1}>
                            </input>
                            <div className="font-bold">
                                10,000원
                            </div>
                        </div>
                        <div className="flex gap-3 justify-evenly">
                            <button
                                type="button"
                                className="flex justify-center w-1/2 gap-3 p-5 text-lg bg-gray-200 rounded-lg "
                            >
                                장바구니에 담기
                            </button>
                            <button
                                type="button"
                                className="flex justify-center w-1/2 gap-3 p-5 text-lg text-white rounded-lg bg-primary-600"
                            >
                                구매
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}