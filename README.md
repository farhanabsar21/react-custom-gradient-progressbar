# Gradient Progress Bar

A highly customizable, accessible Gradient Progress Bar component for React applications.

## Features

- 🌈 Customizable Gradient effect
- 🎨 Custom color schemes support
- ⌨️ Keyboard accessibility
- 📱 Touch device support
- ♿ ARIA compliant
- 🎯 Custom min/max/step values
- 💫 Smooth animations
- 🎈 Tooltip support
- 📝 Custom value formatting
- 🔄 Loading state
- 🚫 Disabled state
- 📦 TypeScript support

## Installation

```bash
npm install react-custom-gradient-progress-bar
# or
yarn add react-custom-gradient-progress-bar
```

## Usage

```tsx
import { GradientProgressBar } from 'react-custom-gradient-progress-bar';

function App() {
  return (
    <GradientProgressBar
      initialValue={50}
      min={0}
      max={100}
      step={5}
      onChange={(value) => console.log(`Value changed: ${value}`)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| initialValue | number | 0 | Initial value of the progress bar |
| min | number | 0 | Minimum value |
| max | number | 100 | Maximum value |
| step | number | 1 | Step increment for keyboard navigation |
| disabled | boolean | false | Disables the progress bar |
| loading | boolean | false | Shows loading state |
| colors | ColorConfig | Gradient preset | Custom color configuration |
| formatValue | (value: number) => string | (v) => `${v}%` | Custom value formatter |
| onChange | (value: number) => void | undefined | Change callback |
| className | string | undefined | Additional CSS classes |
| style | CSSProperties | undefined | Additional inline styles |

### ColorConfig Type

```typescript
interface ColorConfig {
  colors: string[];  // Array of colors for gradient
  angle?: number;    // Gradient angle in degrees
}
```

## Keyboard Navigation

- ←/↓: Decrease value by step
- →/↑: Increase value by step
- Home: Set to minimum value
- End: Set to maximum value

## Examples

### Custom Colors

```tsx
<GradientProgressBar
  colors={{
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    angle: 45
  }}
/>
```

### Custom Formatting

```tsx
<GradientProgressBar
  formatValue={(value) => `${value} points`}
/>
```

### With Loading State

```tsx
<GradientProgressBar
  loading={true}
/>
```

## License

MIT © [Farhan Tafader]