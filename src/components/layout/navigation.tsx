import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
            Design Factory
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Templates
            </Link>
            <Link
              href="/compare"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Compare
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
