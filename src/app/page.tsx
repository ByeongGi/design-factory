import { getTemplates } from '@/lib/templates/loader'
import { TemplateCard } from '@/components/showcase/template-card'

export default async function HomePage() {
  const templates = await getTemplates()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[var(--color-terracotta)] opacity-10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[var(--color-emerald)] opacity-10 blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="animate-slide-up opacity-0">
              <span className="inline-block px-4 py-2 rounded-full bg-[var(--color-emerald)] bg-opacity-10 text-[var(--color-emerald)] text-sm font-semibold tracking-wide uppercase mb-6">
                Design System Gallery
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="animate-slide-up opacity-0 delay-100 mb-6">
              <span className="block text-[var(--color-emerald-dark)]">
                Curated Collection
              </span>
              <span className="block gradient-text">
                of Design Systems
              </span>
            </h1>

            {/* Description */}
            <p className="animate-slide-up opacity-0 delay-200 text-xl md:text-2xl text-[var(--color-text-secondary)] mb-8 max-w-2xl leading-relaxed">
              여러 디자인 시스템의 템플릿을 탐색하고, 비교하며,
              프로젝트에 바로 적용할 수 있는 코드를 다운로드하세요
            </p>

            {/* Stats */}
            <div className="animate-slide-up opacity-0 delay-300 flex flex-wrap items-center gap-6 mb-12">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-[var(--color-emerald)]">
                  {templates.length}
                </span>
                <span className="text-lg text-[var(--color-text-tertiary)]">
                  Templates
                </span>
              </div>
              <div className="w-px h-8 bg-[var(--color-border)]" />
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-[var(--color-terracotta)]">
                  {templates.reduce((sum, t) => sum + t.stats.components, 0)}
                </span>
                <span className="text-lg text-[var(--color-text-tertiary)]">
                  Components
                </span>
              </div>
              <div className="w-px h-8 bg-[var(--color-border)]" />
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-[var(--color-gold)]">
                  {templates.reduce((sum, t) => sum + t.stats.tokens, 0)}
                </span>
                <span className="text-lg text-[var(--color-text-tertiary)]">
                  Tokens
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="animate-slide-up opacity-0 delay-400 flex flex-wrap gap-4">
              <a
                href="#templates"
                className="
                  group relative px-8 py-4 rounded-full
                  bg-[var(--color-emerald)] text-[var(--color-cream)]
                  font-semibold text-lg
                  shadow-[var(--shadow-medium)]
                  transition-all duration-300
                  hover:shadow-[var(--shadow-large)]
                  hover:scale-105
                  overflow-hidden
                "
              >
                <span className="relative z-10">Explore Templates</span>
                <span className="absolute inset-0 bg-[var(--color-emerald-light)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
              <a
                href="/compare"
                className="
                  px-8 py-4 rounded-full
                  border-2 border-[var(--color-emerald)]
                  text-[var(--color-emerald)]
                  font-semibold text-lg
                  transition-all duration-300
                  hover:bg-[var(--color-emerald)]
                  hover:text-[var(--color-cream)]
                  hover:scale-105
                "
              >
                Compare Systems
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4">Featured Templates</h2>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              각 템플릿은 독립적으로 실행 가능한 완전한 디자인 시스템입니다
            </p>
          </div>

          {/* Template Grid */}
          {templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template, index) => (
                <div
                  key={template.id}
                  className="animate-scale-in opacity-0"
                  style={{ animationDelay: `${(index % 3) * 100 + 500}ms` }}
                >
                  <TemplateCard template={template} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[var(--color-text-tertiary)]">템플릿을 불러오는 중...</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-12 bg-[var(--color-cream-dark)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4">How It Works</h2>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              간단한 3단계로 원하는 디자인 시스템을 사용하세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                number: '01',
                title: '템플릿 선택',
                description: '프로젝트에 맞는 디자인 시스템을 둘러보고 선택하세요. 각 템플릿은 완전한 컴포넌트 라이브러리와 디자인 토큰을 포함합니다.',
                color: 'var(--color-emerald)'
              },
              {
                number: '02',
                title: '컴포넌트 탐색',
                description: '각 템플릿의 컴포넌트를 확인하고, 디자인 토큰을 비교하며, 코드 예제를 살펴보세요.',
                color: 'var(--color-terracotta)'
              },
              {
                number: '03',
                title: '다운로드 & 사용',
                description: '전체 템플릿을 다운로드하거나 필요한 컴포넌트만 복사하여 프로젝트에 바로 적용하세요.',
                color: 'var(--color-gold)'
              }
            ].map((step, index) => (
              <div
                key={step.number}
                className="
                  relative p-8 rounded-2xl
                  bg-[var(--color-cream)]
                  border-2 border-transparent
                  transition-all duration-300
                  hover:border-[var(--color-border-dark)]
                  hover:shadow-[var(--shadow-medium)]
                  hover:scale-105
                "
              >
                <div
                  className="
                    absolute -top-6 -left-6
                    w-16 h-16 rounded-full
                    flex items-center justify-center
                    font-bold text-2xl
                    text-[var(--color-cream)]
                    shadow-[var(--shadow-medium)]
                  "
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>
                <h3 className="text-2xl mb-4 mt-4">{step.title}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-emerald)] to-[var(--color-emerald-dark)]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-terracotta)] opacity-20 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-[var(--color-cream)] mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-[var(--color-cream)] opacity-90 mb-12 max-w-2xl mx-auto">
            지금 바로 템플릿을 탐색하고 프로젝트에 적용해보세요
          </p>
          <a
            href="#templates"
            className="
              inline-block px-10 py-5 rounded-full
              bg-[var(--color-cream)] text-[var(--color-emerald)]
              font-bold text-lg
              shadow-[var(--shadow-large)]
              transition-all duration-300
              hover:scale-110
              hover:shadow-[var(--shadow-large)]
            "
          >
            Explore All Templates
          </a>
        </div>
      </section>
    </main>
  )
}
