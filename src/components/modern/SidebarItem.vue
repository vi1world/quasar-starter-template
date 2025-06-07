<template>
  <div>
    <!-- Main Item -->
    <router-link
      v-if="!item.children"
      :to="item.to"
      :class="[
        'block py-2 transition-all duration-200 group',
        isActive
          ? 'text-orange-500 font-black text-3xl'
          : 'text-black dark:text-white hover:text-orange-500 font-black text-3xl'
      ]"
      @click="$emit('click')"
    >
      <!-- Remove icons for authentic Contra style -->
      <span
        v-if="!mini"
        class="block"
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
          'w-full text-left py-2 transition-all duration-200 group',
          hasActiveChild || expanded
            ? 'text-orange-500 font-black text-3xl'
            : 'text-black dark:text-white hover:text-orange-500 font-black text-3xl'
        ]"
        @click="toggleExpanded"
      >
        <!-- Remove icons for authentic Contra style -->
        <span
          v-if="!mini"
          class="block"
        >
          {{ item.label }}
        </span>
        <q-tooltip v-if="mini" anchor="center right" self="center left" :offset="[10, 0]">
          {{ item.label }}
        </q-tooltip>
      </button>

      <!-- Submenu -->
      <div
        v-if="!mini && expanded"
        class="ml-6 mt-4 space-y-4"
      >
        <router-link
          v-for="child in item.children"
          :key="child.to"
          :to="child.to"
          :class="[
            'block py-1 text-2xl font-black transition-all duration-200',
            $route.path === child.to
              ? 'text-orange-500'
              : 'text-black dark:text-white hover:text-orange-500'
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
