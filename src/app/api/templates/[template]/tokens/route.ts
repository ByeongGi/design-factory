import { NextRequest, NextResponse } from 'next/server'
import { getTokens, templateExists } from '@/lib/templates/loader'

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

    // Get tokens
    const tokens = await getTokens(templateId)

    return NextResponse.json(tokens)
  } catch (error) {
    console.error('Get tokens error:', error)
    return NextResponse.json(
      { error: 'Failed to get tokens' },
      { status: 500 }
    )
  }
}
