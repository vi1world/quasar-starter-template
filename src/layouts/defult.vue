<script setup lang="ts">
import { computed } from 'vue';
import BaseHeader from '@/components/base/BaseHeader.vue';
import BaseSidebar from '@/components/base/BaseSidebar.vue';
import LayoutBreadcrumbTab from '@/components/base/LayoutBreadcrumbTab.vue';
import ChatMini from '@/components/chats/ChatMini.vue';
import BookmarksPage from '@/pages/bookmarks/index.vue';
import { useAppStore } from '@/stores/appStore';
import { usePage } from '@inertiajs/vue3';

// defineOptions({
//   preFetch({ /* ssrContext, redirect */ redirect }) {
//     const appStore = useAppStore();
//     if (!appStore.isHavePermission([BackendLogin])) {
//       redirect({ path: '/auth/login' });
//     }
//   },
// });
const appStore = useAppStore();
const page = usePage();

// Check if we're on the bookmarks page
const isBookmarksPage = computed(() => {
  return page.url && page.url.includes('/bookmarks');
});
</script>
<template>
  <!-- <q-layout view="hHh LpR fFf"> -->
  <q-layout view="lHh Lpr lff">
    <BaseSidebar v-model="appStore.drawerOpen" bordered expan-all />
    <base-header
      :frontend="false"
      :show-togle-drawer="true"
      :show-logo="true"
      bordered
    />
    <q-page-container>
      <layout-breadcrumb-tab />
      <BookmarksPage v-if="isBookmarksPage" />
      <router-view v-else />
      <ChatMini />
    </q-page-container>
  </q-layout>
</template>
