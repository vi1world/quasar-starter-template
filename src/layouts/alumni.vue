<template>
  <q-layout view="lHh Lpr lFf" class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <!-- Contra Feed Header -->
    <q-header elevated class="bg-transparent">
      <ContraFeedHeader
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
        @toggle-drawer="drawerOpen = !drawerOpen"
      />
    </q-header>

    <!-- Mobile Feed Drawer -->
    <ContraFeedDrawer
      v-model="drawerOpen"
      :overlay="true"
    />

    <!-- Main Feed Container -->
    <q-page-container>
      <q-page class="pt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">

            <!-- Left Sidebar - Enhanced Profile & Navigation -->
            <div v-if="screen.gt.md" class="lg:col-span-3">
              <div class="sticky top-24 space-y-6">
                <ContraFeedLeft />
              </div>
            </div>

            <!-- Main Feed Content -->
            <div class="lg:col-span-6">
              <div class="space-y-8">
                <!-- Feed Content - This is where Inertia pages will be rendered -->
                <slot />
              </div>
            </div>

            <!-- Right Sidebar - Real Data -->
            <div v-if="screen.gt.md" class="lg:col-span-3">
              <div class="sticky top-24 space-y-6">
                <RealSidebarData
                  :upcoming-events="page.props.upcomingEvents"
                  :latest-jobs="page.props.latestJobs"
                  :latest-news="page.props.latestNews"
                  :latest-notice="page.props.latestNotice"
                />
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <!-- Enhanced Chat Mini -->
    <ContraChatMini />

    <!-- Mobile Overlay with Blur Effect -->
    <div
      v-if="(sidebarOpen || drawerOpen) && screen.lt.lg"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300"
      @click="sidebarOpen = false; drawerOpen = false"
    />

    <!-- Floating Action Button for Mobile -->
    <div v-if="screen.lt.lg" class="fixed bottom-6 right-6 z-30">
      <button
        @click="showMobileComposer = true"
        class="btn-contra-black w-16 h-16 rounded-full flex items-center justify-center text-2xl"
      >
        <q-icon name="edit" />
      </button>
    </div>

    <!-- Mobile Post Composer Modal -->
    <q-dialog v-model="showMobileComposer" class="z-50">
      <q-card class="w-full max-w-lg card-contra">
        <q-card-section class="pb-0">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-black text-contra-black-950">Create Post</h3>
            <q-btn
              flat
              round
              icon="close"
              @click="showMobileComposer = false"
              class="text-contra-black-950"
            />
          </div>
        </q-card-section>

        <q-card-section>
          <ContraPostComposer @post-created="showMobileComposer = false" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Background Decorative Elements -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <!-- Simple geometric shapes -->
      <div class="absolute top-1/4 left-10 w-32 h-32 bg-contra-black-950/10 rounded-2xl rotate-12" />
      <div class="absolute bottom-1/4 right-10 w-24 h-24 bg-contra-black-950/10 rounded-full" />

      <!-- Floating Dots -->
      <div class="absolute top-1/3 right-1/4 w-3 h-3 bg-contra-black-950/20 rounded-full" />
      <div class="absolute bottom-1/3 left-1/4 w-2 h-2 bg-contra-black-950/20 rounded-full" />
      <div class="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-contra-black-950/20 rounded-full" />
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import { useQuasar } from 'quasar';
import { usePage } from '@inertiajs/vue3';
import ContraFeedHeader from '@/components/modern/ContraFeedHeader.vue';
import ContraFeedDrawer from '@/components/modern/ContraFeedDrawer.vue';
import ContraFeedLeft from '@/components/modern/ContraFeedLeft.vue';
import RealSidebarData from '@/components/modern/RealSidebarData.vue';
import ContraPostComposer from '@/components/modern/ContraPostComposer.vue';
import ContraChatMini from '@/components/modern/ContraChatMini.vue';

const { screen } = useQuasar();
const page = usePage();

// Provide page props to child components
provide('pageProps', page.props);

const sidebarOpen = ref(false);
const drawerOpen = ref(false);
const showMobileComposer = ref(false);
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}
</style>
