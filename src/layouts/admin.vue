<script setup lang="ts">
import BaseHeader from '@/components/base/BaseHeader.vue';
import BaseSidebar from '@/components/base/BaseSidebar.vue';
import LayoutBreadcrumbTab from '@/components/base/LayoutBreadcrumbTab.vue';
import ChatMini from '@/components/chats/ChatMini.vue';
import { useAppStore } from '@/stores/appStore';

const appStore = useAppStore();

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
      <slot />
      <ChatMini />
    </q-page-container>
  </q-layout>
</template>


