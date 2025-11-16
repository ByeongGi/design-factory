import fs from 'fs'
import path from 'path'
import JSZip from 'jszip'
import type { TemplateConfig } from './types'
import { getTemplate } from './loader'

const TEMPLATES_DIR = path.join(process.cwd(), 'src/templates')

/**
 * Generate a ZIP file for a template
 */
export async function generateTemplateZip(templateId: string): Promise<Buffer> {
  const template = await getTemplate(templateId)
  const templatePath = path.join(TEMPLATES_DIR, templateId)
  const zip = new JSZip()

  // Add package.json
  const packageJson = generatePackageJson(template)
  zip.file('package.json', JSON.stringify(packageJson, null, 2))

  // Add Next.js configuration files
  const configFiles = generateConfigFiles(template)
  Object.entries(configFiles).forEach(([filename, content]) => {
    zip.file(filename, content)
  })

  // Add template files
  await addDirectoryToZip(zip, templatePath, 'src/components')

  // Add README
  const readmePath = path.join(templatePath, 'README.md')
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf-8')
    zip.file('README.md', readme)
  }

  // Generate ZIP buffer
  return await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  })
}

/**
 * Generate package.json for the template
 */
function generatePackageJson(template: TemplateConfig) {
  return {
    name: `${template.id}-design-system`,
    version: template.version,
    description: template.description,
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
    },
    dependencies: {
      next: '^15.0.0',
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      ...template.dependencies,
    },
    devDependencies: {
      typescript: '^5.0.0',
      '@types/node': '^20.0.0',
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
      tailwindcss: '^3.4.0',
      postcss: '^8.4.0',
      autoprefixer: '^10.4.0',
    },
  }
}

/**
 * Generate configuration files for Next.js project
 */
function generateConfigFiles(template: TemplateConfig): Record<string, string> {
  return {
    'next.config.ts': `import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
}

export default nextConfig
`,
    'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`,
    'tailwind.config.ts': `import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
`,
    'postcss.config.mjs': `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
`,
    '.gitignore': `# Dependencies
node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
`,
    '.eslintrc.json': `{
  "extends": "next/core-web-vitals"
}
`,
  }
}

/**
 * Recursively add directory contents to ZIP
 */
async function addDirectoryToZip(
  zip: JSZip,
  sourcePath: string,
  zipPath: string
): Promise<void> {
  if (!fs.existsSync(sourcePath)) {
    return
  }

  const entries = fs.readdirSync(sourcePath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(sourcePath, entry.name)
    const relativePath = path.join(zipPath, entry.name)

    if (entry.isDirectory()) {
      await addDirectoryToZip(zip, fullPath, relativePath)
    } else {
      const content = fs.readFileSync(fullPath)
      zip.file(relativePath, content)
    }
  }
}
