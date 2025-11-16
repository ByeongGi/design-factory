# Design Factory - Project Planning

## Project Overview

**Goal**: Create a Next.js 15 platform that showcases multiple independent design system templates with the ability to compare, explore, copy code, and download complete templates.

**Korean Description**: 여러 디자인 시스템의 독립적인 템플릿을 보여주고, 비교하며, 코드를 복사하고, 전체 템플릿을 다운로드할 수 있는 Next.js 기반 플랫폼을 구축합니다.

## Key Features

### Core Features
1. **Template Gallery**: Display 4+ design system templates (Material, Ant Design, Bootstrap, Custom)
2. **Template Download**: Download complete templates as standalone Next.js projects (ZIP)
3. **Code Copy**: One-click code snippet copying for all components
4. **Template Comparison**: Side-by-side comparison of design systems
5. **Token Explorer**: Search and filter design tokens across all templates

### User Capabilities
- ✅ Compare design systems side-by-side
- ✅ Explore design tokens across all systems
- ✅ Copy component code snippets
- ✅ Download complete design system templates

## Technical Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 3.4+ + CSS Modules
- **Theme Management**: next-themes
- **Content**: MDX for component documentation
- **Export**: jszip for template downloads
- **Icons**: lucide-react

### Project Structure

```
design-factory/
├── src/
│   ├── app/                           # Next.js 15 App Router
│   │   ├── (showcase)/               # Showcase routes
│   │   │   ├── page.tsx              # Template gallery homepage
│   │   │   ├── templates/
│   │   │   │   ├── [template]/
│   │   │   │   │   ├── page.tsx      # Template overview
│   │   │   │   │   ├── components/[component]/page.tsx
│   │   │   │   │   ├── tokens/page.tsx
│   │   │   │   │   └── download/route.ts
│   │   │   │   └── compare/page.tsx
│   │   │   ├── playground/[template]/page.tsx
│   │   │   └── tokens/page.tsx
│   │   └── api/
│   │       └── templates/[template]/download/route.ts
│   ├── components/
│   │   ├── showcase/                 # Showcase-specific UI
│   │   │   ├── template-card.tsx
│   │   │   ├── template-comparison.tsx
│   │   │   ├── code-copy-button.tsx
│   │   │   ├── download-button.tsx
│   │   │   └── token-viewer.tsx
│   │   └── ui/                       # Shared UI (neutral design)
│   ├── templates/                    # **Design System Templates**
│   │   ├── material/
│   │   │   ├── template.config.json
│   │   │   ├── tokens/tokens.json
│   │   │   ├── theme/theme.css
│   │   │   ├── components/
│   │   │   └── README.md
│   │   ├── ant-design/
│   │   ├── bootstrap/
│   │   └── custom/
│   ├── lib/
│   │   ├── templates/
│   │   │   ├── loader.ts
│   │   │   ├── registry.ts
│   │   │   └── exporter.ts
│   │   └── design-tokens/
│   │       ├── parser.ts
│   │       └── comparator.ts
│   └── styles/
│       └── globals.css
├── public/templates/
├── scripts/
│   ├── build-templates.ts
│   └── validate-templates.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Template Structure

Each template (`templates/[name]/`) contains:
- `template.config.json` - Metadata and configuration
- `package.json` - Template dependencies
- `tokens/tokens.json` - Design tokens (W3C DTCG format)
- `theme/theme.css` - CSS variables
- `components/` - Component implementations
- `README.md` - Template documentation

## Implementation Phases

### Phase 1: Foundation (Week 1) - 6-8 hours
- [x] Initialize git repository
- [x] Create GitHub repository
- [x] Create Next.js 15 project
- [x] Install dependencies
- [x] Configure project files
- [x] Set up directory structure

### Phase 2: First Template (Week 2) - 12-15 hours
- [x] Create Material Design template structure
- [x] Implement 5 primitive components (Button, Input, Card, Select, Checkbox)
- [x] Define design tokens (DTCG format)
- [x] Create component metadata

### Phase 3: Showcase UI (Week 3) - 10-12 hours
- [x] Create homepage template gallery
- [x] Build template detail pages
- [x] Implement component documentation pages
- [x] Add MDX rendering
- [x] Code copy functionality

### Phase 4: Download & Export (Week 4) - 12-15 hours
- [ ] Template ZIP generator
- [ ] Download API route
- [ ] Download button component
- [ ] CodeSandbox export
- [ ] Validation scripts

### Phase 5: Comparison Features (Week 5) - 10-12 hours
- [ ] Template comparison page
- [ ] Token comparison table
- [ ] Component side-by-side view
- [ ] Comparison URL state

### Phase 6: Token Explorer (Week 6) - 8-10 hours
- [ ] Global token explorer page
- [ ] Token search and filtering
- [ ] Token card components
- [ ] Visual token previews

### Phase 7: Additional Templates (Week 7-8) - 20-25 hours
- [ ] Ant Design template
- [ ] Bootstrap template
- [ ] Custom template
- [ ] Template documentation

### Phase 8: Polish (Week 9) - 10-12 hours
- [ ] Performance optimization
- [ ] Accessibility audit (WCAG AA)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Lighthouse audit

## Data Models

### Template Configuration
```typescript
interface TemplateConfig {
  id: string
  name: string
  version: string
  description: string
  author: string
  license: string
  primaryColor: string
  thumbnail: string
  category: 'enterprise' | 'creative' | 'minimal' | 'bold'
  tags: string[]
  framework: 'react'
  styling: 'css-modules' | 'tailwind' | 'styled-components'
  paths: {
    tokens: string
    components: string
    theme: string
    readme: string
  }
  dependencies: Record<string, string>
  stats: {
    components: number
    tokens: number
    wcagLevel: 'A' | 'AA' | 'AAA'
    browserSupport: string[]
  }
}
```

### Component Metadata
```typescript
interface ComponentMetadata {
  name: string
  displayName: string
  category: 'primitive' | 'composite' | 'layout'
  description: string
  props: ComponentProp[]
  variants: Variant[]
  tokens: TokenUsage[]
  accessibility: AccessibilityInfo
  examples: Example[]
  mdxPath: string
}
```

### Design Tokens (W3C DTCG Format)
```json
{
  "$schema": "https://tr.designtokens.org/format/",
  "color": {
    "brand": {
      "primary": {
        "$type": "color",
        "$value": "#1976d2",
        "$description": "Primary brand color"
      }
    }
  }
}
```

## Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0-rc",
    "react-dom": "^19.0.0-rc",
    "next-themes": "^0.4.0",
    "clsx": "^2.0.0",
    "jszip": "^3.10.0",
    "lucide-react": "latest",
    "@next/mdx": "^15.0.0",
    "@mdx-js/loader": "^3.0.0",
    "@mdx-js/react": "^3.0.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```

## Success Criteria

### Functional
- [ ] 4+ design system templates available
- [ ] Each template has 5+ components
- [ ] All templates downloadable as working projects
- [ ] Code copy works on all snippets
- [ ] Template comparison functional
- [ ] Token explorer with search/filter

### Performance
- [ ] Lighthouse Performance > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### Accessibility
- [ ] WCAG AA compliance
- [ ] Lighthouse Accessibility = 100
- [ ] Keyboard navigation support
- [ ] Screen reader compatible

### Quality
- [ ] Zero TypeScript errors
- [ ] ESLint passes
- [ ] Downloaded templates work without modification
- [ ] Cross-browser compatibility

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Template ZIP generation fails | High | Validation script, test downloads |
| Code snippets have syntax errors | Medium | Parse and validate snippets |
| Templates become out of sync | Medium | Validation script, documentation |
| Download size too large | Low | Include only essential files, compression |

## Future Enhancements

- [ ] Template marketplace (user submissions)
- [ ] Figma plugin integration
- [ ] Custom template generator (mix & match)
- [ ] Multi-framework support (Vue, Svelte)
- [ ] Visual regression testing
- [ ] Template ratings and reviews
- [ ] AI-powered recommendations
- [ ] Deploy to Vercel directly

## References

### Documentation
- Next.js 15: https://nextjs.org/docs/app
- W3C Design Tokens: https://www.w3.org/community/design-tokens/
- Material Design: https://m3.material.io
- Ant Design: https://ant.design/docs/spec/introduce

### Tools
- jszip: https://github.com/Stuk/jszip
- Style Dictionary: https://styledictionary.com
- next-themes: https://github.com/pacocoursey/next-themes

### Inspiration
- Vercel Templates: https://vercel.com/templates
- shadcn/ui: https://ui.shadcn.com
- Design Systems Repo: https://designsystemsrepo.com

---

**Total Estimated Effort**: 89-119 hours (2-3 months part-time)
**Repository**: https://github.com/ByeongGi/design-factory
