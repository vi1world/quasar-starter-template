<template>
  <div>
    <!-- Main Item -->
    <router-link
      v-if="!item.children"
      :to="item.to"
      :class="[
        'flex items-center px-3 py-2 rounded-lg transition-all duration-200 group',
        isActive 
          ? 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
      ]"
      @click="$emit('click')"
    >
      <q-icon 
        :name="item.icon" 
        :class="[
          'text-lg',
          mini ? 'mx-auto' : 'mr-3',
          isActive ? 'text-accent-600 dark:text-accent-400' : ''
        ]"
      />
      <span 
        v-if="!mini" 
        class="font-medium text-sm"
      >
        {{ item.label }}
      </span>
      <q-tooltip v-if="mini" anchor="center right" self="center left" :offset="[10, 0]">
        {{ item.label }}
      </q-tooltip>
    </router-link>

    <!-- Expandable Item -->
    <div v-else>
      <button
        :class="[
          'w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 group',
          hasActiveChild || expanded
            ? 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300' 
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
        ]"
        @click="toggleExpanded"
      >
        <q-icon 
          :name="item.icon" 
          :class="[
            'text-lg',
            mini ? 'mx-auto' : 'mr-3',
            hasActiveChild ? 'text-accent-600 dark:text-accent-400' : ''
          ]"
        />
        <span 
          v-if="!mini" 
          class="font-medium text-sm flex-1 text-left"
        >
          {{ item.label }}
        </span>
        <q-icon 
          v-if="!mini"
          name="keyboard_arrow_down" 
          :class="[
            'text-sm transition-transform duration-200',
            expanded ? 'rotate-180' : ''
          ]"
        />
        <q-tooltip v-if="mini" anchor="center right" self="center left" :offset="[10, 0]">
          {{ item.label }}
        </q-tooltip>
      </button>

      <!-- Submenu -->
      <div 
        v-if="!mini && expanded"
        class="ml-6 mt-1 space-y-1 border-l border-slate-200 dark:border-slate-600 pl-3"
      >
        <router-link
          v-for="child in item.children"
          :key="child.to"
          :to="child.to"
          :class="[
            'block px-3 py-2 rounded-lg text-sm transition-all duration-200',
            $route.path === child.to
              ? 'bg-accent-50 dark:bg-accent-950 text-accent-700 dark:text-accent-300 font-medium'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-300'
          ]"
          @click="$emit('click')"
        >
          {{ child.label }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

interface SidebarItem {
  label: string;
  icon: string;
  to: string;
  active?: boolean;
  children?: SidebarItem[];
}

interface Props {
  item: SidebarItem;
  mini: boolean;
}

const props = defineProps<Props>();
defineEmits<{
  click: [];
}>();

const route = useRoute();
const expanded = ref(false);

const isActive = computed(() => {
  if (props.item.children) {
    return hasActiveChild.value;
  }
  return route.path === props.item.to || route.path.startsWith(props.item.to + '/');
});

const hasActiveChild = computed(() => {
  if (!props.item.children) return false;
  return props.item.children.some(child => 
    route.path === child.to || route.path.startsWith(child.to + '/')
  );
});

function toggleExpanded() {
  if (!props.mini) {
    expanded.value = !expanded.value;
  }
}

// Auto-expand if has active child
if (hasActiveChild.value) {
  expanded.value = true;
}
</script>
