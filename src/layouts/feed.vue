<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <!-- Modern Feed Header -->
    <ModernFeedHeader
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @toggle-drawer="drawerOpen = !drawerOpen"
    />

    <!-- Mobile Feed Drawer -->
    <ModernFeedDrawer
      v-model="drawerOpen"
      :overlay="true"
    />

    <!-- Main Feed Container -->
    <div class="pt-16"> <!-- Account for fixed header -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6">

          <!-- Left Sidebar - User Profile & Navigation -->
          <div v-if="screen.gt.md" class="lg:col-span-3">
            <div class="sticky top-20 space-y-6">
              <ModernFeedLeft />
            </div>
          </div>

          <!-- Main Feed Content -->
          <div class="lg:col-span-6">
            <div class="space-y-6">
              <!-- Feed Post Composer -->
              <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <ModernPostComposer />
              </div>

              <!-- Feed Content -->
              <router-view />
            </div>
          </div>

          <!-- Right Sidebar - Trending & Suggestions -->
          <div v-if="screen.gt.md" class="lg:col-span-3">
            <div class="sticky top-20 space-y-6">
              <ModernFeedRight />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Mini -->
    <ChatMini />

    <!-- Mobile Overlay -->
    <div
      v-if="(sidebarOpen || drawerOpen) && screen.lt.lg"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="sidebarOpen = false; drawerOpen = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import ModernFeedHeader from '@/components/modern/ModernFeedHeader.vue';
import ModernFeedDrawer from '@/components/modern/ModernFeedDrawer.vue';
import ModernFeedLeft from '@/components/modern/ModernFeedLeft.vue';
import ModernFeedRight from '@/components/modern/ModernFeedRight.vue';
import ModernPostComposer from '@/components/modern/ModernPostComposer.vue';
import ChatMini from '@/components/chats/ChatMini.vue';

const { screen } = useQuasar();

const sidebarOpen = ref(false);
const drawerOpen = ref(false);
</script>
