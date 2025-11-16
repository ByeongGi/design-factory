'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { TemplateConfig } from '@/lib/templates/types'
import { TemplateSelector } from './template-selector'
import { ComparisonGrid } from './comparison-grid'

interface ComparisonClientProps {
  templates: TemplateConfig[]
}

export function ComparisonClient({ templates }: ComparisonClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize selected templates from URL params
  const initialTemplates = searchParams.get('templates')?.split(',').filter(Boolean) || []
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>(initialTemplates)

  // Update URL when selection changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedTemplates.length > 0) {
      params.set('templates', selectedTemplates.join(','))
    } else {
      params.delete('templates')
    }
    router.replace(`/compare?${params.toString()}`, { scroll: false })
  }, [selectedTemplates, router, searchParams])

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplates((prev) => {
      if (prev.includes(templateId)) {
        // Remove if already selected
        return prev.filter((id) => id !== templateId)
      } else if (prev.length < 3) {
        // Add if less than 3 selected
        return [...prev, templateId]
      }
      // Replace last one if 3 already selected
      return [...prev.slice(0, 2), templateId]
    })
  }

  const handleClearAll = () => {
    setSelectedTemplates([])
  }

  const selectedTemplateConfigs = templates.filter((t) =>
    selectedTemplates.includes(t.id)
  )

  return (
    <div className="space-y-8">
      {/* Template Selectors */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Select Templates to Compare</h2>
          {selectedTemplates.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Clear All
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Select 2-3 templates to compare (currently {selectedTemplates.length} selected)
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <TemplateSelector
              key={template.id}
              template={template}
              selected={selectedTemplates.includes(template.id)}
              onSelect={() => handleTemplateSelect(template.id)}
            />
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      {selectedTemplateConfigs.length >= 2 ? (
        <ComparisonGrid templates={selectedTemplateConfigs} />
      ) : (
        <div className="bg-gray-50 border border-dashed rounded-lg p-12 text-center">
          <p className="text-gray-600">
            {selectedTemplateConfigs.length === 0
              ? 'Select at least 2 templates to start comparing'
              : 'Select one more template to compare'}
          </p>
        </div>
      )}
    </div>
  )
}
