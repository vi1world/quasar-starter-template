<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import ModernSidebar from '@/components/modern/ModernSidebar.vue';
import ModernHeader from '@/components/modern/ModernHeader.vue';
import ChatMini from '@/components/chats/ChatMini.vue';
import { BackendLogin } from '@/libs/permissions';
import { useAppStore } from 'src/stores/appStore';

// defineOptions({
//   preFetch({ /* ssrContext, redirect */ redirect }) {
//     const appStore = useAppStore();
//     if (!appStore.isHavePermission([BackendLogin])) {
//       redirect({ path: '/auth/login' });
//     }
//   },
// });

const $q = useQuasar();
const appStore = useAppStore();

const sidebarOpen = ref(false);
const sidebarMini = ref(false);

const isMobile = computed(() => $q.screen.lt.lg);

// Sidebar navigation items
const sidebarItems = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: '/',
    active: true,
  },
  {
    label: 'Analytics',
    icon: 'analytics',
    to: '/analytics',
  },
  {
    label: 'Users',
    icon: 'people',
    to: '/user',
    children: [
      { label: 'All Users', to: '/user' },
      { label: 'Roles', to: '/role' },
      { label: 'Permissions', to: '/permission' },
    ],
  },
  {
    label: 'Content',
    icon: 'article',
    to: '/content',
    children: [
      { label: 'Posts', to: '/posts' },
      { label: 'Pages', to: '/pages' },
      { label: 'Media', to: '/media' },
    ],
  },
  {
    label: 'Settings',
    icon: 'settings',
    to: '/settings',
  },
  {
    label: 'Examples',
    icon: 'code',
    to: '/example',
    children: [
      { label: 'Charts', to: '/example/charts' },
      { label: 'Tables', to: '/example/crud-table' },
      { label: 'Forms', to: '/example/ui' },
    ],
  },
];
</script>
<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <!-- Modern Sidebar -->
    <ModernSidebar
      v-model="sidebarOpen"
      :items="sidebarItems"
      :mini="sidebarMini"
      @toggle-mini="sidebarMini = !sidebarMini"
    />

    <!-- Main Content Area -->
    <div
      :class="[
        'transition-all duration-300',
        sidebarMini ? 'ml-16' : 'ml-64',
        'lg:ml-64'
      ]"
    >
      <!-- Modern Header -->
      <ModernHeader
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
        @toggle-mini="sidebarMini = !sidebarMini"
        :sidebar-mini="sidebarMini"
      />

      <!-- Page Content -->
      <main class="p-6">
        <router-view />
        <ChatMini />
      </main>
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen && isMobile"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="sidebarOpen = false"
    ></div>
  </div>
</template>
