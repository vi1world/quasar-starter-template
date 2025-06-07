<template>
  <div class="min-h-screen bg-primary-500">
    <!-- Contra Feed Header -->
    <ContraFeedHeader
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @toggle-drawer="drawerOpen = !drawerOpen"
    />

    <!-- Mobile Feed Drawer -->
    <ContraFeedDrawer
      v-model="drawerOpen"
      :overlay="true"
    />

    <!-- Main Feed Container -->
    <div class="pt-20"> <!-- Account for fixed header -->
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
              <!-- Enhanced Post Composer -->
              <div class="card-contra-black p-8">
                <ContraPostComposer />
              </div>

              <!-- Feed Content -->
              <router-view />
            </div>
          </div>

          <!-- Right Sidebar - Enhanced Trending & Suggestions -->
          <div v-if="screen.gt.md" class="lg:col-span-3">
            <div class="sticky top-24 space-y-6">
              <ContraFeedRight />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Chat Mini -->
    <ContraChatMini />

    <!-- Mobile Overlay with Blur Effect -->
    <div
      v-if="(sidebarOpen || drawerOpen) && screen.lt.lg"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300"
      @click="sidebarOpen = false; drawerOpen = false"
    ></div>

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
      <!-- Gradient Orbs -->
      <div class="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-r from-primary-600/5 to-electric-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-1/4 right-10 w-48 h-48 bg-gradient-to-r from-sunshine-500/5 to-coral-500/5 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 3s;"></div>
      
      <!-- Floating Dots -->
      <div class="absolute top-1/3 right-1/4 w-2 h-2 bg-primary-400/30 rounded-full animate-float"></div>
      <div class="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-electric-400/30 rounded-full animate-float" style="animation-delay: 1s;"></div>
      <div class="absolute top-2/3 right-1/3 w-1 h-1 bg-sunshine-400/30 rounded-full animate-float" style="animation-delay: 2s;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import ContraFeedHeader from '@/components/modern/ContraFeedHeader.vue';
import ContraFeedDrawer from '@/components/modern/ContraFeedDrawer.vue';
import ContraFeedLeft from '@/components/modern/ContraFeedLeft.vue';
import ContraFeedRight from '@/components/modern/ContraFeedRight.vue';
import ContraPostComposer from '@/components/modern/ContraPostComposer.vue';
import ContraChatMini from '@/components/modern/ContraChatMini.vue';

const { screen } = useQuasar();

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
