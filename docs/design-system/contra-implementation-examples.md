# Contra Design System - Implementation Examples

Complete code examples for implementing Contra design patterns in Quasar Vue applications.

## Table of Contents
1. [Complete Components](#complete-components)
2. [Layout Examples](#layout-examples)
3. [Form Components](#form-components)
4. [Navigation Patterns](#navigation-patterns)
5. [Responsive Implementations](#responsive-implementations)

## Complete Components

### Contra Sidebar Component
```vue
<template>
  <aside class="contra-sidebar">
    <!-- Logo Section -->
    <div class="contra-sidebar-header">
      <div class="contra-logo">
        <div class="contra-logo-icon">
          <span class="text-black font-black text-sm">C</span>
        </div>
        <span class="contra-logo-text">Contra</span>
      </div>
    </div>
    
    <!-- Navigation -->
    <nav class="contra-sidebar-nav">
      <ul class="contra-nav-list">
        <li v-for="item in menuItems" :key="item.id">
          <router-link 
            :to="item.path"
            :class="getSidebarItemClass(item)"
            @click="$emit('item-click', item)"
          >
            <span class="contra-nav-text">{{ item.label }}</span>
          </router-link>
          
          <!-- Submenu -->
          <div v-if="item.children && isExpanded(item)" class="contra-submenu">
            <router-link
              v-for="child in item.children"
              :key="child.id"
              :to="child.path"
              :class="getSubmenuItemClass(child)"
            >
              {{ child.label }}
            </router-link>
          </div>
        </li>
      </ul>
    </nav>
    
    <!-- Footer -->
    <div class="contra-sidebar-footer">
      <p class="text-sm font-medium text-gray-500">© 2025 Contra App</p>
      <p class="text-sm text-gray-400">v1.0.0</p>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['item-click'])
const route = useRoute()

const getSidebarItemClass = (item) => {
  const isActive = route.path === item.path || 
                   (item.children && item.children.some(child => route.path === child.path))
  
  return [
    'contra-nav-item',
    { 'contra-nav-item--active': isActive }
  ]
}

const getSubmenuItemClass = (child) => {
  return [
    'contra-submenu-item',
    { 'contra-submenu-item--active': route.path === child.path }
  ]
}

const isExpanded = (item) => {
  return item.children && item.children.some(child => route.path === child.path)
}
</script>

<style scoped>
.contra-sidebar {
  @apply fixed left-0 top-0 h-full w-64 bg-white flex flex-col;
}

.contra-sidebar-header {
  @apply flex items-center justify-between p-6;
}

.contra-logo {
  @apply flex items-center space-x-3;
}

.contra-logo-icon {
  @apply w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center;
}

.contra-logo-text {
  @apply text-2xl font-black text-black;
}

.contra-sidebar-nav {
  @apply flex-1 overflow-y-auto;
}

.contra-nav-list {
  @apply px-6 py-4 space-y-6;
}

.contra-nav-item {
  @apply block py-2 transition-colors duration-200;
}

.contra-nav-text {
  @apply text-3xl font-black text-black;
}

.contra-nav-item:hover .contra-nav-text {
  @apply text-orange-500;
}

.contra-nav-item--active .contra-nav-text {
  @apply text-orange-500;
}

.contra-submenu {
  @apply ml-6 mt-4 space-y-4;
}

.contra-submenu-item {
  @apply block py-1 text-2xl font-black text-black transition-colors duration-200;
}

.contra-submenu-item:hover {
  @apply text-orange-500;
}

.contra-submenu-item--active {
  @apply text-orange-500;
}

.contra-sidebar-footer {
  @apply p-6 text-left;
}
</style>
```

### Contra Button Component
```vue
<template>
  <button 
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span :class="textClasses">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const base = 'contra-btn'
  const variant = `contra-btn--${props.variant}`
  const size = `contra-btn--${props.size}`
  const disabled = props.disabled ? 'contra-btn--disabled' : ''
  
  return [base, variant, size, disabled].filter(Boolean)
})

const textClasses = computed(() => {
  const sizeMap = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl'
  }
  
  return ['font-black', sizeMap[props.size]]
})
</script>

<style scoped>
.contra-btn {
  @apply inline-flex items-center justify-center px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer;
}

.contra-btn--primary {
  @apply bg-orange-500 text-white;
}

.contra-btn--primary:hover:not(.contra-btn--disabled) {
  @apply bg-orange-600;
}

.contra-btn--secondary {
  @apply bg-white text-black border-2 border-black;
}

.contra-btn--secondary:hover:not(.contra-btn--disabled) {
  @apply bg-black text-white;
}

.contra-btn--text {
  @apply bg-transparent text-black;
}

.contra-btn--text:hover:not(.contra-btn--disabled) {
  @apply text-orange-500;
}

.contra-btn--small {
  @apply px-4 py-2 text-sm;
}

.contra-btn--medium {
  @apply px-6 py-3;
}

.contra-btn--large {
  @apply px-8 py-4;
}

.contra-btn--disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
```

### Contra Card Component
```vue
<template>
  <div :class="cardClasses">
    <header v-if="title || $slots.header" class="contra-card-header">
      <slot name="header">
        <h3 class="contra-card-title">{{ title }}</h3>
        <p v-if="subtitle" class="contra-card-subtitle">{{ subtitle }}</p>
      </slot>
    </header>
    
    <div class="contra-card-content">
      <slot />
    </div>
    
    <footer v-if="$slots.footer" class="contra-card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'highlighted'].includes(value)
  }
})

const cardClasses = computed(() => {
  return [
    'contra-card',
    `contra-card--${props.variant}`
  ]
})
</script>

<style scoped>
.contra-card {
  @apply bg-white rounded-lg p-6;
}

.contra-card--highlighted {
  @apply border-2 border-orange-500;
}

.contra-card-header {
  @apply mb-4;
}

.contra-card-title {
  @apply text-2xl font-black text-black mb-2;
}

.contra-card-subtitle {
  @apply text-base font-medium text-gray-600;
}

.contra-card-content {
  @apply text-base font-medium text-gray-800;
}

.contra-card-footer {
  @apply mt-4 pt-4 border-t border-gray-200;
}
</style>
```

## Layout Examples

### Contra Page Layout
```vue
<template>
  <div class="contra-layout">
    <!-- Sidebar -->
    <ContraSidebar
      :menu-items="menuItems"
      @item-click="handleMenuClick"
    />

    <!-- Main Content -->
    <div class="contra-main">
      <!-- Header -->
      <header class="contra-page-header">
        <div class="contra-header-content">
          <h1 class="contra-page-title">{{ pageTitle }}</h1>
          <p v-if="pageDescription" class="contra-page-description">
            {{ pageDescription }}
          </p>
        </div>

        <div v-if="$slots.actions" class="contra-header-actions">
          <slot name="actions" />
        </div>
      </header>

      <!-- Content -->
      <main class="contra-page-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pageTitle: {
    type: String,
    required: true
  },
  pageDescription: {
    type: String,
    default: ''
  },
  menuItems: {
    type: Array,
    required: true
  }
})

const handleMenuClick = (item) => {
  console.log('Menu item clicked:', item)
}
</script>

<style scoped>
.contra-layout {
  @apply min-h-screen bg-gray-50 flex;
}

.contra-main {
  @apply flex-1 ml-64 flex flex-col;
}

.contra-page-header {
  @apply bg-white px-6 py-8 flex items-start justify-between;
}

.contra-header-content {
  @apply flex-1;
}

.contra-page-title {
  @apply text-4xl font-black text-black mb-2;
}

.contra-page-description {
  @apply text-lg font-medium text-gray-600;
}

.contra-header-actions {
  @apply flex items-center space-x-4;
}

.contra-page-content {
  @apply flex-1 p-6;
}
</style>
```

## Form Components

### Contra Input Component
```vue
<template>
  <div class="contra-input-group">
    <label
      v-if="label"
      :for="inputId"
      class="contra-input-label"
    >
      {{ label }}
      <span v-if="required" class="contra-input-required">*</span>
    </label>

    <div class="contra-input-wrapper">
      <input
        :id="inputId"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />

      <div v-if="$slots.suffix" class="contra-input-suffix">
        <slot name="suffix" />
      </div>
    </div>

    <p v-if="error" class="contra-input-error">{{ error }}</p>
    <p v-else-if="hint" class="contra-input-hint">{{ hint }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const inputId = ref(`contra-input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => {
  return [
    'contra-input',
    {
      'contra-input--error': props.error,
      'contra-input--disabled': props.disabled
    }
  ]
})
</script>

<style scoped>
.contra-input-group {
  @apply w-full;
}

.contra-input-label {
  @apply block text-lg font-black text-black mb-2;
}

.contra-input-required {
  @apply text-orange-500 ml-1;
}

.contra-input-wrapper {
  @apply relative;
}

.contra-input {
  @apply w-full px-4 py-3 text-lg font-medium border-2 border-black rounded-lg;
  @apply focus:outline-none focus:border-orange-500 transition-colors duration-200;
}

.contra-input::placeholder {
  @apply text-gray-400 font-medium;
}

.contra-input--error {
  @apply border-red-500 focus:border-red-500;
}

.contra-input--disabled {
  @apply bg-gray-100 text-gray-500 cursor-not-allowed;
}

.contra-input-suffix {
  @apply absolute right-3 top-1/2 transform -translate-y-1/2;
}

.contra-input-error {
  @apply text-red-500 text-sm font-medium mt-1;
}

.contra-input-hint {
  @apply text-gray-500 text-sm font-medium mt-1;
}
</style>
```

### Contra Form Component
```vue
<template>
  <form class="contra-form" @submit.prevent="handleSubmit">
    <div class="contra-form-header" v-if="title || $slots.header">
      <slot name="header">
        <h2 class="contra-form-title">{{ title }}</h2>
        <p v-if="description" class="contra-form-description">{{ description }}</p>
      </slot>
    </div>

    <div class="contra-form-content">
      <slot />
    </div>

    <div class="contra-form-actions" v-if="$slots.actions || showDefaultActions">
      <slot name="actions">
        <ContraButton
          v-if="showCancel"
          variant="secondary"
          @click="$emit('cancel')"
        >
          {{ cancelText }}
        </ContraButton>

        <ContraButton
          type="submit"
          variant="primary"
          :disabled="loading"
        >
          {{ loading ? loadingText : submitText }}
        </ContraButton>
      </slot>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  showDefaultActions: {
    type: Boolean,
    default: true
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  submitText: {
    type: String,
    default: 'Submit'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  loadingText: {
    type: String,
    default: 'Submitting...'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const handleSubmit = () => {
  emit('submit')
}
</script>

<style scoped>
.contra-form {
  @apply bg-white rounded-lg p-6 space-y-6;
}

.contra-form-header {
  @apply pb-4 border-b border-gray-200;
}

.contra-form-title {
  @apply text-3xl font-black text-black mb-2;
}

.contra-form-description {
  @apply text-lg font-medium text-gray-600;
}

.contra-form-content {
  @apply space-y-4;
}

.contra-form-actions {
  @apply flex items-center justify-end space-x-4 pt-4 border-t border-gray-200;
}
</style>
```

## Navigation Patterns

### Contra Breadcrumbs
```vue
<template>
  <nav class="contra-breadcrumbs" aria-label="Breadcrumb">
    <ol class="contra-breadcrumb-list">
      <li
        v-for="(item, index) in items"
        :key="item.path || index"
        class="contra-breadcrumb-item"
      >
        <router-link
          v-if="item.path && index < items.length - 1"
          :to="item.path"
          class="contra-breadcrumb-link"
        >
          {{ item.label }}
        </router-link>

        <span
          v-else
          class="contra-breadcrumb-current"
        >
          {{ item.label }}
        </span>

        <span
          v-if="index < items.length - 1"
          class="contra-breadcrumb-separator"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(item =>
        typeof item === 'object' &&
        typeof item.label === 'string'
      )
    }
  }
})
</script>

<style scoped>
.contra-breadcrumbs {
  @apply mb-6;
}

.contra-breadcrumb-list {
  @apply flex items-center space-x-2;
}

.contra-breadcrumb-item {
  @apply flex items-center;
}

.contra-breadcrumb-link {
  @apply text-lg font-medium text-gray-600 hover:text-orange-500 transition-colors duration-200;
}

.contra-breadcrumb-current {
  @apply text-lg font-black text-black;
}

.contra-breadcrumb-separator {
  @apply text-gray-400 font-medium mx-2;
}
</style>
```

## Responsive Implementations

### Mobile-First Contra Navigation
```vue
<template>
  <div class="contra-mobile-nav">
    <!-- Mobile Header -->
    <header class="contra-mobile-header lg:hidden">
      <button
        class="contra-mobile-menu-btn"
        @click="toggleMobileMenu"
      >
        <span class="sr-only">Open menu</span>
        <div class="contra-hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div class="contra-mobile-logo">
        <div class="contra-logo-icon">
          <span class="text-black font-black text-sm">C</span>
        </div>
        <span class="text-xl font-black text-black">Contra</span>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="mobileMenuOpen"
      class="contra-mobile-overlay lg:hidden"
      @click="closeMobileMenu"
    >
      <nav class="contra-mobile-menu">
        <ul class="contra-mobile-nav-list">
          <li v-for="item in menuItems" :key="item.id">
            <router-link
              :to="item.path"
              class="contra-mobile-nav-item"
              @click="closeMobileMenu"
            >
              <span class="text-2xl font-black">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Desktop Sidebar -->
    <aside class="contra-desktop-sidebar hidden lg:block">
      <ContraSidebar :menu-items="menuItems" />
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  }
})

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.contra-mobile-header {
  @apply fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-50;
}

.contra-mobile-menu-btn {
  @apply p-2;
}

.contra-hamburger {
  @apply w-6 h-6 flex flex-col justify-center space-y-1;
}

.contra-hamburger span {
  @apply w-full h-0.5 bg-black transition-all duration-200;
}

.contra-mobile-logo {
  @apply flex items-center space-x-2;
}

.contra-logo-icon {
  @apply w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center;
}

.contra-mobile-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-40;
}

.contra-mobile-menu {
  @apply fixed top-0 left-0 h-full w-80 bg-white transform transition-transform duration-300;
}

.contra-mobile-nav-list {
  @apply pt-16 px-6 space-y-4;
}

.contra-mobile-nav-item {
  @apply block py-3 text-black hover:text-orange-500 transition-colors duration-200;
}

.contra-desktop-sidebar {
  @apply fixed left-0 top-0 h-full;
}

/* Responsive Typography */
@media (max-width: 768px) {
  .contra-nav-text {
    @apply text-xl;
  }

  .contra-submenu-item {
    @apply text-lg;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .contra-nav-text {
    @apply text-2xl;
  }

  .contra-submenu-item {
    @apply text-xl;
  }
}
</style>
```

---

## Usage Examples

### Basic Page Implementation
```vue
<template>
  <ContraLayout
    page-title="Dashboard"
    page-description="Welcome back! Here's what's happening today."
    :menu-items="menuItems"
  >
    <template #actions>
      <ContraButton variant="secondary">Export</ContraButton>
      <ContraButton variant="primary">New Report</ContraButton>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ContraCard
        title="Total Revenue"
        subtitle="Monthly recurring revenue"
      >
        <div class="text-3xl font-black text-black">$45,231.89</div>
      </ContraCard>

      <ContraCard
        title="Active Users"
        subtitle="Registered this month"
      >
        <div class="text-3xl font-black text-black">2.4K</div>
      </ContraCard>
    </div>
  </ContraLayout>
</template>

<script setup>
const menuItems = [
  { id: 1, label: 'Dashboard', path: '/' },
  { id: 2, label: 'Analytics', path: '/analytics' },
  { id: 3, label: 'Settings', path: '/settings' }
]
</script>
```

This implementation guide provides complete, production-ready components that follow the authentic Contra design system principles.
