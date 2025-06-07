<template>
  <q-drawer
    v-model="isOpen"
    side="left"
    :overlay="overlay"
    :width="300"
    class="bg-white dark:bg-slate-900"
  >
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div class="p-6 border-b border-slate-200 dark:border-slate-700">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-600 to-electric-500 rounded-2xl flex items-center justify-center">
            <span class="text-white font-black text-lg">C</span>
          </div>
          <div>
            <h2 class="text-xl font-black text-slate-900 dark:text-white">Contra</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Feed</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex-1 overflow-y-auto p-4">
        <ContraFeedLeft />
      </div>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ContraFeedLeft from './ContraFeedLeft.vue';

interface Props {
  modelValue: boolean;
  overlay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  overlay: true
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>
