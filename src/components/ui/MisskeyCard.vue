<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /** Card variant */
  variant?: 'default' | 'blur' | 'solid' | 'outline';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Enable hover effect */
  hoverable?: boolean;
  /** Enable shadow */
  shadow?: boolean;
  /** Custom class */
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  hoverable: false,
  shadow: true,
});

const cardClasses = computed(() => {
  const baseClasses = [
    'rounded-2xl transition-all duration-300',
  ];

  // Variant classes - Contra style
  const variantClasses = {
    default: [
      'bg-white dark:bg-slate-900 border-2 border-contra-black-950',
      props.shadow ? 'shadow-contra' : '',
    ],
    blur: [
      'bg-white dark:bg-slate-900 border-2 border-contra-black-950',
      props.shadow ? 'shadow-contra' : '',
    ],
    solid: [
      'bg-white dark:bg-slate-800 border-2 border-contra-black-950',
      props.shadow ? 'shadow-contra' : '',
    ],
    outline: [
      'border-2 border-contra-black-950 bg-white dark:bg-slate-800',
      props.shadow ? 'shadow-contra' : '',
    ],
  };

  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  // Hover classes - Contra style
  const hoverClasses = props.hoverable ? [
    'hover:shadow-contra-hover hover:-translate-y-1',
    'cursor-pointer',
  ] : [];

  return [
    ...baseClasses,
    ...variantClasses[props.variant],
    paddingClasses[props.padding],
    ...hoverClasses,
    props.class || '',
  ].filter(Boolean).join(' ');
});
</script>

<style scoped>
.card-header {
  @apply border-b border-slate-200 dark:border-slate-700 pb-4 mb-4;
}

.card-footer {
  @apply border-t border-slate-200 dark:border-slate-700 pt-4 mt-4;
}

.card-content {
  @apply flex-1;
}
</style>
