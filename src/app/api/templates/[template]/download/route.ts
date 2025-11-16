import { NextRequest, NextResponse } from 'next/server'
import { generateTemplateZip } from '@/lib/templates/exporter'
import { templateExists } from '@/lib/templates/loader'

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

    // Generate ZIP file
    const zipBuffer = await generateTemplateZip(templateId)

    // Return ZIP file
    return new NextResponse(new Uint8Array(zipBuffer), {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${templateId}-template.zip"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Template download error:', error)
    return NextResponse.json(
      { error: 'Failed to generate template download' },
      { status: 500 }
    )
  }
}
