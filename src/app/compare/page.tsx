import { Suspense } from 'react'
import { getTemplates } from '@/lib/templates/loader'
import { ComparisonClient } from '@/components/comparison/comparison-client'

export const metadata = {
  title: 'Template Comparison | Design Factory',
  description: 'Compare design system templates side-by-side',
}

export default async function ComparePage() {
  const templates = await getTemplates()

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Template Comparison</h1>
          <p className="text-xl text-gray-600">
            Compare design system templates side-by-side to find the best fit for your project
          </p>
        </header>

        {/* Comparison Interface */}
        <Suspense fallback={<div>Loading comparison...</div>}>
          <ComparisonClient templates={templates} />
        </Suspense>
      </div>
    </main>
  )
}
