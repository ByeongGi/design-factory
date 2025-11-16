'use client'

import { useState, useEffect, useMemo } from 'react'
import type { TemplateConfig } from '@/lib/templates/types'
import { TokenCard } from './token-card'
import { TokenFilters } from './token-filters'

interface TokenExplorerClientProps {
  templates: TemplateConfig[]
}

interface TokenItem {
  name: string
  category: string
  value: any
  type: string
  description?: string
  templateId: string
  templateName: string
  templateColor: string
}

export function TokenExplorerClient({ templates }: TokenExplorerClientProps) {
  const [tokensData, setTokensData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('all')

  // Load all tokens
  useEffect(() => {
    async function loadTokens() {
      setLoading(true)
      const tokensPromises = templates.map(async (template) => {
        const res = await fetch(`/api/templates/${template.id}/tokens`)
        return { id: template.id, data: await res.json() }
      })

      const results = await Promise.all(tokensPromises)
      const tokensMap: Record<string, any> = {}
      results.forEach((result) => {
        tokensMap[result.id] = result.data
      })

      setTokensData(tokensMap)
      setLoading(false)
    }

    loadTokens()
  }, [templates])

  // Flatten all tokens into a searchable array
  const allTokens = useMemo(() => {
    const tokens: TokenItem[] = []

    templates.forEach((template) => {
      const templateTokens = tokensData[template.id]
      if (!templateTokens) return

      Object.entries(templateTokens).forEach(([category, categoryTokens]) => {
        if (category === '$schema' || typeof categoryTokens !== 'object') return

        Object.entries(categoryTokens as Record<string, any>).forEach(([name, token]) => {
          if (name.startsWith('$')) return

          tokens.push({
            name,
            category,
            value: token.$value || token,
            type: token.$type || typeof (token.$value || token),
            description: token.$description,
            templateId: template.id,
            templateName: template.name,
            templateColor: template.primaryColor,
          })
        })
      })
    })

    return tokens
  }, [templates, tokensData])

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>()
    allTokens.forEach((token) => cats.add(token.category))
    return Array.from(cats).sort()
  }, [allTokens])

  // Filter tokens
  const filteredTokens = useMemo(() => {
    return allTokens.filter((token) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = token.name.toLowerCase().includes(query)
        const matchesValue = String(token.value).toLowerCase().includes(query)
        const matchesCategory = token.category.toLowerCase().includes(query)
        if (!matchesName && !matchesValue && !matchesCategory) return false
      }

      // Category filter
      if (selectedCategory !== 'all' && token.category !== selectedCategory) {
        return false
      }

      // Template filter
      if (selectedTemplate !== 'all' && token.templateId !== selectedTemplate) {
        return false
      }

      return true
    })
  }, [allTokens, searchQuery, selectedCategory, selectedTemplate])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <TokenFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        templates={templates}
        selectedTemplate={selectedTemplate}
        onTemplateChange={setSelectedTemplate}
        totalTokens={allTokens.length}
        filteredCount={filteredTokens.length}
      />

      {/* Results */}
      {filteredTokens.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTokens.map((token, index) => (
            <TokenCard key={`${token.templateId}-${token.category}-${token.name}-${index}`} token={token} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed rounded-lg p-12 text-center">
          <p className="text-gray-600">
            No tokens found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  )
}
