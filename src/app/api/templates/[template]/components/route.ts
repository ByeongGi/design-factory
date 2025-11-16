import { NextRequest, NextResponse } from 'next/server'
import { getComponents, templateExists } from '@/lib/templates/loader'

interface RouteContext {
  params: Promise<{ template: string }>
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { template: templateId } = await context.params

    // Check if template exists
    if (!templateExists(templateId)) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    // Get components
    const components = await getComponents(templateId)

    return NextResponse.json(components)
  } catch (error) {
    console.error('Get components error:', error)
    return NextResponse.json(
      { error: 'Failed to get components' },
      { status: 500 }
    )
  }
}
