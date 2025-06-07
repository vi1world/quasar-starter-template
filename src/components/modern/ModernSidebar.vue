<template>
  <aside 
    :class="[
      'fixed left-0 top-0 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 z-50',
      mini ? 'w-16' : 'w-64',
      modelValue ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Logo Section -->
    <div class="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
      <div v-if="!mini" class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-sm">M</span>
        </div>
        <span class="font-title font-bold text-lg text-slate-800 dark:text-slate-200">
          Misskey Admin
        </span>
      </div>
      <div v-else class="flex justify-center w-full">
        <div class="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-sm">M</span>
        </div>
      </div>
    </div>

    <!-- Search Section -->
    <div v-if="!mini" class="p-4">
      <div class="relative">
        <q-icon 
          name="search" 
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"
        />
        <input
          type="text"
          placeholder="Search menu..."
          class="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
        />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto">
      <ul class="p-2 space-y-1">
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
    <div class="border-t border-slate-200 dark:border-slate-700 p-4">
      <div v-if="!mini" class="text-center">
        <p class="text-xs text-slate-500 dark:text-slate-400">
          © 2025 Misskey Admin
        </p>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          v1.0.0
        </p>
      </div>
      <div v-else class="flex justify-center">
        <q-icon name="info" class="text-slate-400 text-sm" />
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
