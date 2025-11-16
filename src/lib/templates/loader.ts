import fs from 'fs'
import path from 'path'
import type { TemplateConfig, ComponentMetadata } from './types'

const TEMPLATES_DIR = path.join(process.cwd(), 'src/templates')

/**
 * Get all available design system templates
 */
export async function getTemplates(): Promise<TemplateConfig[]> {
  const templateDirs = fs.readdirSync(TEMPLATES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const templates: TemplateConfig[] = []

  for (const templateId of templateDirs) {
    try {
      const template = await getTemplate(templateId)
      templates.push(template)
    } catch (error) {
      console.error(`Failed to load template ${templateId}:`, error)
    }
  }

  return templates
}

/**
 * Get a specific template by ID
 */
export async function getTemplate(templateId: string): Promise<TemplateConfig> {
  const configPath = path.join(TEMPLATES_DIR, templateId, 'template.config.json')

  if (!fs.existsSync(configPath)) {
    throw new Error(`Template config not found: ${templateId}`)
  }

  const configContent = fs.readFileSync(configPath, 'utf-8')
  const config: TemplateConfig = JSON.parse(configContent)

  return config
}

/**
 * Get all components for a template
 */
export async function getComponents(templateId: string): Promise<ComponentMetadata[]> {
  const componentsDir = path.join(TEMPLATES_DIR, templateId, 'components')

  if (!fs.existsSync(componentsDir)) {
    return []
  }

  const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const components: ComponentMetadata[] = []

  for (const componentName of componentDirs) {
    try {
      const component = await getComponent(templateId, componentName)
      components.push(component)
    } catch (error) {
      console.error(`Failed to load component ${componentName}:`, error)
    }
  }

  return components
}

/**
 * Get a specific component metadata
 */
export async function getComponent(
  templateId: string,
  componentName: string
): Promise<ComponentMetadata> {
  const metadataPath = path.join(
    TEMPLATES_DIR,
    templateId,
    'components',
    componentName,
    'metadata.json'
  )

  if (!fs.existsSync(metadataPath)) {
    throw new Error(`Component metadata not found: ${templateId}/${componentName}`)
  }

  const metadataContent = fs.readFileSync(metadataPath, 'utf-8')
  const metadata: ComponentMetadata = JSON.parse(metadataContent)

  return metadata
}

/**
 * Get design tokens for a template
 */
export async function getTokens(templateId: string): Promise<any> {
  const template = await getTemplate(templateId)
  const tokensPath = path.join(TEMPLATES_DIR, templateId, template.paths.tokens)

  if (!fs.existsSync(tokensPath)) {
    throw new Error(`Tokens not found: ${templateId}`)
  }

  const tokensContent = fs.readFileSync(tokensPath, 'utf-8')
  return JSON.parse(tokensContent)
}

/**
 * Check if a template exists
 */
export function templateExists(templateId: string): boolean {
  const templatePath = path.join(TEMPLATES_DIR, templateId)
  return fs.existsSync(templatePath)
}

/**
 * Check if a component exists in a template
 */
export function componentExists(templateId: string, componentName: string): boolean {
  const componentPath = path.join(TEMPLATES_DIR, templateId, 'components', componentName)
  return fs.existsSync(componentPath)
}
