# Contra Design System - Quick Reference

## ✅ Icon Alignment Fix Applied

### Problem Solved
Icons were previously aligned to the bottom of containers due to `vertical-align: -.125em` in Bootstrap Icons CSS.

### Solution
```css
/* Fixed Bootstrap Icons alignment */
.bi {
  vertical-align: middle; /* Changed from -.125em */
}

/* Enhanced Quasar and Material Icons alignment */
.q-icon, .material-icons {
  vertical-align: middle !important;
  display: inline-flex !important;
  align-items: center !important;
}
```

### Result
Icons now properly center in buttons, navigation, and containers:
```vue
<q-btn><q-icon name="settings" />Settings</q-btn>
<button class="btn-contra"><q-icon name="star" />Action</button>
```

## 🎯 Core Philosophy
**Bold Simplicity** - Typography first, minimal decoration, strategic color usage

## 🎨 Color Palette
```scss
$contra-yellow: #ffbd12;    // Logo/brand only
$contra-orange: #ff6b35;    // Active states, CTAs
$contra-black: #000000;     // Primary text
$contra-white: #ffffff;     // Backgrounds
$contra-gray: #6b7280;      // Secondary text
```

## 📝 Typography Scale
```scss
.text-contra-hero    { font-size: 3rem; font-weight: 900; }    // 48px, Black
.text-contra-title   { font-size: 2rem; font-weight: 900; }    // 32px, Black  
.text-contra-heading { font-size: 1.5rem; font-weight: 900; }  // 24px, Black
.text-contra-body    { font-size: 1rem; font-weight: 500; }    // 16px, Medium
.text-contra-small   { font-size: 0.875rem; font-weight: 500; } // 14px, Medium
```

## 🧩 Component Templates

### Navigation Item
```vue
<a href="#" class="contra-nav-item">
  <span class="text-3xl font-black text-black hover:text-orange-500">
    Menu Item
  </span>
</a>
```

### Button
```vue
<button class="contra-btn contra-btn--primary">
  <span class="text-lg font-black">Button Text</span>
</button>
```

### Card
```vue
<div class="contra-card">
  <h3 class="text-2xl font-black text-black mb-4">Card Title</h3>
  <p class="text-base font-medium text-gray-600">Card content</p>
</div>
```

### Input
```vue
<input 
  class="w-full px-4 py-3 text-lg font-medium border-2 border-black rounded-lg focus:border-orange-500"
  placeholder="Enter text..."
/>
```

## ✅ Do's
- Use **font-black (900)** for headings and navigation
- Use **large text sizes** - don't be afraid of big typography
- Apply **orange (#ff6b35)** for active states and interactions
- Keep **clean white backgrounds**
- Use **generous spacing** between elements
- Focus on **content over decoration**

## ❌ Don'ts
- Avoid heavy borders, shadows, or gradients
- Don't use icons on every element
- No subtle or muted styling
- Don't use font-light or font-thin
- Avoid complex color schemes
- No transparency or blur effects

## 🔄 Quasar Component Conversions

### Q-Btn → Contra Button
```vue
<!-- Before -->
<q-btn color="primary" icon="add" label="Add" />

<!-- After -->
<button class="contra-btn contra-btn--primary">
  <span class="text-lg font-black">Add</span>
</button>
```

### Q-Card → Contra Card
```vue
<!-- Before -->
<q-card class="shadow-lg">
  <q-card-section>
    <div class="text-h6">Title</div>
  </q-card-section>
</q-card>

<!-- After -->
<div class="contra-card">
  <h3 class="text-2xl font-black text-black">Title</h3>
</div>
```

### Q-List → Contra Navigation
```vue
<!-- Before -->
<q-list>
  <q-item clickable>
    <q-item-section avatar>
      <q-icon name="home" />
    </q-item-section>
    <q-item-section>Home</q-item-section>
  </q-item>
</q-list>

<!-- After -->
<nav class="contra-nav">
  <a href="#" class="contra-nav-item">
    <span class="text-3xl font-black text-black">Home</span>
  </a>
</nav>
```

## 📱 Responsive Typography
```scss
// Mobile-first approach
.contra-nav-item span {
  @apply text-xl;           // Mobile: 20px
  
  @screen md {
    @apply text-2xl;        // Tablet: 24px
  }
  
  @screen lg {
    @apply text-3xl;        // Desktop: 30px
  }
}
```

## 🎯 Quick Checklist
Before shipping any component:

- [ ] Typography is bold and prominent (font-black for headings)
- [ ] Minimal styling without unnecessary decoration
- [ ] Orange used for interactions, black for text
- [ ] Clean white or light background
- [ ] Generous spacing and readability
- [ ] Would fit in authentic Contra mobile app

## 🚀 CSS Classes Reference

### Navigation
```scss
.contra-nav          // Base navigation container
.contra-nav-item     // Navigation link
.contra-nav-item--active  // Active state (orange text)
```

### Buttons
```scss
.contra-btn          // Base button
.contra-btn--primary // Orange background, white text
.contra-btn--secondary // White background, black border
```

### Layout
```scss
.contra-card         // Clean white card with padding
.contra-layout       // Full-height page layout
.contra-header       // Page header with title
.contra-content      // Main content area
```

### Typography
```scss
.text-contra-hero    // 48px, font-black
.text-contra-title   // 32px, font-black
.text-contra-heading // 24px, font-black
.text-contra-body    // 16px, font-medium
.text-contra-small   // 14px, font-medium
```

## 🔗 Resources
- [Full Documentation](./contra-design-system-guide.md)
- [Contra Mobile App](https://contra.com) - Design reference
- [Implementation Examples](../src/components/modern/) - Code examples

---
**Remember**: When in doubt, **remove decoration** and **emphasize typography**.
