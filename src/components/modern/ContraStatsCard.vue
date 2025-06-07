<template>
  <div 
    :class="[
      'card-contra p-8 group cursor-pointer',
      gradientClass,
      'animate-fade-in'
    ]"
    @click="$emit('click')"
  >
    <!-- Icon Section -->
    <div class="flex items-center justify-between mb-6">
      <div 
        :class="[
          'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110',
          iconBgClass
        ]"
      >
        <q-icon 
          :name="icon" 
          :class="[
            'text-2xl transition-all duration-300',
            iconColorClass
          ]" 
        />
      </div>
      
      <!-- Trend Indicator -->
      <div 
        v-if="trend"
        :class="[
          'flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold',
          trendClass
        ]"
      >
        <q-icon 
          :name="trend > 0 ? 'trending_up' : 'trending_down'" 
          class="text-sm" 
        />
        <span>{{ Math.abs(trend) }}%</span>
      </div>
    </div>

    <!-- Content Section -->
    <div class="space-y-3">
      <!-- Value -->
      <div 
        :class="[
          'text-display font-black transition-all duration-300 group-hover:scale-105',
          textColorClass
        ]"
      >
        {{ formattedValue }}
      </div>
      
      <!-- Title -->
      <h3 
        :class="[
          'text-xl font-bold transition-all duration-300',
          titleColorClass
        ]"
      >
        {{ title }}
      </h3>
      
      <!-- Description -->
      <p 
        v-if="description"
        :class="[
          'text-sm opacity-80 transition-all duration-300',
          descriptionColorClass
        ]"
      >
        {{ description }}
      </p>
    </div>

    <!-- Progress Bar (if provided) -->
    <div v-if="progress !== undefined" class="mt-6">
      <div class="flex justify-between items-center mb-2">
        <span :class="['text-sm font-medium', titleColorClass]">Progress</span>
        <span :class="['text-sm font-bold', textColorClass]">{{ progress }}%</span>
      </div>
      <div class="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <div 
          :class="[
            'h-full rounded-full transition-all duration-1000 ease-out',
            progressBarClass
          ]"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>

    <!-- Floating Elements for Visual Interest -->
    <div
      v-if="variant === 'gradient'"
      class="absolute top-4 right-4 w-20 h-20 rounded-full bg-white border-2 border-contra-black-950 animate-float"
    ></div>
    <div
      v-if="variant === 'gradient'"
      class="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-primary-500 border-2 border-contra-black-950 animate-float"
      style="animation-delay: 2s;"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  value: number | string;
  icon: string;
  description?: string;
  trend?: number; // Percentage change
  progress?: number; // Progress percentage (0-100)
  variant?: 'default' | 'gradient' | 'electric' | 'sunset';
  color?: 'primary' | 'electric' | 'sunshine' | 'coral';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  color: 'primary'
});

defineEmits<{
  click: [];
}>();

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    if (props.value >= 1000000) {
      return (props.value / 1000000).toFixed(1) + 'M';
    } else if (props.value >= 1000) {
      return (props.value / 1000).toFixed(1) + 'K';
    }
    return props.value.toLocaleString();
  }
  return props.value;
});

const gradientClass = computed(() => {
  if (props.variant === 'gradient') {
    switch (props.color) {
      case 'electric':
        return 'card-contra-electric';
      case 'sunshine':
        return 'card-contra-sunset';
      case 'coral':
        return 'card-contra-sunset';
      default:
        return 'card-contra-gradient';
    }
  }
  return '';
});

const iconBgClass = computed(() => {
  if (props.variant === 'gradient') {
    return 'bg-white border-2 border-contra-black-950';
  }

  switch (props.color) {
    case 'electric':
      return 'bg-electric-100 dark:bg-electric-900 border-2 border-contra-black-950';
    case 'sunshine':
      return 'bg-sunshine-100 dark:bg-sunshine-900 border-2 border-contra-black-950';
    case 'coral':
      return 'bg-coral-100 dark:bg-coral-900 border-2 border-contra-black-950';
    default:
      return 'bg-primary-100 dark:bg-primary-900 border-2 border-contra-black-950';
  }
});

const iconColorClass = computed(() => {
  if (props.variant === 'gradient') {
    return 'text-white';
  }
  
  switch (props.color) {
    case 'electric':
      return 'text-electric-600 dark:text-electric-400';
    case 'sunshine':
      return 'text-sunshine-600 dark:text-sunshine-400';
    case 'coral':
      return 'text-coral-600 dark:text-coral-400';
    default:
      return 'text-primary-600 dark:text-primary-400';
  }
});

const textColorClass = computed(() => {
  if (props.variant === 'gradient') {
    return 'text-white';
  }
  return 'text-slate-900 dark:text-slate-100';
});

const titleColorClass = computed(() => {
  if (props.variant === 'gradient') {
    return 'text-white/90';
  }
  return 'text-slate-700 dark:text-slate-300';
});

const descriptionColorClass = computed(() => {
  if (props.variant === 'gradient') {
    return 'text-white/80';
  }
  return 'text-slate-600 dark:text-slate-400';
});

const trendClass = computed(() => {
  if (props.trend === undefined) return '';

  const isPositive = props.trend > 0;

  if (props.variant === 'gradient') {
    return isPositive
      ? 'bg-white text-contra-black-950 border-2 border-contra-black-950'
      : 'bg-white text-contra-black-950 border-2 border-contra-black-950';
  }

  return isPositive
    ? 'bg-green-500 text-white border-2 border-contra-black-950'
    : 'bg-red-500 text-white border-2 border-contra-black-950';
});

const progressBarClass = computed(() => {
  if (props.variant === 'gradient') {
    return 'bg-white border-2 border-contra-black-950';
  }

  switch (props.color) {
    case 'electric':
      return 'bg-electric-500 border-2 border-contra-black-950';
    case 'sunshine':
      return 'bg-sunshine-500 border-2 border-contra-black-950';
    case 'coral':
      return 'bg-coral-500 border-2 border-contra-black-950';
    default:
      return 'bg-primary-500 border-2 border-contra-black-950';
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
