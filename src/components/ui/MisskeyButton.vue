<template>
  <router-link 
    v-if="buttonType === 'link'" 
    :to="to" 
    :class="buttonClasses"
  >
    <slot></slot>
  </router-link>
  <button 
    v-else 
    @click="onClick" 
    :class="buttonClasses"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /** Button type */
  buttonType?: 'button' | 'link';
  /** Navigation target for link type */
  to?: string;
  /** Color variant */
  color?: 'accent' | 'plain' | 'outline';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  buttonType: 'button',
  color: 'plain',
  size: 'md',
  disabled: false,
  fullWidth: false,
});

const emits = defineEmits<{
  click: [];
}>();

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex items-center justify-center font-bold rounded-full transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ];

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Color classes
  const colorClasses = {
    accent: [
      'text-white shadow-misskey-accent',
      'bg-gradient-to-r from-accent-600 to-accent-500',
      'hover:from-accent-700 hover:to-accent-600',
      'active:from-accent-800 active:to-accent-700',
    ],
    plain: [
      'text-accent-600 bg-white shadow-misskey',
      'hover:text-accent-700 hover:bg-lime-50',
      'active:bg-lime-100',
      'dark:bg-slate-800 dark:text-accent-400',
      'dark:hover:bg-slate-700 dark:hover:text-accent-300',
    ],
    outline: [
      'text-accent-600 border-2 border-accent-600 bg-transparent',
      'hover:bg-accent-600 hover:text-white',
      'active:bg-accent-700 active:border-accent-700',
      'dark:text-accent-400 dark:border-accent-400',
      'dark:hover:bg-accent-400 dark:hover:text-slate-900',
    ],
  };

  // Width classes
  const widthClasses = props.fullWidth ? 'w-full' : '';

  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...colorClasses[props.color],
    widthClasses,
  ].filter(Boolean).join(' ');
});

function onClick() {
  if (!props.disabled) {
    emits('click');
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
.btn-gradient-animation {
  background-size: 200% 100%;
  background-position-x: 0%;
  transition: background-position-x 0.3s ease;
}

.btn-gradient-animation:hover {
  background-position-x: 100%;
}
</style>
