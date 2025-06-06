<script setup lang="ts">
import BaseHeader from '@/components/base/BaseHeader.vue';
import AlumniSidebar from '@/components/layout/AlumniSidebar.vue';
import LayoutBreadcrumbTab from '@/components/base/LayoutBreadcrumbTab.vue';
import ChatMini from '@/components/chats/ChatMini.vue';
import { useAppStore } from '@/stores/appStore';
import { useAuthenStore } from '@/stores/authenStore';
import { usePage } from '@inertiajs/vue3';
import { onMounted } from 'vue';

const appStore = useAppStore();
const authenStore = useAuthenStore();
const page = usePage();

// Initialize auth store with data from Laravel if available
onMounted(() => {
  if (page.props.user && !authenStore.auth) {
    authenStore.initializeFromProps(page.props.user);
  }
});
</script>
<template>
  <!-- <q-layout view="hHh LpR fFf"> -->
  <q-layout view="lHh Lpr lff">
    <AlumniSidebar v-model="appStore.drawerOpen" bordered expan-all />
    <base-header
      :frontend="false"
      :show-togle-drawer="true"
      :show-logo="true"
      bordered
    />
    <q-page-container>
      <layout-breadcrumb-tab />
      <slot />
      <ChatMini />
    </q-page-container>
  </q-layout>
</template>


