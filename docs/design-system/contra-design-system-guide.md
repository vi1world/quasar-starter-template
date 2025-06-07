# Contra Design System Guide

A comprehensive guide for implementing authentic Contra design patterns in Quasar Vue applications.

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Core Principles](#core-principles)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Component Patterns](#component-patterns)
6. [CSS Classes](#css-classes)
7. [Implementation Examples](#implementation-examples)
8. [Best Practices](#best-practices)
9. [Common Mistakes](#common-mistakes)

## Design Philosophy

Contra's design system emphasizes **bold simplicity** and **authentic minimalism**. Unlike heavy design systems with complex visual elements, Contra focuses on:

- **Typography-first approach** - Text is the primary visual element
- **Minimal visual decoration** - Clean, uncluttered interfaces
- **Strategic color usage** - Bold colors used sparingly for maximum impact
- **Authentic simplicity** - No unnecessary borders, shadows, or effects

## Core Principles

### ✅ DO: Authentic Contra Style
- Use **bold, large typography** as the primary design element
- Apply **minimal styling** - clean white backgrounds
- Use **orange/red accents** sparingly for active states
- Implement **generous spacing** for readability
- Focus on **content over decoration**

### ❌ DON'T: Avoid These Patterns
- Heavy borders and shadows everywhere
- Icons on every element
- Complex gradients or transparency effects
- Cluttered layouts with multiple visual elements
- Subtle or muted styling

## Color System

### Primary Colors
```scss
// Contra Brand Colors
$contra-yellow: #ffbd12;    // Logo and primary brand color
$contra-orange: #ff6b35;    // Active states and accents
$contra-black: #000000;     // Primary text color
$contra-white: #ffffff;     // Background color
$contra-gray: #6b7280;      // Secondary text and footer
```

### Usage Guidelines
- **Yellow (#ffbd12)**: Logo, brand elements only
- **Orange (#ff6b35)**: Active states, selected items, call-to-action
- **Black (#000000)**: Primary text, headings
- **White (#ffffff)**: Backgrounds, cards
- **Gray (#6b7280)**: Secondary text, metadata, footers

## Typography

### Font Hierarchy
```scss
// Contra Typography Scale
.text-contra-hero {
  font-size: 3rem;        // 48px
  font-weight: 900;       // Black
  line-height: 1.1;
}

.text-contra-title {
  font-size: 2rem;        // 32px
  font-weight: 900;       // Black
  line-height: 1.2;
}

.text-contra-heading {
  font-size: 1.5rem;      // 24px
  font-weight: 900;       // Black
  line-height: 1.3;
}

.text-contra-body {
  font-size: 1rem;        // 16px
  font-weight: 500;       // Medium
  line-height: 1.5;
}

.text-contra-small {
  font-size: 0.875rem;    // 14px
  font-weight: 500;       // Medium
  line-height: 1.4;
}
```

### Typography Rules
- **Always use font-black (900)** for headings and navigation
- **Use font-medium (500)** for body text
- **Large text sizes** - don't be afraid of big typography
- **Tight line-height** for headings (1.1-1.3)
- **No font-light or font-thin** - keep text bold and readable

## Component Patterns

### Navigation Menu (Sidebar)
```vue
<!-- Authentic Contra Navigation -->
<nav class="contra-nav">
  <div class="contra-nav-header">
    <div class="contra-logo">
      <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
        <span class="text-black font-black text-sm">C</span>
      </div>
      <span class="text-2xl font-black text-black">Contra</span>
    </div>
  </div>
  
  <ul class="contra-nav-list">
    <li>
      <a href="#" class="contra-nav-item">
        <span class="text-3xl font-black text-black">Home</span>
      </a>
    </li>
    <li>
      <a href="#" class="contra-nav-item contra-nav-item--active">
        <span class="text-3xl font-black text-orange-500">Profile</span>
      </a>
    </li>
    <li>
      <a href="#" class="contra-nav-item">
        <span class="text-3xl font-black text-black">Settings</span>
      </a>
    </li>
  </ul>
</nav>
```

### Buttons
```vue
<!-- Primary Contra Button -->
<button class="contra-btn contra-btn--primary">
  <span class="text-lg font-black">Get Started</span>
</button>

<!-- Secondary Contra Button -->
<button class="contra-btn contra-btn--secondary">
  <span class="text-lg font-black">Learn More</span>
</button>
```

### Cards
```vue
<!-- Contra Card -->
<div class="contra-card">
  <h3 class="text-2xl font-black text-black mb-4">Card Title</h3>
  <p class="text-base font-medium text-gray-600">
    Clean, minimal card content without heavy styling.
  </p>
</div>
```

## CSS Classes

### Base Classes
```scss
// Navigation Components
.contra-nav {
  @apply bg-white;
}

.contra-nav-header {
  @apply flex items-center space-x-3 p-6;
}

.contra-logo {
  @apply flex items-center space-x-3;
}

.contra-nav-list {
  @apply px-6 py-4 space-y-6;
}

.contra-nav-item {
  @apply block py-2 transition-colors duration-200;
}

.contra-nav-item:hover {
  @apply text-orange-500;
}

.contra-nav-item--active {
  @apply text-orange-500;
}

// Button Components
.contra-btn {
  @apply inline-flex items-center justify-center px-6 py-3 rounded-lg transition-all duration-200;
}

.contra-btn--primary {
  @apply bg-orange-500 text-white;
}

.contra-btn--primary:hover {
  @apply bg-orange-600;
}

.contra-btn--secondary {
  @apply bg-white text-black border-2 border-black;
}

.contra-btn--secondary:hover {
  @apply bg-black text-white;
}

// Card Components
.contra-card {
  @apply bg-white p-6 rounded-lg;
}
```

## Implementation Examples

### Converting Existing Quasar Components

#### Before: Heavy Quasar Styling
```vue
<template>
  <q-btn
    color="primary"
    size="lg"
    class="q-px-xl q-py-md shadow-lg"
    icon="add"
    label="Add Item"
  />
</template>
```

#### After: Contra Styling
```vue
<template>
  <button class="contra-btn contra-btn--primary">
    <span class="text-lg font-black">Add Item</span>
  </button>
</template>
```

### Quasar Component Overrides

#### Q-Card to Contra Card
```vue
<template>
  <!-- Instead of q-card with heavy styling -->
  <div class="contra-card">
    <h3 class="text-2xl font-black text-black mb-4">{{ title }}</h3>
    <p class="text-base font-medium text-gray-600">{{ content }}</p>
  </div>
</template>
```

#### Q-List to Contra Navigation
```vue
<template>
  <!-- Instead of q-list with icons and complex styling -->
  <nav class="contra-nav">
    <ul class="contra-nav-list">
      <li v-for="item in menuItems" :key="item.id">
        <router-link
          :to="item.path"
          :class="[
            'contra-nav-item',
            { 'contra-nav-item--active': isActive(item.path) }
          ]"
        >
          <span class="text-3xl font-black">{{ item.label }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
```

#### Q-Input to Contra Input
```vue
<template>
  <!-- Instead of q-input with complex styling -->
  <div class="contra-input-group">
    <label class="text-lg font-black text-black mb-2 block">
      {{ label }}
    </label>
    <input
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      class="contra-input"
    />
  </div>
</template>

<style scoped>
.contra-input {
  @apply w-full px-4 py-3 text-lg font-medium border-2 border-black rounded-lg;
  @apply focus:outline-none focus:border-orange-500;
}

.contra-input::placeholder {
  @apply text-gray-400 font-medium;
}
</style>
```

### Layout Patterns

#### Contra Page Layout
```vue
<template>
  <div class="contra-layout">
    <!-- Header -->
    <header class="contra-header">
      <h1 class="text-4xl font-black text-black">{{ pageTitle }}</h1>
      <p class="text-lg font-medium text-gray-600 mt-2">{{ pageDescription }}</p>
    </header>

    <!-- Content -->
    <main class="contra-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.contra-layout {
  @apply min-h-screen bg-white;
}

.contra-header {
  @apply px-6 py-8;
}

.contra-content {
  @apply px-6 pb-8;
}
</style>
```

## Best Practices

### 1. Typography First
- **Start with text** - Make typography the hero of your design
- **Use large, bold fonts** - Don't be afraid of big text
- **Limit font weights** - Stick to font-black (900) and font-medium (500)
- **Generous spacing** - Give text room to breathe

### 2. Minimal Styling
- **Avoid unnecessary decorations** - No borders, shadows, or gradients unless essential
- **Clean backgrounds** - Prefer white or very light backgrounds
- **Simple shapes** - Use basic rounded corners, avoid complex shapes

### 3. Strategic Color Usage
- **Orange for interaction** - Use orange (#ff6b35) for active states and CTAs
- **Black for content** - Primary text should be pure black (#000000)
- **Yellow for branding** - Reserve yellow (#ffbd12) for logos and brand elements
- **Gray for secondary** - Use gray (#6b7280) for metadata and less important text

### 4. Component Consistency
- **Establish patterns** - Create reusable component patterns
- **Document variations** - Define clear variants for different use cases
- **Maintain hierarchy** - Use consistent sizing and spacing scales

### 5. Responsive Design
```scss
// Contra Responsive Typography
.text-contra-hero {
  @apply text-2xl;

  @screen md {
    @apply text-4xl;
  }

  @screen lg {
    @apply text-5xl;
  }
}

.contra-nav-item span {
  @apply text-xl;

  @screen md {
    @apply text-2xl;
  }

  @screen lg {
    @apply text-3xl;
  }
}
```

## Common Mistakes

### ❌ Avoid These Anti-Patterns

#### 1. Over-styling Components
```vue
<!-- DON'T: Too many visual elements -->
<q-card class="shadow-xl border-2 border-primary bg-gradient-to-r from-blue-500 to-purple-600">
  <q-card-section class="bg-white/90 backdrop-blur-lg">
    <div class="flex items-center space-x-4">
      <q-icon name="star" class="text-yellow-500 text-2xl" />
      <h3 class="text-lg font-semibold text-gray-800">Title</h3>
    </div>
  </q-card-section>
</q-card>

<!-- DO: Clean and minimal -->
<div class="contra-card">
  <h3 class="text-2xl font-black text-black">Title</h3>
</div>
```

#### 2. Icon Overuse
```vue
<!-- DON'T: Icons everywhere -->
<nav>
  <a href="#"><q-icon name="home" /> Home</a>
  <a href="#"><q-icon name="person" /> Profile</a>
  <a href="#"><q-icon name="settings" /> Settings</a>
</nav>

<!-- DO: Text-focused navigation -->
<nav class="contra-nav">
  <a href="#" class="contra-nav-item">
    <span class="text-3xl font-black">Home</span>
  </a>
  <a href="#" class="contra-nav-item">
    <span class="text-3xl font-black">Profile</span>
  </a>
</nav>
```

#### 3. Complex Color Schemes
```vue
<!-- DON'T: Too many colors -->
<div class="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
  <h1 class="text-white text-shadow-lg">Colorful Title</h1>
</div>

<!-- DO: Simple, bold colors -->
<div class="bg-white">
  <h1 class="text-4xl font-black text-black">Simple Title</h1>
</div>
```

### ✅ Quick Checklist

Before implementing any component, ask:

- [ ] Is the typography bold and prominent?
- [ ] Am I using minimal styling without unnecessary decoration?
- [ ] Are colors used strategically (orange for interaction, black for text)?
- [ ] Does the component focus on content over visual effects?
- [ ] Is the spacing generous and readable?
- [ ] Would this fit in the authentic Contra mobile app?

## Migration Guide

### Step 1: Audit Existing Components
1. Identify components with heavy styling
2. List components using gradients, shadows, or complex borders
3. Note components with excessive icon usage

### Step 2: Create Contra Variants
1. Build Contra-styled versions of key components
2. Test typography scales and spacing
3. Validate color usage patterns

### Step 3: Gradual Implementation
1. Start with navigation and key user interface elements
2. Update forms and input components
3. Migrate cards and content components
4. Apply to specialized components

### Step 4: Documentation and Training
1. Document new patterns and components
2. Create style guide examples
3. Train team on Contra design principles

## Resources

- [Contra Mobile App](https://contra.com) - Reference for authentic styling
- [Tailwind CSS](https://tailwindcss.com) - Utility classes used in examples
- [Quasar Framework](https://quasar.dev) - Base component framework

---

**Remember**: Contra design is about **bold simplicity**. When in doubt, remove decoration and emphasize typography.
```
