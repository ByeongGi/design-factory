'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { TemplateConfig, ComponentMetadata } from '@/lib/templates/types'
import { TokenComparisonTable } from './token-comparison-table'

interface ComparisonGridProps {
  templates: TemplateConfig[]
}

export function ComparisonGrid({ templates }: ComparisonGridProps) {
  const [componentsData, setComponentsData] = useState<Record<string, ComponentMetadata[]>>({})
  const [tokensData, setTokensData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'tokens' | 'components'>('overview')

  // Load components and tokens data for all templates
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const componentsPromises = templates.map(async (template) => {
        const res = await fetch(`/api/templates/${template.id}/components`)
        return { id: template.id, data: await res.json() }
      })

      const tokensPromises = templates.map(async (template) => {
        const res = await fetch(`/api/templates/${template.id}/tokens`)
        return { id: template.id, data: await res.json() }
      })

      const componentsResults = await Promise.all(componentsPromises)
      const tokensResults = await Promise.all(tokensPromises)

      const componentsMap: Record<string, ComponentMetadata[]> = {}
      componentsResults.forEach((result) => {
        componentsMap[result.id] = result.data
      })

      const tokensMap: Record<string, any> = {}
      tokensResults.forEach((result) => {
        tokensMap[result.id] = result.data
      })

      setComponentsData(componentsMap)
      setTokensData(tokensMap)
      setLoading(false)
    }

    loadData()
  }, [templates])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'tokens', label: 'Design Tokens' },
            { id: 'components', label: 'Components' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                px-4 py-3 font-medium border-b-2 transition-colors
                ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${templates.length}, 1fr)` }}>
          {templates.map((template) => (
            <div key={template.id} className="border rounded-lg p-6 bg-white">
              {/* Template Header */}
              <div className="mb-6">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4"
                  style={{ backgroundColor: template.primaryColor }}
                >
                  {template.name[0]}
                </div>
                <h3 className="text-2xl font-bold mb-2">{template.name}</h3>
                <p className="text-gray-600 text-sm">{template.description}</p>
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Components:</span>
                  <span className="font-semibold">{template.stats.components}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Design Tokens:</span>
                  <span className="font-semibold">{template.stats.tokens}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">WCAG Level:</span>
                  <span className="font-semibold">{template.stats.wcagLevel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-semibold">{template.version}</span>
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-3 mb-6 text-sm">
                <div>
                  <span className="text-gray-600">Framework:</span>{' '}
                  <span className="font-medium capitalize">{template.framework}</span>
                </div>
                <div>
                  <span className="text-gray-600">Styling:</span>{' '}
                  <span className="font-medium">{template.styling}</span>
                </div>
                <div>
                  <span className="text-gray-600">License:</span>{' '}
                  <span className="font-medium">{template.license}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <Link
                href={`/templates/${template.id}`}
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Tokens Tab */}
      {activeTab === 'tokens' && (
        <TokenComparisonTable templates={templates} tokensData={tokensData} />
      )}

      {/* Components Tab */}
      {activeTab === 'components' && (
        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${templates.length}, 1fr)` }}>
          {templates.map((template) => (
            <div key={template.id} className="border rounded-lg p-6 bg-white">
              <h3 className="text-xl font-bold mb-4">{template.name} Components</h3>
              <div className="space-y-3">
                {componentsData[template.id]?.map((component) => (
                  <Link
                    key={component.name}
                    href={`/templates/${template.id}/components/${component.name}`}
                    className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="font-semibold mb-1">{component.displayName}</div>
                    <div className="text-sm text-gray-600 mb-2">{component.description}</div>
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
