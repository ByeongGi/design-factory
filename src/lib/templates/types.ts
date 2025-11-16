/**
 * Template configuration types
 */

export interface TemplateConfig {
  id: string
  name: string
  version: string
  description: string
  author: string
  license: string
  primaryColor: string
  thumbnail: string
  preview: {
    light: string
    dark: string
  }
  category: 'enterprise' | 'creative' | 'minimal' | 'bold'
  tags: string[]
  framework: 'react'
  styling: 'css-modules' | 'tailwind' | 'styled-components'
  tokensFormat: 'dtcg' | 'custom'
  paths: {
    tokens: string
    components: string
    theme: string
    readme: string
  }
  dependencies: Record<string, string>
  peerDependencies?: Record<string, string>
  stats: {
    components: number
    tokens: number
    wcagLevel: 'A' | 'AA' | 'AAA'
    browserSupport: string[]
  }
  exportable: boolean
  standalone: boolean
}

export interface ComponentMetadata {
  name: string
  displayName: string
  category: 'primitive' | 'composite' | 'layout'
  description: string
  props: ComponentProp[]
  variants: ComponentVariant[]
  tokens: TokenUsage[]
  accessibility: AccessibilityInfo
  examples: ComponentExample[]
  mdxPath: string
}

export interface ComponentProp {
  name: string
  type: string
  required: boolean
  default?: any
  description: string
  options?: any[]
}

export interface ComponentVariant {
  name: string
  props: Record<string, any>
  preview: string
}

export interface TokenUsage {
  path: string
  cssVar: string
  value: string
}

export interface AccessibilityInfo {
  wcagLevel: 'A' | 'AA' | 'AAA'
  keyboardSupport: string[]
  ariaRoles: string[]
  screenReaderGuidance: string
}

export interface ComponentExample {
  title: string
  description: string
  code: string
}
