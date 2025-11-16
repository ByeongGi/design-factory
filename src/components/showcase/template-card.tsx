import Link from 'next/link'
import type { TemplateConfig } from '@/lib/templates/types'

interface TemplateCardProps {
  template: TemplateConfig
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link href={`/templates/${template.id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        {/* Preview Image Placeholder */}
        <div
          className="w-full h-48 flex items-center justify-center text-white text-4xl font-bold"
          style={{ backgroundColor: template.primaryColor }}
        >
          {template.name[0]}
        </div>

        {/* Card Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-gray-900">{template.name}</h3>
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: template.primaryColor }}
              title={template.primaryColor}
            />
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 flex-1">{template.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
            <span>{template.stats.components} components</span>
            <span>{template.stats.tokens} tokens</span>
            <span className="font-medium">WCAG {template.stats.wcagLevel}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
