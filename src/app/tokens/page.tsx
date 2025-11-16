import { Suspense } from 'react'
import { getTemplates } from '@/lib/templates/loader'
import { TokenExplorerClient } from '@/components/tokens/token-explorer-client'

export const metadata = {
  title: 'Token Explorer | Design Factory',
  description: 'Explore and search design tokens across all templates',
}

export default async function TokensPage() {
  const templates = await getTemplates()

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Token Explorer</h1>
          <p className="text-xl text-gray-600">
            Search and explore design tokens across all template libraries
          </p>
        </header>

        {/* Token Explorer */}
        <Suspense fallback={<div>Loading tokens...</div>}>
          <TokenExplorerClient templates={templates} />
        </Suspense>
      </div>
    </main>
  )
}
