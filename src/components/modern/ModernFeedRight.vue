<template>
  <div class="space-y-6">
    <!-- Recent Activity -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Recent activity
      </h3>
      <div class="space-y-4">
        <div class="flex items-center justify-center space-x-4">
          <q-avatar size="36px">
            <q-img :src="AvatarPlaceHolder128" />
          </q-avatar>
          <q-icon :name="biArrowRight" size="md" class="text-amber-500" />
          <q-avatar size="36px">
            <q-img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </div>
        <p class="text-sm text-center text-slate-700 dark:text-slate-300">
          Chanavee gives prize to Bekaku
        </p>
        <div class="flex justify-center">
          <q-icon :name="biGift" class="text-amber-500 text-xl" />
        </div>
      </div>

      <div class="mt-4 space-y-4">
        <div class="flex items-center justify-center space-x-4">
          <q-avatar size="36px">
            <q-img :src="AvatarPlaceHolder128" />
          </q-avatar>
          <q-icon :name="biArrowRight" size="md" class="text-amber-500" />
          <q-avatar size="36px">
            <q-img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </div>
        <p class="text-sm text-center text-slate-700 dark:text-slate-300">
          Chanavee gives love to Lisa
        </p>
        <div class="flex justify-center">
          <q-icon :name="biHeart" class="text-red-500 text-xl" />
        </div>
      </div>

      <div class="mt-4 space-y-4">
        <div class="flex items-center justify-center space-x-4">
          <q-avatar size="36px">
            <q-img :src="AvatarPlaceHolder128" />
          </q-avatar>
          <q-icon :name="biArrowRight" size="md" class="text-amber-500" />
          <q-avatar size="36px">
            <q-img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </div>
        <p class="text-sm text-center text-slate-700 dark:text-slate-300">
          Chanavee adopted Lisa post
        </p>
        <div class="flex justify-center">
          <q-icon :name="biHandbag" class="text-blue-500 text-xl" />
        </div>
      </div>
    </div>

    <!-- Leaderboard -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <div class="flex items-center mb-4">
        <q-avatar size="48px" class="bg-amber-500 text-white mr-3">
          <q-icon :name="biTrophy" />
        </q-avatar>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Leaderboard
        </h3>
      </div>

      <!-- User Stats -->
      <div class="flex justify-around text-center py-4 border-t border-b border-slate-200 dark:border-slate-600">
        <div class="flex items-center">
          <q-avatar size="48px" class="bg-green-500 text-white mr-3">
            <q-icon :name="biArrowUp" />
          </q-avatar>
        </div>
        <div>
          <div class="text-xl font-bold text-slate-900 dark:text-slate-100">75</div>
          <span class="text-sm text-slate-500 dark:text-slate-400">Your rank</span>
        </div>
        <div>
          <div class="text-xl font-bold text-green-500">+7</div>
          <span class="text-sm text-slate-500 dark:text-slate-400">Change</span>
        </div>
      </div>

      <!-- Leaders List -->
      <div class="mt-4">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Leaders</span>
          <span class="text-sm text-slate-500 dark:text-slate-400">D/E</span>
        </div>
        <div class="space-y-3">
          <div v-for="(leader, index) in leaders" :key="index" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <q-avatar size="36px">
                <q-img :src="AvatarPlaceHolder128" />
              </q-avatar>
              <div>
                <p class="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {{ index + 1 }}. {{ leader.name }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  {{ leader.role }}
                </p>
              </div>
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
              {{ leader.score }}
            </span>
          </div>
        </div>
        <button class="w-full mt-4 text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 font-medium flex items-center justify-center">
          <q-icon :name="biChevronDown" class="mr-1" />
          {{ t('base.seeMore') }}
        </button>
      </div>
    </div>

    <!-- Recommended Themes -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        {{ t('recommendationsThemes') }}
      </h3>
      <div class="space-y-3">
        <div
          v-for="theme in recommendedThemes"
          :key="theme.id"
          class="flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors"
        >
          <div class="flex items-center space-x-3">
            <q-avatar size="36px">
              <q-img :src="AvatarPlaceHolder128" />
            </q-avatar>
            <div>
              <p class="text-sm font-medium text-slate-900 dark:text-slate-100">
                {{ theme.name }}
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                By {{ theme.author }}
              </p>
            </div>
          </div>
          <button class="p-2 rounded-full hover:bg-accent-100 dark:hover:bg-accent-900 transition-colors">
            <q-icon :name="biPencil" class="text-accent-600 dark:text-accent-400" />
          </button>
        </div>
      </div>
      <button class="w-full mt-4 text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 font-medium flex items-center justify-center">
        <q-icon :name="biChevronDown" class="mr-1" />
        {{ t('base.seeMore') }}
      </button>
    </div>

    <!-- Hashtag Trends -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        {{ t('hastagTrend') }}
      </h3>
      <div class="space-y-3">
        <div
          v-for="tag in hashtagTrends"
          :key="tag.id"
          class="flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors"
        >
          <div class="flex items-center space-x-3">
            <q-icon :name="laHashtagSolid" class="text-accent-600 dark:text-accent-400" />
            <div>
              <router-link
                :to="`/tag/${tag.tag}`"
                class="text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                {{ tag.tag }}
              </router-link>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Created by {{ tag.author }}
              </p>
            </div>
          </div>
          <button class="p-2 rounded-full hover:bg-accent-100 dark:hover:bg-accent-900 transition-colors">
            <q-icon :name="biPlus" class="text-accent-600 dark:text-accent-400" />
          </button>
        </div>
      </div>
      <button class="w-full mt-4 text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 font-medium flex items-center justify-center">
        <q-icon :name="biChevronDown" class="mr-1" />
        {{ t('base.seeMore') }}
      </button>
    </div>

    <!-- Today's Most Viewed Posts -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        {{ t('todayMostViewPosts') }}
      </h3>
      <div class="space-y-3">
        <div
          v-for="(post, index) in todayMostViewed"
          :key="index"
          class="flex items-center space-x-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors"
        >
          <q-avatar
            size="36px"
            :class="[
              'text-white font-semibold',
              index === 0 ? 'bg-yellow-500' :
              index === 1 ? 'bg-gray-400' :
              index === 2 ? 'bg-amber-600' : 'bg-slate-400'
            ]"
          >
            {{ index + 1 }}
          </q-avatar>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-1">
              {{ post.title }}
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              By {{ post.author }}
            </p>
          </div>
        </div>
      </div>
      <button class="w-full mt-4 text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 font-medium flex items-center justify-center">
        <q-icon :name="biChevronDown" class="mr-1" />
        {{ t('base.seeMore') }}
      </button>
    </div>

    <!-- Footer Links -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <div class="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
        <a href="#" class="hover:text-slate-700 dark:hover:text-slate-300">About</a>
        <span>•</span>
        <a href="#" class="hover:text-slate-700 dark:hover:text-slate-300">Help</a>
        <span>•</span>
        <a href="#" class="hover:text-slate-700 dark:hover:text-slate-300">Terms</a>
        <span>•</span>
        <a href="#" class="hover:text-slate-700 dark:hover:text-slate-300">Privacy</a>
      </div>
      <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">
        © 2025 Misskey. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLang } from '@/composables/useLang';
import { AvatarPlaceHolder128 } from '@/libs/constant';
import {
  biArrowRight,
  biGift,
  biHeart,
  biHandbag,
  biTrophy,
  biArrowUp,
  biChevronDown,
  biPencil,
  biPlus
} from '@quasar/extras/bootstrap-icons';
import { laHashtagSolid } from '@quasar/extras/line-awesome';

const { t } = useLang();

// Leaders data from original component
const leaders = ref([
  {
    name: 'Jane Groowy',
    role: 'Account Manager',
    score: '5.5',
  },
  {
    name: 'Jane Groowy',
    role: 'Account Manager',
    score: '5.5',
  },
  {
    name: 'Jane Groowy',
    role: 'Account Manager',
    score: '5.5',
  },
]);

// Recommended themes data from original component
const recommendedThemes = ref([
  {
    name: 'Security',
    author: 'Jane Groowy',
    id: 1,
  },
  {
    name: 'Coding',
    author: 'Doug McMillion',
    id: 2,
  },
  {
    name: 'Clean',
    author: 'Cristopfer Nisson',
    id: 3,
  },
]);

// Hashtag trends data from original component
const hashtagTrends = ref([
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
]);

// Today's most viewed posts data from original component
const todayMostViewed = ref([
  {
    title: 'WONDERS OF PLANET EARTH | Most Magnificent Places | Travel Documentary 4K',
    author: 'BigGumbyLover',
  },
  {
    title: 'Worker disappears after he was accidentally paid more than 300 times his salary',
    author: 'Flair_Helper',
  },
  {
    title: 'The only picture we have of my grandfather who died in WWII',
    author: 'TrebleRose68',
  },
]);
</script>
