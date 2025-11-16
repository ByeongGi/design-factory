import type { TemplateConfig } from '@/lib/templates/types'

interface TemplateSelectorProps {
  template: TemplateConfig
  selected: boolean
  onSelect: () => void
}

export function TemplateSelector({ template, selected, onSelect }: TemplateSelectorProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        relative p-4 border-2 rounded-lg transition-all text-left
        ${
          selected
            ? 'border-blue-600 bg-blue-50 shadow-md'
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
        }
      `}
    >
      {/* Selected indicator */}
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}

      {/* Template Icon */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-3"
        style={{ backgroundColor: template.primaryColor }}
      >
        {template.name[0]}
      </div>

      {/* Template Info */}
      <h3 className="font-semibold mb-1">{template.name}</h3>
      <p className="text-xs text-gray-600 line-clamp-2">{template.description}</p>

      {/* Quick Stats */}
      <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
        <span>{template.stats.components} components</span>
        <span>•</span>
        <span>{template.stats.tokens} tokens</span>
      </div>
    </button>
  )
}
