interface TokenPreviewProps {
  category: string
  value: any
}

export function TokenPreview({ category, value }: TokenPreviewProps) {
  const valueStr = String(value)

  // Color Preview
  if (category === 'color' && valueStr.match(/^#[0-9A-Fa-f]{3,8}$/)) {
    return (
      <div className="flex items-center gap-3">
        <div
          className="w-16 h-16 rounded-lg border-2 border-gray-200 shadow-sm"
          style={{ backgroundColor: valueStr }}
        />
        <div className="text-sm text-gray-600">
          <div className="font-medium">Color Swatch</div>
        </div>
      </div>
    )
  }

  // Spacing Preview
  if (category === 'spacing' && valueStr.match(/^\d+px$/)) {
    const size = parseInt(valueStr)
    return (
      <div className="space-y-2">
        <div className="text-xs text-gray-600">Spacing Preview:</div>
        <div className="border border-gray-300 border-dashed rounded">
          <div
            className="bg-blue-500"
            style={{
              width: `${Math.min(size, 200)}px`,
              height: '8px',
            }}
          />
        </div>
      </div>
    )
  }

  // Typography Preview
  if (category === 'typography' || category === 'font') {
    if (valueStr.match(/^\d+px$/) || valueStr.match(/^\d+rem$/)) {
      return (
        <div className="space-y-2">
          <div className="text-xs text-gray-600">Font Size Preview:</div>
          <div className="border rounded p-2 bg-gray-50">
            <span style={{ fontSize: valueStr }}>Aa</span>
          </div>
        </div>
      )
    }
    if (valueStr.includes(',') || valueStr.includes('sans') || valueStr.includes('serif')) {
      return (
        <div className="space-y-2">
          <div className="text-xs text-gray-600">Font Family Preview:</div>
          <div className="border rounded p-2 bg-gray-50">
            <span style={{ fontFamily: valueStr }}>The quick brown fox</span>
          </div>
        </div>
      )
    }
    if (!isNaN(Number(valueStr))) {
      return (
        <div className="space-y-2">
          <div className="text-xs text-gray-600">Font Weight Preview:</div>
          <div className="border rounded p-2 bg-gray-50">
            <span style={{ fontWeight: valueStr }}>The quick brown fox</span>
          </div>
        </div>
      )
    }
  }

  // Shadow Preview
  if (category === 'shadow' || category === 'elevation') {
    return (
      <div className="space-y-2">
        <div className="text-xs text-gray-600">Shadow Preview:</div>
        <div className="p-4">
          <div
            className="w-full h-16 bg-white rounded-lg"
            style={{ boxShadow: valueStr }}
          />
        </div>
      </div>
    )
  }

  // Border Radius Preview
  if (category === 'radius' || category === 'borderRadius') {
    return (
      <div className="space-y-2">
        <div className="text-xs text-gray-600">Border Radius Preview:</div>
        <div className="p-4">
          <div
            className="w-16 h-16 bg-blue-500"
            style={{ borderRadius: valueStr }}
          />
        </div>
      </div>
    )
  }

  // Opacity Preview
  if (category === 'opacity' && !isNaN(Number(valueStr))) {
    const opacity = Number(valueStr)
    return (
      <div className="space-y-2">
        <div className="text-xs text-gray-600">Opacity Preview:</div>
        <div className="relative h-16 border rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300" />
          <div
            className="absolute inset-0 bg-blue-600"
            style={{ opacity }}
          />
        </div>
      </div>
    )
  }

  // Generic Preview
  return (
    <div className="space-y-2">
      <div className="text-xs text-gray-600">Preview:</div>
      <div className="border rounded p-3 bg-gray-50">
        <div className="text-sm text-gray-500">No visual preview available</div>
      </div>
    </div>
  )
}
