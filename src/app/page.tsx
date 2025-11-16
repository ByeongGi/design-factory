import { getTemplates } from '@/lib/templates/loader'
import { TemplateCard } from '@/components/showcase/template-card'

export default async function HomePage() {
  const templates = await getTemplates()

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">Design Factory</h1>
          <p className="text-xl text-gray-600 mb-6">
            여러 디자인 시스템의 템플릿을 탐색하고 다운로드하세요
          </p>
          <p className="text-gray-500">
            {templates.length}개의 디자인 시스템 템플릿 사용 가능
          </p>
        </header>

        {/* Template Grid */}
        {templates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">템플릿을 불러오는 중...</p>
          </div>
        )}

        {/* Info Section */}
        <section className="mt-16 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">시작하기</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">1. 템플릿 선택</h3>
              <p className="text-sm text-gray-600">
                프로젝트에 맞는 디자인 시스템을 선택하세요
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. 컴포넌트 탐색</h3>
              <p className="text-sm text-gray-600">
                각 템플릿의 컴포넌트와 디자인 토큰을 확인하세요
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. 다운로드</h3>
              <p className="text-sm text-gray-600">
                전체 템플릿을 다운로드하거나 코드를 복사하세요
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
