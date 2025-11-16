# Ant Design Template

An enterprise-class UI design language and React component library inspired by Ant Design.

## Overview

This template provides a set of high-quality React components following Ant Design principles, including:

- 🎨 **Enterprise-class UI Design** - Professional design language for enterprise applications
- 📦 **High-Quality Components** - Out-of-the-box, production-ready components
- 🔧 **TypeScript Support** - Full TypeScript typing for better development experience
- 🎯 **Design Tokens** - Comprehensive design tokens following W3C DTCG format

## Components

### Primitive Components
- **Button** - Multiple types (primary, default, dashed, text, link) with various states
- **Input** - Text input with prefix/suffix support and validation states
- **Tag** - Labels and categorization with color variants

### Composite Components
- **Card** - Container with header and body sections

## Design Tokens

This template includes 42 design tokens across multiple categories:

- **Colors** - Primary (#1890ff), Success, Warning, Error, and text colors
- **Spacing** - Consistent spacing scale (8px, 12px, 16px, 24px, 32px)
- **Typography** - System font stack with multiple sizes and weights
- **Border Radius** - Small (2px), Base (4px), Large (8px)
- **Shadows** - Three shadow levels for depth
- **Transitions** - Motion curves for smooth animations

## Installation

```bash
npm install
```

## Usage

```tsx
import { Button, Input, Card, Tag } from './components'

function App() {
  return (
    <Card title="Welcome">
      <Input placeholder="Enter your name" />
      <Button type="primary">Submit</Button>
      <Tag color="success">New</Tag>
    </Card>
  )
}
```

## Theming

All components use CSS custom properties for easy theming:

```css
[data-theme="ant-design"] {
  --color-primary: #1890ff;
  --spacing-md: 16px;
  /* ... more tokens */
}
```

## Accessibility

All components follow WCAG AA guidelines and include:
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
