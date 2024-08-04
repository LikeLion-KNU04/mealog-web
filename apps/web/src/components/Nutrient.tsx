import { IconBaguette, IconDroplet, IconMeat } from "@tabler/icons-react"


interface NutrientProps extends React.HTMLAttributes<HTMLDivElement> {
  carbs: number
  protein: number
  fat: number
}

export default function Nutrient({
  carbs,
  protein,
  fat,
  ...props
}: NutrientProps) {
  const totalNutrient = carbs + protein + fat
  return (
    <div {...props} className="w-full">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col justify-between gap-3 px-3 py-3 bg-orange-300 rounded-lg" style={{ width: (carbs / totalNutrient * 100) + "%" }}>
          <div className="flex items-center justify-between gap-1">
            <IconBaguette size={32} color="white" />
            <div className="text-xl font-bold leading-7 text-white">
              {(carbs / totalNutrient * 100).toFixed(0)}%
            </div>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-1">
            <div className="text-2xl font-bold text-white">
              탄수화물
            </div>
            <div className="text-xl text-white">
              {carbs}g
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 px-3 py-3 bg-red-600 rounded-lg" style={{ width: (protein / totalNutrient * 100) + "%" }}>
          <div className="flex items-center justify-between gap-1">
            <IconMeat size={32} color="white" />
            <div className="text-xl font-bold leading-7 text-white">
              {(protein / totalNutrient * 100).toFixed(0)}%
            </div>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-1">
            <div className="text-2xl font-bold text-white">
              단백질
            </div>
            <div className="text-xl text-white">
              {protein}g
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 px-3 py-3 bg-yellow-500 rounded-lg" style={{ width: (fat / totalNutrient * 100) + "%" }}>
          <div className="flex items-center justify-between gap-1">
            <IconDroplet size={32} color="white" />
            <div className="text-xl font-bold leading-7 text-white">
              {(fat / totalNutrient * 100).toFixed(0)}%
            </div>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-1">
            <div className="text-2xl font-bold text-white">
              지방
            </div>
            <div className="text-xl text-white">
              {fat}g
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}