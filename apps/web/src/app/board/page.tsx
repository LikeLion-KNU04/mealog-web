import ArticleCard from '@/components/ArticleCard'
import MainLayout from '@/components/MainLayout'

export default function BoardPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-36 py-12">
        <div className="grid grid-cols-4 gap-4">
          <ArticleCard
            title="게시판"
            description="게시판입니다."
            date="2021-10-10"
          />
          <ArticleCard
            title="게시판"
            description="게시판입니다."
            date="2021-10-10"
          />
          <ArticleCard
            title="게시판"
            description="게시판입니다."
            date="2021-10-10"
          />
          <ArticleCard
            title="게시판"
            description="게시판입니다."
            date="2021-10-10"
          />
          <ArticleCard
            title="게시판"
            description="게시판입니다."
            date="2021-10-10"
          />
        </div>
      </div>
    </MainLayout>
  )
}
