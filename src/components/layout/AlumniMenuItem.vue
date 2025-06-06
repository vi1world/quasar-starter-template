<script setup lang="ts">
import { useBase } from 'src/composables/useBase';
import { useLang } from 'src/composables/useLang';
import { computed } from 'vue';
import type { LabelValue } from '@/types/common';

const {
  item,
  iconSize = '20px',
  dense = true,
  darkText = '',
  lightText = ''
} = defineProps<{
  item: LabelValue<any>;
  iconSize?: string;
  dense?: boolean;
  darkText?: string;
  lightText?: string;
}>();

const { t } = useLang();
const { getCurrentPath } = useBase();

const currentUrlPath = computed(() => getCurrentPath(false));

// Check if the current menu item is active
const isActive = computed(() => {
  if (!item.to) return false;
  
  // Exact match for home route
  if (item.to === '/' || item.to === '/home') {
    return currentUrlPath.value === item.to;
  }
  
  // Partial match for other routes
  return currentUrlPath.value.startsWith(item.to);
});

// Handle menu item click
const handleClick = () => {
  if (item.external) {
    // Open external links in new tab
    window.open(item.to, '_blank');
  } else if (item.to) {
    // Navigate to internal route
    window.location.href = item.to;
  }
};

// Get the display label
const displayLabel = computed(() => {
  return item?.translateLabel !== false ? t(`${item.label}`) : item.label;
});

// Get icon color based on active state
const iconColor = computed(() => {
  if (isActive.value) {
    return 'primary';
  }
  return undefined;
});

// Get text color based on active state
const textColor = computed(() => {
  if (isActive.value) {
    return 'primary';
  }
  return darkText || lightText || undefined;
});
</script>

<template>
  <q-item
    :clickable="!!item.to"
    :dense="dense"
    :active="isActive"
    :to="item.external ? undefined : item.to"
    @click="item.external ? handleClick() : undefined"
    class="alumni-menu-item"
    :class="{ 'alumni-menu-item--active': isActive }"
  >
    <q-item-section v-if="item.icon" avatar>
      <q-icon 
        :name="item.icon" 
        :size="iconSize" 
        :color="iconColor"
      />
    </q-item-section>
    
    <q-item-section v-if="item.avatar" avatar>
      <q-avatar :size="iconSize">
        <img :src="item.avatar.src" :alt="displayLabel" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label 
        :class="textColor ? `text-${textColor}` : ''"
        class="alumni-menu-label"
      >
        {{ displayLabel }}
      </q-item-label>
      <q-item-label 
        v-if="item.description" 
        caption 
        class="text-grey-6"
      >
        {{ item.description }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <slot name="end" :item="item" />
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped>
.alumni-menu-item {
  border-radius: 8px;
  margin: 2px 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--q-primary-light, rgba(25, 118, 210, 0.1));
  }

  &--active {
    background-color: var(--q-primary-light, rgba(25, 118, 210, 0.15));
    
    .alumni-menu-label {
      font-weight: 600;
    }
  }
}

.alumni-menu-label {
  font-size: 14px;
  line-height: 1.4;
}
</style>
