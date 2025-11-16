import { CodeCopyButton } from './code-copy-button'

interface CodeBlockProps {
  code: string
  language?: string
  showCopy?: boolean
}

export function CodeBlock({ code, language = 'tsx', showCopy = true }: CodeBlockProps) {
  return (
    <div className="relative group">
      {showCopy && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <CodeCopyButton code={code} />
        </div>
      )}
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}
