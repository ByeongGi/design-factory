import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTemplate, getTemplates, getComponents } from '@/lib/templates/loader'

interface TemplatePageProps {
  params: Promise<{ template: string }>
}

export async function generateStaticParams() {
  const templates = await getTemplates()
  return templates.map((template) => ({
    template: template.id,
  }))
}

export async function generateMetadata({ params }: TemplatePageProps) {
  const { template: templateId } = await params
  const template = await getTemplate(templateId)

  return {
    title: `${template.name} | Design Factory`,
    description: template.description,
  }
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { template: templateId } = await params

  try {
    const template = await getTemplate(templateId)
    const components = await getComponents(templateId)

    return (
      <main className="min-h-screen p-8 md:p-24">
        <div className="max-w-7xl mx-auto">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            ← 모든 템플릿
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-5xl font-bold mb-2">{template.name}</h1>
                <p className="text-xl text-gray-600">{template.description}</p>
              </div>
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: template.primaryColor }}
              >
                {template.name[0]}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-gray-600">Components:</span>{' '}
                <span className="font-semibold">{template.stats.components}</span>
              </div>
              <div>
                <span className="text-gray-600">Tokens:</span>{' '}
                <span className="font-semibold">{template.stats.tokens}</span>
              </div>
              <div>
                <span className="text-gray-600">WCAG:</span>{' '}
                <span className="font-semibold">{template.stats.wcagLevel}</span>
              </div>
              <div>
                <span className="text-gray-600">Version:</span>{' '}
                <span className="font-semibold">{template.version}</span>
              </div>
            </div>
          </header>

          {/* Components Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Components</h2>
            {components.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {components.map((component) => (
                  <Link
                    key={component.name}
                    href={`/templates/${templateId}/components/${component.name}`}
                    className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {component.displayName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {component.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {component.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {component.props.length} props
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No components found.</p>
            )}
          </section>

          {/* Template Info */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-gray-600">Author:</dt>
                  <dd className="font-medium">{template.author}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">License:</dt>
                  <dd className="font-medium">{template.license}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Framework:</dt>
                  <dd className="font-medium capitalize">{template.framework}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Styling:</dt>
                  <dd className="font-medium">{template.styling}</dd>
                </div>
              </dl>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Browser Support</h3>
              <ul className="space-y-1 text-sm">
                {template.stats.browserSupport.map((browser) => (
                  <li key={browser} className="text-gray-700">
                    ✓ {browser}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    )
  } catch (error) {
    notFound()
  }
}
