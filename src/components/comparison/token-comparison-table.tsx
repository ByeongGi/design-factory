import type { TemplateConfig } from '@/lib/templates/types'

interface TokenComparisonTableProps {
  templates: TemplateConfig[]
  tokensData: Record<string, any>
}

export function TokenComparisonTable({ templates, tokensData }: TokenComparisonTableProps) {
  // Extract all unique token categories across templates
  const allCategories = new Set<string>()
  Object.values(tokensData).forEach((tokens) => {
    if (tokens && typeof tokens === 'object') {
      Object.keys(tokens).forEach((key) => {
        if (key !== '$schema') {
          allCategories.add(key)
        }
      })
    }
  })

  const categories = Array.from(allCategories).sort()

  // Helper to get token count for a category
  const getTokenCount = (tokens: any, category: string): number => {
    if (!tokens || !tokens[category]) return 0
    const categoryTokens = tokens[category]
    return Object.keys(categoryTokens).filter((key) => !key.startsWith('$')).length
  }

  // Helper to render token preview
  const renderTokenPreview = (tokens: any, category: string) => {
    if (!tokens || !tokens[category]) {
      return <span className="text-gray-400 text-sm">Not available</span>
    }

    const categoryTokens = tokens[category]
    const tokenKeys = Object.keys(categoryTokens).filter((key) => !key.startsWith('$'))
    const firstThree = tokenKeys.slice(0, 3)

    return (
      <div className="space-y-2">
        {firstThree.map((key) => {
          const token = categoryTokens[key]
          const value = token.$value || token

          return (
            <div key={key} className="flex items-center gap-2 text-sm">
              {category === 'color' && typeof value === 'string' && value.startsWith('#') && (
                <div
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: value }}
                />
              )}
              <span className="text-gray-600 truncate">{key}:</span>
              <span className="font-mono text-xs truncate">{String(value)}</span>
            </div>
          )
        })}
        {tokenKeys.length > 3 && (
          <span className="text-xs text-gray-500">
            +{tokenKeys.length - 3} more
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2">
            <th className="text-left p-4 font-semibold bg-gray-50">Token Category</th>
            {templates.map((template) => (
              <th
                key={template.id}
                className="text-left p-4 font-semibold bg-gray-50"
                style={{ minWidth: '250px' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: template.primaryColor }}
                  >
                    {template.name[0]}
                  </div>
                  <span>{template.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium capitalize align-top">
                {category}
              </td>
              {templates.map((template) => (
                <td key={template.id} className="p-4 align-top">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-semibold">
                      {getTokenCount(tokensData[template.id], category)} tokens
                    </span>
                  </div>
                  {renderTokenPreview(tokensData[template.id], category)}
                </td>
              ))}
            </tr>
          ))}

          {/* Total Row */}
          <tr className="border-t-2 bg-gray-50 font-semibold">
            <td className="p-4">Total Tokens</td>
            {templates.map((template) => (
              <td key={template.id} className="p-4">
                {template.stats.tokens} tokens
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
