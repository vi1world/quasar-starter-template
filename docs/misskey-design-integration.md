# Misskey Design System Integration with Quasar and Tailwind CSS

## Overview

This document outlines the complete integration of the Misskey Hub Next design system into our Quasar Vue.js application, enhanced with Tailwind CSS for modern styling capabilities.

## Table of Contents

1. [Project Goals](#project-goals)
2. [Technology Stack](#technology-stack)
3. [Tailwind CSS Integration](#tailwind-css-integration)
4. [Design System Implementation](#design-system-implementation)
5. [Component Architecture](#component-architecture)
6. [Layout Modernization](#layout-modernization)
7. [Icon System](#icon-system)
8. [Responsive Design](#responsive-design)
9. [Dark Mode Support](#dark-mode-support)
10. [File Structure](#file-structure)
11. [Usage Examples](#usage-examples)
12. [Best Practices](#best-practices)

## Project Goals

The primary objective was to modernize the existing Quasar application with the beautiful Misskey Hub Next design system while:

- **Preserving all Quasar functionality** (components, plugins, responsive system)
- **Enhancing visual appeal** with modern design patterns
- **Improving user experience** with better layouts and interactions
- **Maintaining performance** and development efficiency
- **Ensuring accessibility** and responsive design

## Technology Stack

### Core Technologies
- **Vue 3** with Composition API
- **Quasar Framework** v2.18.1 (UI components and utilities)
- **Tailwind CSS** v3.4.0 (utility-first styling)
- **TypeScript** for type safety
- **Vite** for fast development and building

### Design Inspiration
- **Misskey Hub Next** design system
- **Material Design** principles
- **Modern web design** patterns

## Tailwind CSS Integration

### Installation and Configuration

#### 1. Package Installation
```bash
npm install -D tailwindcss@latest autoprefixer@latest postcss@latest
npm install -D @tailwindcss/typography @tailwindcss/forms
```

#### 2. Tailwind Configuration (`tailwind.config.ts`)
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Misskey-inspired accent colors
        accent: {
          50: '#f0f9e6',
          100: '#d9f0b8',
          200: '#c0e685',
          300: '#a6dc52',
          400: '#92d32a',
          500: '#7ec800',
          600: '#86b300', // Primary accent
          700: '#6d9200',
          800: '#547100',
          900: '#3b5000',
          950: '#223000',
        },
      },
      fontFamily: {
        'heading': ['Capriola', 'sans-serif'],
        'body': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;
```

#### 3. PostCSS Configuration (`postcss.config.js`)
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

#### 4. CSS Integration (`src/css/tailwind.css`)
```css
/* Google Fonts & Material Icons */
@import url('https://fonts.googleapis.com/css2?family=Capriola&family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom CSS variables for Quasar integration */
:root {
  --color-accent-50: #f0f9e6;
  --color-accent-100: #d9f0b8;
  --color-accent-600: #86b300;
  --color-accent-700: #6d9200;
}

/* Dark mode variables */
.dark {
  --color-accent-50: #223000;
  --color-accent-100: #3b5000;
}
```

### Quasar Integration Strategy

#### 1. Quasar Configuration Updates (`quasar.config.ts`)
```typescript
// Enable Tailwind CSS processing
css: ['src/css/tailwind.css'],

// Configure Vite for Tailwind
vite: {
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
},

// Material Icons for consistency
framework: {
  iconSet: 'material-icons',
  // ... other Quasar config
}
```

#### 2. Hybrid Approach Benefits
- **Quasar Components**: Used for complex UI elements (q-drawer, q-menu, q-dialog)
- **Tailwind Utilities**: Used for layout, spacing, colors, and responsive design
- **Best of Both Worlds**: Quasar's functionality + Tailwind's flexibility

## Design System Implementation

### Color Palette

#### Primary Accent Colors (Misskey Green)
```css
accent-50:  #f0f9e6  /* Very light green */
accent-100: #d9f0b8  /* Light green */
accent-600: #86b300  /* Primary green */
accent-700: #6d9200  /* Dark green */
accent-950: #223000  /* Very dark green */
```

#### Semantic Color Usage
- **Primary Actions**: `bg-accent-600 hover:bg-accent-700`
- **Secondary Elements**: `bg-accent-100 text-accent-700`
- **Backgrounds**: `bg-slate-50 dark:bg-slate-900`
- **Text**: `text-slate-900 dark:text-slate-100`
- **Borders**: `border-slate-200 dark:border-slate-700`

### Typography System

#### Font Families
```css
/* Headings - Capriola (Modern, Clean) */
.font-heading { font-family: 'Capriola', sans-serif; }

/* Body Text - Nunito (Readable, Friendly) */
.font-body { font-family: 'Nunito', sans-serif; }
```

#### Typography Scale
```css
/* Headings */
.text-3xl { font-size: 1.875rem; }  /* Page titles */
.text-2xl { font-size: 1.5rem; }    /* Section headers */
.text-lg  { font-size: 1.125rem; }  /* Card titles */

/* Body text */
.text-base { font-size: 1rem; }     /* Regular text */
.text-sm   { font-size: 0.875rem; } /* Secondary text */
.text-xs   { font-size: 0.75rem; }  /* Captions */
```

### Spacing and Layout

#### Consistent Spacing System
```css
/* Based on 0.25rem (4px) increments */
.space-y-6 { margin-top: 1.5rem; }    /* 24px */
.gap-6     { gap: 1.5rem; }           /* 24px */
.p-6       { padding: 1.5rem; }       /* 24px */
.mb-4      { margin-bottom: 1rem; }   /* 16px */
```

#### Grid System
```css
/* Responsive grid layouts */
.grid-cols-1           /* Mobile: 1 column */
.md:grid-cols-2        /* Tablet: 2 columns */
.lg:grid-cols-3        /* Desktop: 3 columns */
.lg:grid-cols-12       /* 12-column grid for complex layouts */
```

## Component Architecture

### Modern Component Structure

#### 1. Layout Components
```
src/layouts/
├── modern.vue          # Modern dashboard layout
├── feed.vue           # Modern feed layout
└── defult.vue         # Updated default layout
```

#### 2. Modern UI Components
```
src/components/modern/
├── ModernSidebar.vue      # Dashboard sidebar
├── ModernHeader.vue       # Dashboard header
├── ModernStatsCard.vue    # Statistics cards
├── ModernFeedHeader.vue   # Feed header
├── ModernFeedDrawer.vue   # Mobile feed drawer
├── ModernFeedLeft.vue     # Feed left sidebar
├── ModernFeedRight.vue    # Feed right sidebar
└── ModernPostComposer.vue # Post creation component
```

### Component Design Patterns

#### 1. Consistent Card Design
```vue
<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-300">
    <!-- Card content -->
  </div>
</template>
```

#### 2. Interactive Elements
```vue
<template>
  <button class="inline-flex items-center px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg text-sm font-medium transition-colors">
    <q-icon name="add" class="mr-2 text-sm" />
    Action Button
  </button>
</template>
```

#### 3. Responsive Navigation
```vue
<template>
  <nav class="space-y-1">
    <router-link
      :class="[
        'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
        item.active
          ? 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300'
          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
      ]"
    >
      <q-icon :name="item.icon" class="mr-3 text-lg" />
      {{ item.name }}
    </router-link>
  </nav>
</template>
```

## Layout Modernization

### Dashboard Layout (`src/layouts/modern.vue`)

#### Key Features
- **Fixed sidebar** with collapsible/mini mode
- **Modern header** with search and user menu
- **Responsive design** with mobile drawer
- **Smooth animations** and transitions

#### Layout Structure
```vue
<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <!-- Sidebar -->
    <ModernSidebar v-model="sidebarOpen" :mini="sidebarMini" />
    
    <!-- Main Content -->
    <div :class="['transition-all duration-300', sidebarMini ? 'ml-16' : 'ml-64']">
      <ModernHeader />
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
```

### Feed Layout (`src/layouts/feed.vue`)

#### Three-Column Responsive Design
```vue
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6">
      <!-- Left Sidebar (3 columns) -->
      <div class="lg:col-span-3">
        <ModernFeedLeft />
      </div>
      
      <!-- Main Feed (6 columns) -->
      <div class="lg:col-span-6">
        <router-view />
      </div>
      
      <!-- Right Sidebar (3 columns) -->
      <div class="lg:col-span-3">
        <ModernFeedRight />
      </div>
    </div>
  </div>
</template>
```

## Icon System

### Material Icons Integration

#### 1. Configuration Update
```typescript
// quasar.config.ts
framework: {
  iconSet: 'material-icons', // Changed from 'bootstrap-icons'
}
```

#### 2. Font Loading
```css
/* src/css/tailwind.css */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
```

#### 3. Usage Examples
```vue
<template>
  <!-- Dashboard icons -->
  <q-icon name="dashboard" class="text-xl text-accent-600" />
  <q-icon name="people" class="text-xl text-blue-600" />
  <q-icon name="settings" class="text-xl text-slate-600" />
  
  <!-- Action icons -->
  <q-icon name="add" class="mr-2 text-sm" />
  <q-icon name="search" class="text-slate-400" />
  <q-icon name="notifications" class="text-xl" />
</template>
```

## Responsive Design

### Breakpoint Strategy

#### Tailwind Breakpoints
```css
/* Mobile First Approach */
sm:   640px   /* Small tablets */
md:   768px   /* Tablets */
lg:   1024px  /* Small desktops */
xl:   1280px  /* Large desktops */
2xl:  1536px  /* Extra large screens */
```

#### Responsive Patterns
```vue
<template>
  <!-- Responsive grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Cards adapt to screen size -->
  </div>
  
  <!-- Responsive visibility -->
  <div class="hidden lg:block">
    <!-- Desktop only content -->
  </div>
  
  <!-- Responsive spacing -->
  <div class="p-4 lg:p-6">
    <!-- Smaller padding on mobile -->
  </div>
</template>
```

### Mobile-First Components

#### Responsive Navigation
```vue
<template>
  <!-- Desktop: Sidebar -->
  <div class="hidden lg:block">
    <ModernSidebar />
  </div>
  
  <!-- Mobile: Drawer -->
  <q-drawer v-model="drawerOpen" class="lg:hidden">
    <ModernFeedDrawer />
  </q-drawer>
</template>
```

## Dark Mode Support

### Implementation Strategy

#### 1. Tailwind Dark Mode
```typescript
// tailwind.config.ts
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
}
```

#### 2. Dark Mode Classes
```vue
<template>
  <!-- Background colors -->
  <div class="bg-white dark:bg-slate-800">
    
    <!-- Text colors -->
    <h1 class="text-slate-900 dark:text-slate-100">Title</h1>
    <p class="text-slate-600 dark:text-slate-400">Description</p>
    
    <!-- Border colors -->
    <div class="border border-slate-200 dark:border-slate-700">
      
      <!-- Interactive states -->
      <button class="hover:bg-slate-100 dark:hover:bg-slate-700">
        Button
      </button>
    </div>
  </div>
</template>
```

#### 3. Theme Toggle Integration
```vue
<script setup>
import { useTheme } from '@/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme">
    <q-icon :name="isDark ? 'light_mode' : 'dark_mode'" />
  </button>
</template>
```

## File Structure

### Project Organization
```
src/
├── components/
│   ├── modern/              # Modern Misskey-style components
│   │   ├── ModernSidebar.vue
│   │   ├── ModernHeader.vue
│   │   ├── ModernStatsCard.vue
│   │   ├── ModernFeedHeader.vue
│   │   ├── ModernFeedDrawer.vue
│   │   ├── ModernFeedLeft.vue
│   │   ├── ModernFeedRight.vue
│   │   └── ModernPostComposer.vue
│   ├── base/                # Original Quasar components
│   └── feed/                # Feed-specific components
├── layouts/
│   ├── modern.vue           # Modern dashboard layout
│   ├── feed.vue            # Modern feed layout
│   └── defult.vue          # Updated default layout
├── pages/
│   ├── index.vue           # Updated dashboard page
│   ├── ModernDashboard.vue # Demo modern dashboard
│   ├── ModernFeed.vue      # Modern feed page
│   └── IconTest.vue        # Icon testing page
├── css/
│   └── tailwind.css        # Tailwind imports and custom styles
└── composables/
    └── useTheme.ts         # Theme management
```

## Usage Examples

### Creating a Modern Card Component

```vue
<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-300">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {{ title }}
      </h3>
      <q-icon :name="icon" class="text-xl text-accent-600 dark:text-accent-400" />
    </div>
    
    <!-- Content -->
    <div class="space-y-3">
      <slot />
    </div>
    
    <!-- Actions -->
    <div class="flex justify-end mt-4 space-x-2">
      <button class="px-3 py-1 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
        Cancel
      </button>
      <button class="px-3 py-1 text-sm bg-accent-600 hover:bg-accent-700 text-white rounded-lg">
        Save
      </button>
    </div>
  </div>
</template>
```

### Responsive Grid Layout

```vue
<template>
  <!-- Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <ModernStatsCard
      v-for="stat in stats"
      :key="stat.id"
      :title="stat.title"
      :value="stat.value"
      :icon="stat.icon"
      :change-type="stat.changeType"
    />
  </div>
  
  <!-- Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Main content (2/3 width on desktop) -->
    <div class="lg:col-span-2">
      <MainContent />
    </div>
    
    <!-- Sidebar (1/3 width on desktop) -->
    <div class="lg:col-span-1">
      <Sidebar />
    </div>
  </div>
</template>
```

## Best Practices

### 1. Component Design
- **Use consistent spacing** with Tailwind's spacing scale
- **Follow the color palette** for brand consistency
- **Implement proper hover states** for interactive elements
- **Ensure accessibility** with proper contrast ratios

### 2. Responsive Design
- **Mobile-first approach** with progressive enhancement
- **Test on multiple screen sizes** regularly
- **Use appropriate breakpoints** for content layout
- **Consider touch interactions** on mobile devices

### 3. Performance
- **Minimize custom CSS** by leveraging Tailwind utilities
- **Use Quasar components** for complex functionality
- **Optimize images** and assets
- **Implement proper lazy loading** where needed

### 4. Maintainability
- **Document component props** and usage
- **Use TypeScript** for better development experience
- **Follow consistent naming conventions**
- **Keep components focused** and reusable

### 5. Integration Guidelines
- **Preserve Quasar functionality** while enhancing visuals
- **Use Tailwind for layout and styling** utilities
- **Maintain design system consistency** across components
- **Test thoroughly** after making changes

## Conclusion

The integration of Misskey's design system with Quasar and Tailwind CSS has successfully modernized the application while maintaining all existing functionality. The hybrid approach leverages the strengths of each technology:

- **Quasar**: Provides robust UI components and utilities
- **Tailwind**: Enables rapid, consistent styling and responsive design
- **Misskey Design**: Brings modern aesthetics and user experience

This implementation serves as a foundation for future development and can be extended with additional components and features while maintaining design consistency and code quality.

## Advanced Topics

### Custom Tailwind Utilities

#### Creating Custom Components
```css
/* src/css/tailwind.css */
@layer components {
  .btn-primary {
    @apply inline-flex items-center px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg text-sm font-medium transition-colors;
  }

  .card-modern {
    @apply bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-300;
  }

  .text-muted {
    @apply text-slate-600 dark:text-slate-400;
  }
}
```

#### Custom Animations
```css
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

### State Management Integration

#### Theme State with Pinia
```typescript
// src/stores/themeStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false);

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateDocumentClass();
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  };

  const updateDocumentClass = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const initTheme = () => {
    const saved = localStorage.getItem('theme');
    isDark.value = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    updateDocumentClass();
  };

  return { isDark, toggleTheme, initTheme };
});
```

### Performance Optimization

#### Tailwind CSS Purging
```typescript
// tailwind.config.ts
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    // Include Quasar components for proper purging
    './node_modules/quasar/src/**/*.{js,ts,vue}',
  ],
  // Enable JIT mode for faster builds
  mode: 'jit',
}
```

#### Component Lazy Loading
```typescript
// src/router/routes.ts
const routes = [
  {
    path: '/modern-feed',
    component: () => import('@/layouts/feed.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/ModernFeed.vue'),
        meta: { preload: true }
      },
    ],
  },
];
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Icons Not Displaying
**Problem**: Icons show as text instead of symbols
**Solution**:
```typescript
// quasar.config.ts - Ensure correct icon set
framework: {
  iconSet: 'material-icons', // Not 'bootstrap-icons'
}
```
```css
/* src/css/tailwind.css - Ensure font is loaded */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
```

#### 2. Tailwind Classes Not Working
**Problem**: Tailwind utilities not applying
**Solutions**:
```typescript
// 1. Check content paths in tailwind.config.ts
content: [
  './src/**/*.{vue,js,ts,jsx,tsx}', // Ensure all file types included
],

// 2. Verify PostCSS configuration
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// 3. Check CSS import order in quasar.config.ts
css: ['src/css/tailwind.css'], // Should be first
```

#### 3. Dark Mode Not Working
**Problem**: Dark mode classes not applying
**Solutions**:
```typescript
// 1. Ensure dark mode is enabled
// tailwind.config.ts
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
}

// 2. Check document class manipulation
const toggleTheme = () => {
  document.documentElement.classList.toggle('dark');
};
```

#### 4. Build Errors
**Problem**: Build fails with Tailwind/PostCSS errors
**Solutions**:
```bash
# 1. Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# 2. Clear Quasar cache
npx quasar clean

# 3. Check for conflicting CSS
# Remove any conflicting PostCSS plugins
```

### Development Tips

#### 1. Debugging Tailwind Classes
```vue
<template>
  <!-- Use browser dev tools to inspect applied classes -->
  <div class="bg-red-500 p-4" style="background: red !important;">
    <!-- If red background shows, Tailwind is working -->
    <!-- If not, check configuration -->
  </div>
</template>
```

#### 2. Testing Responsive Design
```vue
<template>
  <!-- Add visible indicators for breakpoint testing -->
  <div class="fixed top-0 right-0 bg-black text-white p-2 z-50">
    <span class="sm:hidden">XS</span>
    <span class="hidden sm:inline md:hidden">SM</span>
    <span class="hidden md:inline lg:hidden">MD</span>
    <span class="hidden lg:inline xl:hidden">LG</span>
    <span class="hidden xl:inline">XL</span>
  </div>
</template>
```

#### 3. Component Development Workflow
```vue
<template>
  <!-- Start with basic structure -->
  <div class="p-4 border border-gray-300">
    <!-- Add Tailwind classes incrementally -->
    <!-- Test responsiveness at each step -->
    <!-- Verify dark mode compatibility -->
  </div>
</template>
```

## Migration Guide

### From Existing Components to Modern Design

#### Step 1: Identify Components to Modernize
```bash
# Find components using old styling patterns
grep -r "q-card" src/components/
grep -r "class.*q-" src/components/
```

#### Step 2: Create Modern Variants
```vue
<!-- Old Component -->
<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
  </q-card>
</template>

<!-- Modern Component -->
<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 m-6">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
      {{ title }}
    </h3>
  </div>
</template>
```

#### Step 3: Gradual Migration
1. **Create modern variants** alongside existing components
2. **Update layouts** to use modern components
3. **Test thoroughly** before removing old components
4. **Update documentation** and examples

### Future Enhancements

#### Planned Improvements
1. **Animation System**: Enhanced micro-interactions
2. **Component Library**: Comprehensive design system
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Performance**: Further optimization
5. **Testing**: Automated visual regression testing

#### Extension Points
- **Custom Themes**: Additional color schemes
- **Component Variants**: Size and style variations
- **Layout Templates**: Pre-built page layouts
- **Design Tokens**: Centralized design values

## Resources

### Documentation Links
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Quasar Framework Guide](https://quasar.dev/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Material Icons](https://fonts.google.com/icons)

### Design References
- [Misskey Hub Next](https://github.com/misskey-dev/misskey-hub-next)
- [Material Design 3](https://m3.material.io/)
- [Tailwind UI Components](https://tailwindui.com/)

### Tools and Utilities
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind) - Class sorting
- [Tailwind Docs](https://marketplace.visualstudio.com/items?itemName=austenc.tailwind-docs) - Quick reference

This comprehensive integration guide provides everything needed to understand, maintain, and extend the Misskey design system implementation in your Quasar application.
