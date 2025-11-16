import Link from 'next/link'
import { TokenPreview } from './token-preview'

interface TokenCardProps {
  token: {
    name: string
    category: string
    value: any
    type: string
    description?: string
    templateId: string
    templateName: string
    templateColor: string
  }
}

export function TokenCard({ token }: TokenCardProps) {
  return (
    <div className="border rounded-lg p-6 bg-white hover:shadow-lg transition-shadow">
      {/* Template Badge */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: token.templateColor }}
        >
          {token.templateName[0]}
        </div>
        <Link
          href={`/templates/${token.templateId}`}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          {token.templateName}
        </Link>
      </div>

      {/* Category */}
      <div className="mb-2">
        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
          {token.category}
        </span>
      </div>

      {/* Token Name */}
      <h3 className="text-lg font-semibold mb-2 break-words">{token.name}</h3>

      {/* Description */}
      {token.description && (
        <p className="text-sm text-gray-600 mb-4">{token.description}</p>
      )}

      {/* Visual Preview */}
      <div className="mb-4">
        <TokenPreview category={token.category} value={token.value} />
      </div>

      {/* Value */}
      <div className="bg-gray-50 rounded p-3 border">
        <div className="text-xs text-gray-600 mb-1">Value:</div>
        <code className="text-sm font-mono break-all">{String(token.value)}</code>
      </div>

      {/* Type */}
      <div className="mt-3 text-xs text-gray-500">
        Type: <span className="font-medium">{token.type}</span>
      </div>
    </div>
  )
}
