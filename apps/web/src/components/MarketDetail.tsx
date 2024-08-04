import { IconChartBubble, IconLayoutGrid, IconMapPin, IconWeight } from "@tabler/icons-react";

interface MarketDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number;
  weight: number;
  calorie: number;
  carbs: number;
  protein: number;
  fat: number;
  origin: string;
}

export default function MarketDetail({
  amount,
  weight,
  calorie,
  carbs,
  protein,
  fat,
  origin,
  ...props
}: MarketDetailProps) {
  return (
    <div {...props} className="flex flex-col w-full gap-2">
      <div className="text-2xl font-bold">
        상품 정보
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <IconLayoutGrid size={24} />
          <div className="text-lg font-bold">
            수량(개)
          </div>
        </div>
        <div className="text-lg">
          {amount}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <IconMapPin size={24} />
          <div className="text-lg font-bold">
            원산지
          </div>
        </div>
        <div className="text-lg">
          {origin}
        </div>
      </div>
      <div className="text-2xl font-bold">
        1회 제공량 기준 영양 정보
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <IconWeight size={24} />
          <div className="text-lg font-bold">
            중량 (g)
          </div>
        </div>
        <div className="text-lg">
          {weight}
        </div>
      </div>
      <div className="flex items-start justify-between gap-2">
        <IconChartBubble size={24} />
        <div className="flex flex-col flex-grow gap-1">
          <div className="text-lg font-bold">
            영양 성분
          </div>
          <div className="flex justify-between w-full">
            <div className="text-lg ">
              열량(kcal)
            </div>
            <div className="text-lg">
              {calorie}
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="text-lg ">
              탄수화물(g)
            </div>
            <div className="text-lg">
              {carbs}
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="text-lg">
              단백질(g)
            </div>
            <div className="text-lg">
              {protein}
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="text-lg">
              지방(g)
            </div>
            <div className="text-lg">
              {fat}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}