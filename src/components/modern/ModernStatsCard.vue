<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-300">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
          {{ title }}
        </p>
        <p class="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {{ value }}
        </p>
        <div class="flex items-center space-x-2">
          <span 
            :class="[
              'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
              changeType === 'increase' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : changeType === 'decrease'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
            ]"
          >
            <q-icon 
              v-if="changeType === 'increase'"
              name="trending_up" 
              class="mr-1 text-xs"
            />
            <q-icon 
              v-else-if="changeType === 'decrease'"
              name="trending_down" 
              class="mr-1 text-xs"
            />
            {{ changeValue }}
          </span>
          <span class="text-sm text-slate-500 dark:text-slate-400">
            {{ changeDescription }}
          </span>
        </div>
      </div>
      <div 
        :class="[
          'w-12 h-12 rounded-lg flex items-center justify-center',
          iconBg || 'bg-accent-100 dark:bg-accent-900'
        ]"
      >
        <q-icon 
          :name="icon" 
          :class="[
            'text-xl',
            iconColor || 'text-accent-600 dark:text-accent-400'
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  value: string | number;
  icon: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  changeValue?: string;
  changeDescription?: string;
  iconBg?: string;
  iconColor?: string;
}

withDefaults(defineProps<Props>(), {
  changeType: 'neutral',
  changeValue: '',
  changeDescription: '',
});
</script>
