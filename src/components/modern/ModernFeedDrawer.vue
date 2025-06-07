<template>
  <q-drawer
    v-model="drawerModel"
    :overlay="overlay"
    :width="280"
    :breakpoint="1024"
    bordered
    class="bg-white dark:bg-slate-800"
  >
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div class="p-4 border-b border-slate-200 dark:border-slate-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">M</span>
            </div>
            <span class="text-lg font-bold text-slate-900 dark:text-slate-100">
              Misskey
            </span>
          </div>
          <button
            @click="drawerModel = false"
            class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <q-icon name="close" class="text-lg" />
          </button>
        </div>
      </div>

      <!-- User Profile Section -->
      <div class="p-4 border-b border-slate-200 dark:border-slate-700">
        <div class="flex items-center space-x-3">
          <q-avatar size="48px">
            <img
              src="/images/no_picture_thumb.jpg"
              alt="User Avatar"
              class="rounded-full"
            />
          </q-avatar>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
              John Doe
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400 truncate">
              @johndoe
            </p>
          </div>
        </div>
        
        <!-- Stats -->
        <div class="flex space-x-4 mt-3">
          <div class="text-center">
            <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">1.2K</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Following</p>
          </div>
          <div class="text-center">
            <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">3.4K</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Followers</p>
          </div>
          <div class="text-center">
            <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">567</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Posts</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex-1 overflow-y-auto">
        <nav class="p-2">
          <div class="space-y-1">
            <router-link
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.to"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="[
                item.active
                  ? 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              ]"
            >
              <q-icon :name="item.icon" class="mr-3 text-lg" />
              {{ item.name }}
              <q-badge
                v-if="item.badge"
                :color="item.badgeColor || 'red'"
                :label="item.badge"
                class="ml-auto"
              />
            </router-link>
          </div>
        </nav>

        <!-- Trending Section -->
        <div class="p-4 border-t border-slate-200 dark:border-slate-700 mt-4">
          <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Trending
          </h3>
          <div class="space-y-3">
            <div v-for="trend in trendingTopics" :key="trend.tag" class="cursor-pointer">
              <p class="text-sm font-medium text-slate-900 dark:text-slate-100">
                #{{ trend.tag }}
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                {{ trend.posts }} posts
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-700">
        <div class="flex items-center justify-between">
          <button class="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
            <q-icon name="settings" />
            <span>Settings</span>
          </button>
          <button class="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
            <q-icon name="logout" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: boolean;
  overlay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  overlay: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const drawerModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const navigationItems = [
  {
    name: 'Home',
    icon: 'home',
    to: '/feed',
    active: true,
  },
  {
    name: 'Explore',
    icon: 'explore',
    to: '/feed/explore',
  },
  {
    name: 'Notifications',
    icon: 'notifications',
    to: '/feed/notifications',
    badge: '3',
    badgeColor: 'red',
  },
  {
    name: 'Messages',
    icon: 'mail',
    to: '/feed/messages',
    badge: '2',
    badgeColor: 'blue',
  },
  {
    name: 'Bookmarks',
    icon: 'bookmark',
    to: '/feed/bookmarks',
  },
  {
    name: 'Profile',
    icon: 'person',
    to: '/feed/profile',
  },
];

const trendingTopics = [
  { tag: 'technology', posts: '1.2K' },
  { tag: 'design', posts: '856' },
  { tag: 'programming', posts: '743' },
  { tag: 'ai', posts: '621' },
];
</script>
