<template>
  <div class="space-y-6">
    <!-- User Profile Card -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <!-- Cover Image -->
      <div
        class="h-20 bg-gradient-to-r from-accent-400 to-accent-600"
        :style="authenStore.loginedCover ? `background-image: url(${authenStore.loginedCover}); background-size: cover; background-position: center;` : ''"
      ></div>

      <!-- Profile Content -->
      <div class="px-4 pb-4">
        <!-- Avatar -->
        <div class="flex justify-center -mt-8 mb-3">
          <q-avatar size="64px" class="border-4 border-white dark:border-slate-800">
            <img
              :src="authenStore.auth?.avatar?.image || '/images/no_picture_thumb.jpg'"
              alt="User Avatar"
              class="rounded-full"
            />
          </q-avatar>
        </div>

        <!-- User Info -->
        <div class="text-center">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {{ authenStore.loginedDisplay || 'Guest User' }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-3">
            Software Engineer
          </p>

          <!-- Stats -->
          <div class="flex justify-center space-x-6 text-sm">
            <div class="text-center">
              <p class="font-semibold text-slate-900 dark:text-slate-100">78</p>
              <p class="text-slate-500 dark:text-slate-400">Prizes</p>
            </div>
            <div class="text-center">
              <p class="font-semibold text-slate-900 dark:text-slate-100">1.2k</p>
              <p class="text-slate-500 dark:text-slate-400">Posts</p>
            </div>
            <div class="text-center">
              <p class="font-semibold text-slate-900 dark:text-slate-100">7.5k</p>
              <p class="text-slate-500 dark:text-slate-400">Comments</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <nav class="space-y-1">
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
      </nav>
    </div>

    <!-- Saved Posts -->
    <div v-if="screen.gt.sm" class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <div class="flex items-center mb-4">
        <q-icon :name="biBookmark" class="mr-2 text-accent-600 dark:text-accent-400" />
        <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {{ t('savedPost') }}
        </h3>
      </div>
      <div class="space-y-3">
        <div v-for="(post, index) in savedList" :key="index" class="flex items-start space-x-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors">
          <img
            :src="post.image"
            :alt="post.title"
            class="w-12 h-12 rounded-lg object-cover"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-2">
              {{ post.title }}
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {{ post.author }}
            </p>
          </div>
        </div>
      </div>
      <button class="w-full mt-4 text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 font-medium flex items-center justify-center">
        <q-icon :name="biChevronDown" class="mr-1" />
        {{ t('base.seeMore') }}
      </button>
    </div>

    <!-- Following Tags -->
    <div v-if="screen.gt.sm" class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <div class="flex items-center mb-4">
        <q-icon :name="laHashtagSolid" class="mr-2 text-accent-600 dark:text-accent-400" />
        <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {{ t('followingTag') }}
        </h3>
      </div>
      <div class="space-y-3">
        <div v-for="(item, index) in followingTags" :key="index" class="flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors">
          <div class="flex items-center space-x-3">
            <q-icon :name="laHashtagSolid" class="text-accent-600 dark:text-accent-400" />
            <div>
              <router-link
                :to="`/tag/${item.tag}`"
                class="text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                {{ item.tag }}
              </router-link>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                By {{ item.author }}
              </p>
            </div>
          </div>
          <button class="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            <q-icon :name="biDashCircle" class="text-slate-400 hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>
      <button class="w-full mt-4 text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 font-medium flex items-center justify-center">
        <q-icon :name="biChevronDown" class="mr-1" />
        {{ t('base.seeMore') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useAuthenStore } from '@/stores/authenStore';
import { useLang } from '@/composables/useLang';
import { biBookmark, biChevronDown, biDashCircle } from '@quasar/extras/bootstrap-icons';
import { laHashtagSolid } from '@quasar/extras/line-awesome';

const { screen } = useQuasar();
const authenStore = useAuthenStore();
const { t } = useLang();

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

// Saved posts data from original component
const savedList = ref([
  {
    image: 'https://picsum.photos/160',
    title: 'Sobering up has had a negative affect on relationship with [25f] gf. How to handle?',
    author: 'BigGumbyLover',
  },
  {
    image: 'https://picsum.photos/160',
    title: 'Worker disappears after he was accidentally paid more than 300 times his salary',
    author: 'Flair_Helper',
  },
  {
    image: 'https://picsum.photos/160',
    title: 'The only picture we have of my grandfather who died in WWII',
    author: 'TrebleRose68',
  },
]);

// Following tags data from original component
const followingTags = ref([
  {
    tag: 'FreeDocumentary',
    author: 'TrebleRose68',
    id: 1,
  },
  {
    tag: 'Documentary',
    author: 'Bekaku',
    id: 2,
  },
  {
    tag: 'DesperateHours',
    author: 'TrebleRose68',
    id: 3,
  },
]);
</script>
