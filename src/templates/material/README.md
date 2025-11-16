# Material Design Template

A comprehensive Material Design 3 inspired component library with elevation-based design system.

## Overview

This template implements Google's Material Design guidelines with a focus on elevation, responsive design, and accessibility. Perfect for enterprise applications and mobile-first projects.

## Components

### Primitives

- **Button** - Elevation-based buttons with contained, outlined, and text variants
- **Input** - Text inputs with floating labels and helper text
- **Select** - Dropdown selects with Material styling
- **Checkbox** - Checkbox inputs with ripple effects

### Composite

- **Card** - Surface component with configurable elevation levels (0-4)

## Design Tokens

This template uses W3C Design Tokens Community Group (DTCG) format for all design tokens.

### Color Palette

- **Primary**: #1976d2 (Material Blue 700)
- **Secondary**: #f50057 (Material Pink A400)
- **Error**: #d32f2f (Material Red 700)
- **Success**: #388e3c (Material Green 700)

### Elevation System

Material Design uses elevation to create depth:
- Level 0: No shadow
- Level 1: Resting elevation for cards
- Level 2: Raised elevation
- Level 3: Dialogs and modals
- Level 4: App bars and navigation

### Typography

- **Font Family**: Roboto, Helvetica, Arial, sans-serif
- **Font Weights**: Light (300), Regular (400), Medium (500), Bold (700)
- **Type Scale**: h1 (96px) down to caption (12px)

### Spacing

Based on 4px grid system:
- Base unit: 4px
- Common spacing: 8px, 12px, 16px, 24px, 32px, 48px

## Usage

### Installation

```bash
npm install react react-dom clsx
```

### Basic Example

```tsx
import { Button } from './components/button'
import { Input } from './components/input'
import { Card } from './components/card'

function App() {
  return (
    <Card elevation={2}>
      <h2>Sign In</h2>
      <Input label="Email" type="email" fullWidth />
      <Input label="Password" type="password" fullWidth />
      <Button variant="contained" color="primary" fullWidth>
        Sign In
      </Button>
    </Card>
  )
}
```

### Applying the Theme

Import the theme CSS in your app:

```tsx
import './theme/theme.css'
```

Add the `data-theme` attribute to your root element:

```html
<div data-theme="material">
  <!-- Your app -->
</div>
```

## Accessibility

All components follow WCAG AA guidelines:

- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Focus indicators
- ✅ Screen reader friendly
- ✅ Color contrast compliance

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT

## Resources

- [Material Design 3](https://m3.material.io/)
- [Material Design Guidelines](https://material.io/design)
- [W3C Design Tokens](https://tr.designtokens.org/)
