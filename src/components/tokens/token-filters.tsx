import type { TemplateConfig } from '@/lib/templates/types'

interface TokenFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  templates: TemplateConfig[]
  selectedTemplate: string
  onTemplateChange: (templateId: string) => void
  totalTokens: number
  filteredCount: number
}

export function TokenFilters({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  templates,
  selectedTemplate,
  onTemplateChange,
  totalTokens,
  filteredCount,
}: TokenFiltersProps) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-6">
      {/* Search */}
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          Search Tokens
        </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, value, or category..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Categories ({totalTokens})</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Template Filter */}
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-2">
            Template
          </label>
          <select
            id="template"
            value={selectedTemplate}
            onChange={(e) => onTemplateChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Templates</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="pt-4 border-t">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredCount}</span> of{' '}
          <span className="font-semibold">{totalTokens}</span> tokens
        </p>
      </div>
    </div>
  )
}
