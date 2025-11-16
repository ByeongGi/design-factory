import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTemplate, getTemplates, getComponent, getComponents } from '@/lib/templates/loader'

interface ComponentPageProps {
  params: Promise<{ template: string; component: string }>
}

export async function generateStaticParams() {
  const templates = await getTemplates()
  const paths = []

  for (const template of templates) {
    const components = await getComponents(template.id)
    for (const component of components) {
      paths.push({
        template: template.id,
        component: component.name,
      })
    }
  }

  return paths
}

export async function generateMetadata({ params }: ComponentPageProps) {
  const { template: templateId, component: componentName } = await params
  const template = await getTemplate(templateId)
  const component = await getComponent(templateId, componentName)

  return {
    title: `${component.displayName} - ${template.name} | Design Factory`,
    description: component.description,
  }
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { template: templateId, component: componentName } = await params

  try {
    const template = await getTemplate(templateId)
    const component = await getComponent(templateId, componentName)

    return (
      <main className="min-h-screen p-8 md:p-24">
        <div className="max-w-5xl mx-auto">
          {/* Back Link */}
          <Link
            href={`/templates/${templateId}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            ← {template.name}
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-5xl font-bold mb-2">{component.displayName}</h1>
            <p className="text-xl text-gray-600 mb-4">{component.description}</p>
            <div className="flex gap-4 text-sm">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
                {component.category}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded">
                WCAG {component.accessibility.wcagLevel}
              </span>
            </div>
          </header>

          {/* Props Table */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Props</h2>
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Default</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {component.props.map((prop) => (
                    <tr key={prop.name}>
                      <td className="px-4 py-3 font-mono text-sm">
                        {prop.name}
                        {prop.required && (
                          <span className="ml-1 text-red-500">*</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-gray-600">
                        {prop.type}
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-gray-600">
                        {prop.default !== undefined ? String(prop.default) : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Variants */}
          {component.variants.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Variants</h2>
              <div className="space-y-4">
                {component.variants.map((variant) => (
                  <div key={variant.name} className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">{variant.name}</h3>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                      <code>{variant.preview}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Examples */}
          {component.examples.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Examples</h2>
              <div className="space-y-6">
                {component.examples.map((example, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                    <p className="text-gray-600 mb-4">{example.description}</p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Accessibility */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Accessibility</h2>
            <div className="border rounded-lg p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold mb-2">WCAG Level</dt>
                  <dd className="text-gray-600">{component.accessibility.wcagLevel}</dd>
                </div>
                <div>
                  <dt className="font-semibold mb-2">Keyboard Support</dt>
                  <dd className="text-gray-600">
                    {component.accessibility.keyboardSupport.join(', ')}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold mb-2">ARIA Roles</dt>
                  <dd className="text-gray-600">
                    {component.accessibility.ariaRoles.join(', ')}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold mb-2">Screen Reader Guidance</dt>
                  <dd className="text-gray-600">
                    {component.accessibility.screenReaderGuidance}
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Design Tokens Used */}
          {component.tokens.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-6">Design Tokens Used</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Path</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        CSS Variable
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {component.tokens.map((token) => (
                      <tr key={token.path}>
                        <td className="px-4 py-3 font-mono text-sm">{token.path}</td>
                        <td className="px-4 py-3 font-mono text-sm text-gray-600">
                          {token.cssVar}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm text-gray-600">
                          {token.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>
    )
  } catch (error) {
    notFound()
  }
}
