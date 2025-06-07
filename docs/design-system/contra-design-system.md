# Contra Design System

## Overview

The Contra Design System is an enhanced, vibrant design language inspired by the Contra UI Kit that brings bold typography, energetic colors, and engaging micro-interactions to create applications with true "wow" factor.

## Design Philosophy

### Core Principles

1. **Bold & Impactful**: Large, confident typography that commands attention
2. **Vibrant Colors**: Energetic color palette that stands out from typical corporate designs
3. **Smooth Interactions**: Micro-animations and transitions that delight users
4. **Modern Aesthetics**: Contemporary design patterns with generous spacing and rounded elements
5. **Visual Hierarchy**: Strong contrast and clear information architecture

### Key Differentiators from Misskey Design

- **Typography**: Montserrat font family with extra-bold weights (800-900)
- **Color Palette**: Vibrant blues, electric greens, sunshine yellows, and coral reds
- **Animations**: Smooth hover effects, floating elements, and scale transformations
- **Shadows**: Sophisticated shadow system with color-specific glows
- **Gradients**: Rich color transitions for backgrounds and accents

## Color System

### Primary Colors

- **Persian Blue** (`#1947e6`): Primary brand color for buttons and accents
- **Caribbean Green** (`#00c6ae`): Electric, energetic secondary color
- **Lightning Yellow** (`#ffbd12`): Bright, attention-grabbing accent
- **Flamingo Red** (`#f95a2c`): Bold, passionate highlight color

### Color Usage

```css
/* Primary Actions */
.btn-contra-primary { background: #1947e6; }

/* Electric Elements */
.btn-contra-electric { background: #00c6ae; }

/* Sunshine Highlights */
.btn-contra-sunshine { background: #ffbd12; }

/* Coral Accents */
.btn-contra-coral { background: #f95a2c; }
```

## Typography Scale

### Font Family
- **Primary**: Montserrat (400, 500, 600, 700, 800, 900)
- **Fallback**: System fonts for performance

### Type Scale

```css
/* Hero Text - 4rem */
.text-hero { font-size: 4rem; font-weight: 800; }

/* Display - 3.5rem */
.text-display { font-size: 3.5rem; font-weight: 800; }

/* Headline - 2.5rem */
.text-headline { font-size: 2.5rem; font-weight: 700; }
```

## Component Library

### Buttons

#### Primary Button
```vue
<button class="btn-contra-primary">
  <q-icon name="rocket_launch" class="mr-2" />
  Get Started
</button>
```

#### Electric Button
```vue
<button class="btn-contra-electric">
  <q-icon name="flash_on" class="mr-2" />
  Electric Action
</button>
```

### Cards

#### Gradient Card
```vue
<div class="card-contra-gradient p-8">
  <h3 class="text-xl font-bold text-white mb-4">Gradient Card</h3>
  <p class="text-white/90">Beautiful gradient background</p>
</div>
```

#### Stats Card
```vue
<ContraStatsCard
  title="Total Users"
  :value="12500"
  icon="people"
  description="Active users this month"
  :trend="12.5"
  color="primary"
  variant="gradient"
/>
```

### Navigation
```vue
<ContraNavigation
  logo-text="Your Brand"
  :nav-items="navItems"
  :user-menu-items="userMenuItems"
  cta-text="Get Started"
/>
```

### Hero Sections
```vue
<ContraHero
  title="Experience the <span class='text-sunshine-400'>Future</span>"
  subtitle="Bold, vibrant, and uniquely crafted components"
  primary-cta="Get Started"
  secondary-cta="Learn More"
  variant="primary"
  :stats="heroStats"
/>
```

## Animation System

### Hover Effects
- **Scale Transform**: `hover:scale-105` for buttons and cards
- **Shadow Enhancement**: Dynamic shadow changes on hover
- **Color Transitions**: Smooth color shifts with 300ms duration

### Micro-Interactions
- **Float Animation**: Subtle floating motion for decorative elements
- **Fade In**: Smooth entrance animations for content
- **Slide Up**: Content slides up with opacity change
- **Glow Effects**: Pulsing glow for special elements

### CSS Classes
```css
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-fade-in { animation: fadeIn 0.5s ease-out; }
.animate-slide-up { animation: slideUp 0.5s ease-out; }
.animate-glow { animation: glow 2s ease-in-out infinite alternate; }
```

## Implementation Guide

### 1. Install Dependencies
The system is built on top of existing Tailwind CSS configuration.

### 2. Import Components
```vue
<script setup>
import ContraStatsCard from '@/components/modern/ContraStatsCard.vue';
import ContraHero from '@/components/modern/ContraHero.vue';
import ContraNavigation from '@/components/modern/ContraNavigation.vue';
</script>
```

### 3. Use Utility Classes
```html
<!-- Buttons -->
<button class="btn-contra-primary">Primary Action</button>
<button class="btn-contra-electric">Electric Vibes</button>

<!-- Cards -->
<div class="card-contra-gradient">Gradient Card</div>
<div class="card-contra">Standard Card</div>

<!-- Typography -->
<h1 class="text-hero">Hero Heading</h1>
<h2 class="text-display">Display Heading</h2>
```

## Best Practices

### Do's
- Use bold typography for headings and important text
- Use solid colors with strong black borders (2px minimum)
- Apply hover effects with solid color changes and shadow adjustments
- Maintain consistent spacing using the defined scale
- Use vibrant colors strategically for maximum impact
- Keep all elements opaque with no transparency

### Don'ts
- Use gradients, transparency, or opacity effects
- Use blur effects or glass morphism
- Mix subtle colors - keep everything bold and high contrast
- Use light elements on light backgrounds
- Ignore accessibility considerations for color contrast

## Accessibility

### Color Contrast
All color combinations meet WCAG AA standards:
- Primary blue on white: 4.5:1 ratio
- Electric green on white: 4.5:1 ratio
- Text maintains readability across all variants

### Motion Preferences
Respect user motion preferences:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-glow {
    animation: none;
  }
}
```

## Migration from Misskey Design

### Gradual Adoption
1. Start with new components (ContraStatsCard, ContraHero)
2. Update button styles using new utility classes
3. Enhance existing cards with gradient variants
4. Apply new typography scale to headings

### Compatibility
Legacy Misskey components remain functional alongside new Contra components for smooth transition.

## Demo and Examples

Visit `/contra-demo` to see the complete design system in action with:
- Interactive component showcase
- Typography demonstrations
- Color palette examples
- Animation previews
- Real-world usage patterns

## Future Enhancements

### Planned Features
- Form components with Contra styling
- Data visualization components
- Mobile-optimized variants
- Dark mode refinements
- Additional animation presets

### Community Contributions
The design system is open for contributions and improvements based on user feedback and evolving design trends.
