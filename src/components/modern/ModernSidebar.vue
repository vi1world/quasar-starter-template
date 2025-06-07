<template>
  <aside
    :class="[
      'fixed left-0 top-0 h-full bg-white dark:bg-slate-900 transition-all duration-300 z-50',
      mini ? 'w-16' : 'w-64',
      modelValue ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Logo Section -->
    <div class="flex items-center justify-between p-6">
      <div v-if="!mini" class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
          <span class="text-black font-black text-sm">C</span>
        </div>
        <span class="font-black text-2xl text-black dark:text-white">
          Contra
        </span>
      </div>
      <div v-else class="flex justify-center w-full">
        <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
          <span class="text-black font-black text-sm">C</span>
        </div>
      </div>
    </div>

    <!-- Search Section - Removed for authentic Contra style -->
    <!-- Contra's real menu doesn't have search -->

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto">
      <ul class="px-6 py-4 space-y-6">
        <li v-for="item in items" :key="item.to">
          <SidebarItem
            :item="item"
            :mini="mini"
            @click="handleItemClick"
          />
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="p-6">
      <div v-if="!mini" class="text-left">
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
          © 2025 Contra App
        </p>
        <p class="text-sm text-gray-400 dark:text-gray-500">
          v1.0.0
        </p>
      </div>
      <div v-else class="flex justify-center">
        <q-icon name="info" class="text-gray-400 text-sm" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import SidebarItem from './SidebarItem.vue';

interface SidebarItem {
  label: string;
  icon: string;
  to: string;
  active?: boolean;
  children?: SidebarItem[];
}

interface Props {
  modelValue: boolean;
  items: SidebarItem[];
  mini: boolean;
}

defineProps<Props>();

const emits = defineEmits<{
  'update:modelValue': [value: boolean];
  'toggle-mini': [];
}>();

function handleItemClick() {
  // Close sidebar on mobile when item is clicked
  emits('update:modelValue', false);
}
</script>
