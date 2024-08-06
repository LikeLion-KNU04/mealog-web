import ArticleCard from '@/components/ArticleCard'
import MainLayout from '@/components/MainLayout'
import { Meal, MealItem, User } from '@repo/database'

interface BoardPageLayoutProps {
  meals: (Meal & { mealItems: MealItem[]; user: User })[]
  imageUrls: Record<string, string>
}

export default function BoardPageLayout({
  meals,
  imageUrls,
}: BoardPageLayoutProps) {
  return (
    <MainLayout>
      <div className="container mx-auto px-36 py-12">
        <div className="text-primary-800 text-3xl font-semibold flex items-center gap-2 pb-4">
          <span>게시판</span>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {meals.map((meal) => (
            <ArticleCard
              key={meal.mealId}
              meal={meal}
              user={meal.user}
              imageUrl={imageUrls[meal.mealId]}
            />
          )) || <div className="">아직 쓴 글이 없습니다!</div>}
        </div>
      </div>
    </MainLayout>
  )
}
